import React, { useState, useEffect } from "react";
import RetailerLayout from "../components/RetailerLayout";
import { BrandInfo } from "../components/shared";
import { useCompass } from "../contexts/CompassContext";

export default function ProductDetailPage() {
  const { state, setCurrentProduct } = useCompass();
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [buttonLayoutVariant, setButtonLayoutVariant] = useState(false);
  const [pageProduct, setPageProduct] = useState(state.currentProduct);

  // Save the product to page state when component mounts or currentProduct changes
  useEffect(() => {
    if (state.currentProduct) {
      setPageProduct(state.currentProduct);
    }
  }, [state.currentProduct]);

  // Set product context when on PDP
  useEffect(() => {
    if (pageProduct) {
      setCurrentProduct(pageProduct);
    }
    // CRITICAL: Clear product context when leaving PDP
    return () => {
      setCurrentProduct(undefined);
    };
  }, [pageProduct, setCurrentProduct]);

  // Keyboard shortcut: Shift + B to toggle button layout
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "B") {
        e.preventDefault();
        setButtonLayoutVariant((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Use page's copy of product (persists even if Compass context is cleared)
  const compassProduct = pageProduct;
  
  const product = compassProduct ? {
    name: compassProduct.name,
    brand: compassProduct.brandName,
    price: `$${compassProduct.price.toFixed(2)}`,
    msrp: `$${(compassProduct.price * 2).toFixed(2)}`, // Mock MSRP as 2x price
    rating: compassProduct.rating || 5.0,
    reviewCount: 18,
    colors: ["White"], // Simplified for prototype
    images: [compassProduct.imageUrl], // Use product image
    description: compassProduct.description + `\n\n${compassProduct.dimensions.width}W x ${compassProduct.dimensions.depth}D x ${compassProduct.dimensions.height}H"\n\nWeight: ${compassProduct.weight} lb`,
    details: `Category: ${compassProduct.category}\n\nBrand minimum: $${compassProduct.brandMinimum}\n\n${compassProduct.tags.join(', ')}`,
  } : {
    name: "Cubic Table Lamp",
    brand: "Misewell",
    price: "$159.50",
    msrp: "$319.00",
    rating: 5.0,
    reviewCount: 18,
    colors: ["Coral", "White", "Black"],
    images: [
      "/images/products/product-image-01.webp",
      "/images/products/product-image-02.webp",
      "/images/products/product-image-03.webp",
      "/images/products/product-image-04.webp",
      "/images/products/product-image-05.webp",
      "/images/products/product-image-06.webp",
      "/images/products/product-image-07.webp",
      "/images/products/product-image-08.webp",
    ],
    description: "This dual purpose lamp works great as a table lamp or a sconce. When lit, the blown glass globe appears to float atop the handmade ceramic base. This item is made by hand in the Misewell ceramics studio.\n\nThis lamp is UL Listed.\n\n6W x 6D x 8H\"\n\nMADE IN USA\n\n(Wisconsin)",
    details: "Made in United States\n\nProduct Language: English\n\nWeight: 3 lb (1.36 kg)",
  };

  return (
    <RetailerLayout languageSelector={false} cartCount={13}>
      <div id="main" className="relative w-full pb-4 md:pb-0">
        {/* Main Product Content - 2 Column Layout */}
        <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px", paddingTop: "48px", alignItems: "start" }}>
            {/* Product Images - Columns 2-7 (First Column) */}
            <div 
              data-test-id="image-section"
              className="flex flex-col"
              style={{ gridColumn: "2 / 8", gridRow: "1", gap: "2px" }}
            >
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden bg-white brightness-[98%] w-full"
                  style={{ aspectRatio: "1 / 1", maxHeight: "720px" }}
                >
                  <picture className="block h-full w-full">
                    <img
                      alt={`${product.name} - Image ${index + 1}`}
                      src={image}
                      className="w-full h-full object-contain"
                    />
                  </picture>
                </div>
              ))}
            </div>

            {/* Brand Info and Product Details - Columns 9-11 (Second Column) */}
            <div 
              className="w-full md:sticky md:top-[48px] md:z-10 area-product-details"
              style={{ gridColumn: "9 / 12", gridRow: "1" }}
            >
              <div className="flex flex-col">
                {/* Brand Information */}
                <BrandInfo
                  brandName={product.brand}
                  rating={product.rating}
                  badge="Top Shop"
                  minReached="$100 min reached"
                  variant="pdp"
                />

                {/* Product Name and Actions */}
                <div className="flex items-start justify-between" style={{ marginBottom: "2px" }}>
                  <h1 className="text-lg md:text-2xl font-medium text-[#333333] pr-7">{product.name}</h1>
                  {!buttonLayoutVariant && (
                    <div className="flex items-center gap-2">
                      <button aria-label="Save product" className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors duration-500 ease-in-out">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="m12 21.429-9.461-8.652c-5.11-5.11 2.41-15.02 9.461-7.029 7.05-7.99 14.572 1.918 9.461 7.029z" />
                        </svg>
                      </button>
                      {/* Share button - hidden for now, can be restored later */}
                      {/* <button aria-label="Share" className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M17.75 8.714h1.643a.82.82 0 0 1 .821.822v12.321a.82.82 0 0 1-.821.822H4.607a.82.82 0 0 1-.821-.822V9.536a.82.82 0 0 1 .821-.822H6.25M12 12.822v-11.5M8.714 4.607 12 1.322l3.286 3.285" />
                        </svg>
                      </button> */}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-xl font-medium text-[#333333]">{product.price}</span>
                  <span className="text-sm text-[#333333]">MSRP {product.msrp}</span>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <p className="text-sm text-[#333333] mb-2">Color: {selectedColor}</p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        aria-label={color}
                        className={`w-8 h-8 rounded-full border ${
                          selectedColor === color
                            ? "border-[#333333]"
                            : "border-[#dfe0e1] hover:border-gray-300 transition-colors duration-500 ease-in-out"
                        }`}
                        style={{
                          backgroundColor:
                            color === "White"
                              ? "#FFFFFF"
                              : color === "Black"
                              ? "#000000"
                              : "#FF7F7F",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-[#333333]">Item Quantity</p>
                    <p className="text-sm text-[#333333]">Case of 1</p>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full border border-[#dfe0e1] hover:border-[#757575] rounded px-4 py-3 pr-10 text-sm text-center"
                      style={{ transition: "border-color 0.4s ease-in-out" }}
                      placeholder="Enter Custom Quantity"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "#757575" }}
                      >
                        <path d="M1 0.994751L6 6.00005L11 0.994751" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex gap-4 mb-6">
                  <button className="flex-1 bg-[#333333] text-white py-3 px-6 rounded text-sm hover:bg-[#222222] transition-colors duration-500 ease-in-out">
                    Add to cart · {product.price}
                  </button>
                  {buttonLayoutVariant && (
                    <button 
                      aria-label="Save product" 
                      className="bg-white border border-[#dfe0e1] rounded flex items-center justify-center hover:bg-gray-100 transition-colors duration-500 ease-in-out"
                      style={{ width: "48px", height: "48px", minWidth: "48px" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "#333333" }}>
                        <path d="m12 21.429-9.461-8.652c-5.11-5.11 2.41-15.02 9.461-7.029 7.05-7.99 14.572 1.918 9.461 7.029z" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Shipping & Policies */}
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-[#333333] mb-4">Shipping & policies</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-[#333333]">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M2.714 4.428A1.714 1.714 0 0 0 1 6.142v15.429a1.714 1.714 0 0 0 1.714 1.714h18.857a1.714 1.714 0 0 0 1.715-1.714V6.142a1.714 1.714 0 0 0-1.715-1.714h-3.428M1 11.285h22.286M6.143 1v6.857M18.143 1v6.857M6.143 4.428h8.571" />
                      </svg>
                      <span>Estimated delivery <span className="underline">Nov 30-Dec 8</span></span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#333333]">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M.857 12a11.143 11.143 0 1 0 22.286 0A11.143 11.143 0 0 0 .857 12ZM.857 12h22.286" />
                        <path d="M16.285 12A19.24 19.24 0 0 1 12 23.143 19.24 19.24 0 0 1 7.714 12 19.24 19.24 0 0 1 12 .857 19.24 19.24 0 0 1 16.285 12Z" />
                      </svg>
                      <span>Ships from United States</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#333333]">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m7.8 11.8 3 3 6-6M18.857 15.429l3.429-.858.857 3.429" />
                        <path d="M22.286 14.571A11.31 11.31 0 0 1 12 22.286a10.32 10.32 0 0 1-9.663-6.772M5.143 8.571l-3.429.858L.857 6" />
                        <path d="M1.714 9.429A11.63 11.63 0 0 1 12 1.714a10.32 10.32 0 0 1 9.664 6.772" />
                      </svg>
                      <span>Eligible for <span className="underline">free returns</span></span>
                    </li>
                  </ul>
                </div>

                {/* Description */}
                <div className="border-t border-[#dfe0e1] pt-6 mb-6">
                  <h2 className="text-sm font-medium text-[#333333] mb-2">Description</h2>
                  <p className="text-sm text-[#333333] whitespace-pre-line">{product.description}</p>
                </div>

                {/* Details */}
                <div className="border-t border-[#dfe0e1] pt-6">
                  <h2 className="text-sm font-medium text-[#333333] mb-2">Details</h2>
                  <p className="text-sm text-[#333333] whitespace-pre-line">{product.details}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </RetailerLayout>
  );
}

