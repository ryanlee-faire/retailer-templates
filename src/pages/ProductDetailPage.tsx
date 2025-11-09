import React, { useState } from "react";
import RetailerLayout from "../components/RetailerLayout";

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    name: "Cubic Table Lamp",
    brand: "Misewell",
    price: "$159.50",
    msrp: "$319.00",
    rating: 5.0,
    reviewCount: 18,
    colors: ["Coral", "White", "Black"],
    images: [
      "https://cdn.faire.com/fastly/0842dd5e0cda58216cfe8573fd97f974b61e86d8c9e01bad9b511cb55049cc92.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=720&width=720",
      "https://cdn.faire.com/fastly/31b31d209833f6f6ea60e9b57b5db8126e012474c6899f9855923da9eedbfe56.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=720&width=720",
      "https://cdn.faire.com/fastly/e0ea1188273a8737c57ba4cf32c8e0dc332f84f9ba5d95aba8d233e37ea4a72d.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=720&width=720",
    ],
    description: "This dual purpose lamp works great as a table lamp or a sconce. When lit, the blown glass globe appears to float atop the handmade ceramic base. This item is made by hand in the Misewell ceramics studio.\n\nThis lamp is UL Listed.\n\n6W x 6D x 8H\"\n\nMADE IN USA\n\n(Wisconsin)",
    details: "Made in United States\n\nProduct Language: English\n\nWeight: 3 lb (1.36 kg)",
  };

  return (
    <RetailerLayout languageSelector={false} cartCount={13}>
      <main id="main" className="relative mx-auto w-full pb-4 md:pb-0">
        {/* Brand Header Section - Columns 2-7 */}
        <div className="mx-auto w-full" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px" }}>
          <div className="retailer-12col-grid py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ gridColumn: "2 / 8" }}>
              <div className="flex items-center gap-2">
                {/* Brand avatar hidden for now */}
                <div className="flex flex-col">
                  <a href={`/brand/${product.brand.toLowerCase()}`} className="text-sm font-medium text-[#333333] hover:underline">
                    {product.brand}
                  </a>
                  <div className="flex items-center gap-1 text-sm text-[#333333]">
                    <span className="text-xs">Top Shop</span>
                    <span className="text-[#757575]"> · </span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="m12.844 1.87 2.713 5.501a.94.94 0 0 0 .708.515l6.072.884a.94.94 0 0 1 .515 1.603l-4.396 4.286a.94.94 0 0 0-.269.831l1.037 6.055a.94.94 0 0 1-1.371.99l-5.416-2.848a.94.94 0 0 0-.874 0l-5.43 2.856a.94.94 0 0 1-1.37-.99L5.8 15.5a.94.94 0 0 0-.27-.832l-4.388-4.289a.939.939 0 0 1 .514-1.603l6.079-.89a.94.94 0 0 0 .708-.514l2.714-5.5a.941.941 0 0 1 1.687 0Z" />
                    </svg>
                    <span>{product.rating}</span>
                    <span className="text-[#757575]"> · </span>
                    <span>$100 min reached</span>
                  </div>
                </div>
              </div>
              {/* Cart icon button - "1 product" text hidden */}
              <button className="flex items-center gap-2 text-sm text-[#333333]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.74 14.714H7.744L6.029 5.286h16.114a.857.857 0 0 1 .843 1.01l-1.402 7.714a.86.86 0 0 1-.843.704ZM6.029 5.286l-.72-3.6A.86.86 0 0 0 4.469 1H1.743M7.743 14.714l.72 3.6a.86.86 0 0 0 .84.686h9.583" />
                  <path d="M18.884 22.429a.857.857 0 1 1-1.714 0 .857.857 0 0 1 1.714 0ZM11.17 22.429a.857.857 0 1 1-1.715 0 .857.857 0 0 1 1.715 0Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Product Content - Starts at column 2 */}
        <div className="mx-auto w-full" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px" }}>
          <div className="retailer-12col-grid">
            {/* Brand Info and Product Images - Columns 2-7 */}
            <div 
              data-test-id="image-section"
              className="flex flex-col"
              style={{ gridColumn: "2 / 8" }}
            >
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden bg-white brightness-[98%] w-full md:aspect-[1/1]"
                >
                  <picture className="h-full cursor-zoom-in transition-transform duration-500 hover:scale-105">
                    <img
                      alt={`${product.name} - Image ${index + 1}`}
                      src={image}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
              ))}
            </div>

            {/* Product Details - Columns 9-11 */}
            <div 
              className="w-full px-4 md:sticky md:top-[72px] md:z-10 md:p-0 area-product-details"
              style={{ gridColumn: "9 / 12" }}
            >
              <div className="flex flex-col">
                {/* Product Name and Actions */}
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-lg md:text-2xl font-medium text-[#333333] pr-7">{product.name}</h1>
                  <div className="flex items-center gap-2">
                    <button aria-label="Save product" className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="m12 21.429-9.461-8.652c-5.11-5.11 2.41-15.02 9.461-7.029 7.05-7.99 14.572 1.918 9.461 7.029z" />
                      </svg>
                    </button>
                    <button aria-label="Share" className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M17.75 8.714h1.643a.82.82 0 0 1 .821.822v12.321a.82.82 0 0 1-.821.822H4.607a.82.82 0 0 1-.821-.822V9.536a.82.82 0 0 1 .821-.822H6.25M12 12.822v-11.5M8.714 4.607 12 1.322l3.286 3.285" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-xl font-medium text-[#333333]">{product.price}</span>
                  <span className="text-sm text-[#333333]">MSRP {product.msrp}</span>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-[#333333]">Color</p>
                    <p className="text-sm text-[#333333]">{selectedColor}</p>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        aria-label={color}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color
                            ? "border-[#333333]"
                            : "border-transparent hover:border-gray-300"
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
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-[#333333]">Item Quantity</p>
                    <p className="text-sm text-[#333333]">Case of 1</p>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full border border-[#757575] rounded px-4 py-2 text-sm"
                    placeholder="Enter Custom Quantity"
                  />
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-[#333333] text-white py-3 px-6 rounded font-medium mb-6 hover:bg-[#222222] transition-colors">
                  Add to cart · {product.price}
                </button>

                {/* Shipping & Policies */}
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-[#333333] mb-4">Shipping & policies</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-[#333333]">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M2.714 4.428A1.714 1.714 0 0 0 1 6.142v15.429a1.714 1.714 0 0 0 1.714 1.714h18.857a1.714 1.714 0 0 0 1.715-1.714V6.142a1.714 1.714 0 0 0-1.715-1.714h-3.428M1 11.285h22.286M6.143 1v6.857M18.143 1v6.857M6.143 4.428h8.571" />
                      </svg>
                      <span>Estimated delivery <span className="underline">Nov 30-Dec 8</span></span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#333333]">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M.857 12a11.143 11.143 0 1 0 22.286 0A11.143 11.143 0 0 0 .857 12ZM.857 12h22.286" />
                        <path d="M16.285 12A19.24 19.24 0 0 1 12 23.143 19.24 19.24 0 0 1 7.714 12 19.24 19.24 0 0 1 12 .857 19.24 19.24 0 0 1 16.285 12Z" />
                      </svg>
                      <span>Ships from United States</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#333333]">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
      </main>
    </RetailerLayout>
  );
}

