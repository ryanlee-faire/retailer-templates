import React, { useState, useEffect } from "react";
import RetailerLayout from "../components/RetailerLayout";
import { BrandInfo } from "../components/shared";
import { ProductPageData } from "../utils/productPages";
import CompassBasicIcon from "../components/icons/CompassBasicIcon";
import { useCompass } from "../contexts/CompassContext";
import CompassDrawer from "./compass/CompassDrawer";
import RetailerGlobalNavLoggedIn from "./RetailerGlobalNavLoggedIn";
import Footer from "./Footer";

interface ProductDetailPageWithAIProps {
  product: ProductPageData;
}

export default function ProductDetailPageWithAI({ product }: ProductDetailPageWithAIProps) {
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [buttonLayoutVariant, setButtonLayoutVariant] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const { openPanel, state: compassState } = useCompass();

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

  // Default product data with product prop
  const productData = {
    name: product.name,
    brand: product.brand || "Artisan Brand",
    price: product.price || "$10.00",
    msrp: product.msrp || "$18.00",
    rating: 5.0,
    reviewCount: 18,
    colors: [], // Empty for snack products (no color variants)
    images: product.images.length > 0 ? product.images : ["/images/products/product-image-01.webp"],
    description: product.description || `${product.name} - A premium snack product.`,
    details: product.details || "Made in United States\n\nProduct Language: English",
    aiOverview: product.description || `${product.name} is a premium snack product known for its quality ingredients and artisanal craftsmanship.`,
  };

  // Top Shop badge icon
  const TopShopIcon = () => (
    <svg
      className="w-3 h-3"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#333333" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.577 11.57a5.43 5.43 0 0 0 1.645-3.888V.254H0v7.428c0 1.457.584 2.859 1.64 3.888.759.741 1.71 1.25 2.737 1.477-1.194.362-2.132 1.236-2.507 2.34h7.481c-.375-1.1-1.317-1.977-2.511-2.34a5.65 5.65 0 0 0 2.737-1.477"
        fill="currentColor"
      />
      <path
        d="m5.702 2.723.675 1.772c.02.05.071.075.12.06l1.757-.559c.085-.026.158.068.114.148l-.916 1.652a.105.105 0 0 0 .029.135l1.516 1.076c.074.052.048.17-.04.184L7.14 7.48a.1.1 0 0 0-.083.108l.134 1.9c.007.091-.099.144-.164.081l-1.35-1.293a.095.095 0 0 0-.132 0l-1.35 1.293c-.065.063-.17.01-.164-.081l.134-1.9a.1.1 0 0 0-.083-.108l-1.817-.288c-.087-.014-.113-.132-.04-.184L3.74 5.931a.103.103 0 0 0 .029-.135l-.915-1.652c-.044-.08.029-.174.114-.147l1.757.558a.097.097 0 0 0 .12-.06l.674-1.771a.097.097 0 0 1 .182-.001"
        fill="#fff"
      />
    </svg>
  );

  // Star icon
  const StarIcon = () => (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color: "#333333" }}
    >
      <path d="m12.843 1.87 2.714 5.501a.94.94 0 0 0 .708.515l6.072.884a.94.94 0 0 1 .514 1.603l-4.395 4.286a.94.94 0 0 0-.27.831l1.038 6.055a.94.94 0 0 1-1.372.99l-5.415-2.848a.94.94 0 0 0-.874 0l-5.43 2.856a.94.94 0 0 1-1.37-.99L5.798 15.5a.94.94 0 0 0-.269-.832l-4.388-4.289a.94.94 0 0 1 .514-1.603l6.079-.89a.94.94 0 0 0 .708-.514l2.714-5.5a.941.941 0 0 1 1.686 0" />
    </svg>
  );

  // Calculate content width when drawer is open (8 columns) vs closed (12 columns)
  const contentMaxWidth = compassState.isPanelOpen 
    ? "calc((1920px - 96px) * 8 / 12 + 96px)" // 8 columns + padding
    : "1920px";

  return (
    <RetailerLayout languageSelector={false} cartCount={13} contentMaxWidth={contentMaxWidth}>
      <div id="main" className="relative w-full pb-4 md:pb-0">
        {/* Main Product Content - 2 Column Layout */}
        <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px", paddingTop: "48px", alignItems: "start" }}>
            {/* Product Images - Columns 1-4 when drawer open, 1-8 when closed */}
            <div 
              data-test-id="image-section"
              className="grid grid-cols-2"
              style={{ gridColumn: compassState.isPanelOpen ? "1 / 5" : "1 / 9", gridRow: "1", gap: "2px" }}
            >
              {productData.images.map((image, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden bg-white brightness-[98%] w-full"
                  style={{ aspectRatio: "1 / 1", maxHeight: "720px" }}
                >
                  <picture className="block h-full w-full">
                    <img
                      alt={`${productData.name} - Image ${index + 1}`}
                      src={image}
                      className="w-full h-full object-contain"
                    />
                  </picture>
                </div>
              ))}
            </div>

            {/* Brand Info and Product Details - Columns 5-8 when drawer open, 9-12 when closed */}
            <div 
              className="w-full md:sticky md:top-[48px] md:z-10 area-product-details"
              style={{ 
                gridColumn: compassState.isPanelOpen ? "5 / 9" : "9 / 13", 
                gridRow: "1", 
                paddingLeft: "48px" 
              }}
            >
              <div className="flex flex-col">
                {/* Brand Information */}
                <BrandInfo
                  brandName={productData.brand}
                  brandAvatarUrl={productData.images[0]}
                  rating={productData.rating}
                  badge="Top Shop"
                  minReached="$100 min reached"
                  showCartCard={true}
                  cartCardVariant="number"
                  cartCardNumber={13}
                  variant="pdp"
                />

                {/* Product Name and Actions */}
                <div className="flex items-start justify-between" style={{ marginBottom: "2px" }}>
                  <h1 className="text-lg md:text-2xl font-medium text-[#333333] pr-7">{productData.name}</h1>
                  {!buttonLayoutVariant && (
                    <div className="flex items-center gap-2">
                      <button aria-label="Save product" className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors duration-500 ease-in-out">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="m12 21.429-9.461-8.652c-5.11-5.11 2.41-15.02 9.461-7.029 7.05-7.99 14.572 1.918 9.461 7.029z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-xl font-medium text-[#333333]">{productData.price}</span>
                  <span className="text-sm text-[#333333]">MSRP {productData.msrp}</span>
                </div>

                {/* Color Selection - Only show if colors are available */}
                {productData.colors.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-[#333333] mb-2">Color: {selectedColor}</p>
                    <div className="flex gap-2">
                      {productData.colors.map((color) => (
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
                )}

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
                    Add to cart · {productData.price}
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

                {/* AI Overview Section */}
                <div className="mb-6">
                  {/* Divider */}
                  <div className="border-t border-[#dfe0e1] mb-4"></div>
                  
                  {/* Header with sparkle icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-sm font-medium text-[#333333]">Overview</h2>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.99984 3.33301C6.99984 7.13048 8.92389 9.25706 13.3332 9.33301C9.24456 9.33301 7.24034 11.3836 6.99984 15.333C6.99984 11.6115 5.23612 9.33301 0.666504 9.33301C4.75511 9.25706 6.99984 7.43427 6.99984 3.33301Z" stroke="#333333" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.6667 0.666992C12.6667 2.39248 13.451 3.33366 15.3333 3.33366C13.6078 3.33366 12.7451 4.27484 12.6667 6.00033C12.6667 4.35327 11.8824 3.33366 10 3.33366C11.7255 3.33366 12.6667 2.54935 12.6667 0.666992Z" stroke="#333333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Product Information */}
                  <div className="space-y-3 mb-4">
                    <p className="text-sm text-[#333333]">
                      Estimated delivery Dec 3-10
                    </p>
                    <p className="text-sm text-[#333333]">
                      Japanese American and woman owned business based in New York city.
                    </p>
                    <p className="text-sm text-[#333333]">
                      Other retailers say this product has high sell through, comes packaged well, and ships quickly.
                    </p>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex items-center gap-0 mb-4">
                    <a 
                      href="#shipping-info" 
                      className="type-label text-[#757575] hover:text-[#333333] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('shipping-info');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      Shipping & policies
                    </a>
                    <span className="type-label text-[#757575]">,&nbsp;</span>
                    <a 
                      href="#description" 
                      className="type-label text-[#757575] hover:text-[#333333] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('description');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      Description
                    </a>
                    <span className="type-label text-[#757575]">,&nbsp;</span>
                    <a 
                      href="#reviews" 
                      className="type-label text-[#757575] hover:text-[#333333] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('reviews');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      Reviews
                    </a>
                  </div>

                  {/* Ask Question Input */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="ai-query-input"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && aiQuery.trim()) {
                          e.preventDefault();
                          openPanel('search', aiQuery.trim());
                        }
                      }}
                      placeholder="Ask any question about this product"
                      className="w-full px-4 py-3 pr-12 border border-[#dfe0e1] hover:border-[#757575] rounded-full text-sm text-[#333333] bg-white transition-colors duration-200 focus:outline-none focus:border-[#333333]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CompassBasicIcon size={20} />
                    </div>
                  </div>
                </div>

                {/* Shipping & Policies */}
                <div id="shipping-info" className="mb-6 scroll-mt-4">
                  <h2 className="text-sm font-medium text-[#333333] mb-4">Shipping & policies</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-[#333333]">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M2.714 4.428A1.714 1.714 0 0 0 1 6.142v15.429a1.714 1.714 0 0 0 1.714 1.714h18.857a1.714 1.714 0 0 0 1.715-1.714V6.142a1.714 1.714 0 0 0-1.715-1.714h-3.428M1 11.285h22.286M6.143 1v6.857M18.143 1v6.857M6.143 4.428h8.571" />
                      </svg>
                      <span>Estimated delivery <span className="underline">Dec 3-10</span></span>
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
                <div id="description" className="border-t border-[#dfe0e1] pt-6 mb-6 scroll-mt-4">
                  <h2 className="text-sm font-medium text-[#333333] mb-2">Description</h2>
                  <p className="text-sm text-[#333333] whitespace-pre-line">{productData.description}</p>
                </div>

                {/* Details */}
                <div className="border-t border-[#dfe0e1] pt-6 mb-6">
                  <h2 className="text-sm font-medium text-[#333333] mb-2">Details</h2>
                  <p className="text-sm text-[#333333] whitespace-pre-line">{productData.details}</p>
                </div>

                {/* Reviews Section - Placeholder for future implementation */}
                <div id="reviews" className="border-t border-[#dfe0e1] pt-6 scroll-mt-4">
                  <h2 className="text-sm font-medium text-[#333333] mb-2">Reviews</h2>
                  <p className="text-sm text-[#333333] text-[#757575]">Reviews section coming soon</p>
                </div>
                </div>
            </div>

            {/* Compass Drawer - Columns 10-12 */}
            {compassState.isPanelOpen && (
              <div 
                className="md:sticky md:top-[48px] md:z-10"
                style={{ 
                  gridColumn: "10 / 13", 
                  gridRow: "1",
                  height: "calc(100vh - 48px)",
                }}
              >
                <CompassDrawer />
              </div>
            )}
        </div>
      </div>
    </RetailerLayout>
  );
}

