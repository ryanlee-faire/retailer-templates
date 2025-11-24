import React, { useState, useEffect } from "react";
import RetailerLayout from "../components/RetailerLayout";
import { BrandInfo } from "../components/shared";
import CompassBasicIcon from "../components/icons/CompassBasicIcon";
import { useCompass } from "../contexts/CompassContext";

export default function ProductDetailPageV2WithAIInline() {
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [buttonLayoutVariant, setButtonLayoutVariant] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const { state: compassState } = useCompass();

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


  // Miso Caramel Popcorn product data
  const product = {
    name: "Popcorn, Miso Caramel",
    brand: "Pom Pom Popcorn by Bessou",
    price: "$10.00",
    msrp: "$16.00",
    rating: 5.0,
    reviewCount: 18,
    colors: [], // No color variants for snack products
    images: [
      "/images/products/Snacks/Popcorn, Miso Caramel/0b8e02f4bdb8d7b6dbfb2119429f22fc270c645acf41645369a5360de9bf30ed.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/243fd1f255c35e5ba210e21502e0c709d8f4da65c0894b5bc1aba67ac414a322.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/369937f10d60592013a7a20c4d5a26b66b92d371bff746fca34f03cc6a1d70d4.jpg",
      "/images/products/Snacks/Popcorn, Miso Caramel/55a761505f6008d73738e34e46f6c89aedd7af5c5481ab2d24cf8908277dae7d.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/7411cc71ea1b1c5ea8e3fb62a4ede496b7fd7724c4e0d0bbdac4de649cf07711.jpg",
      "/images/products/Snacks/Popcorn, Miso Caramel/8b6ec1d1f08a4a586692b396f347267341805c7275c61e50457f0bac68700d07.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/e60508520166308dfe9fb1715906e1305f1f3396d1fa9d893f58082c15a341cc.jpg",
    ],
    description: "Gourmet popcorn with a savory-sweet miso caramel coating. A unique twist on a classic snack that combines the umami richness of miso with the sweet indulgence of caramel.\n\nPerfect for snacking, entertaining, or as a thoughtful gift. Made with premium ingredients and artisanal craftsmanship.\n\n4 oz bag\n\nMADE IN USA",
    details: "Made in United States\n\nProduct Language: English\n\nWeight: 4 oz (0.11 kg)",
    aiOverview: "Popcorn, Miso Caramel by Pom Pom Popcorn by Bessou is a premium snack that elevates the classic popcorn experience with an innovative miso caramel flavor. This gourmet treat combines the savory depth of miso with the sweet richness of caramel, creating a unique umami-sweet profile that's both sophisticated and satisfying. Perfect for retailers looking to offer distinctive snack options that stand out from traditional offerings.",
  };

  // Handle AI query submission
  const handleAIQuery = async (query: string) => {
    if (!query.trim()) return;
    
    setIsThinking(true);
    setAiAnswer(null);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const queryLower = query.toLowerCase();
      // Mock response based on query
      const mockAnswer = queryLower.includes('shelf life') || queryLower.includes('shelf-life') || queryLower.includes('expir') || queryLower.includes('fresh') || queryLower.includes('how long')
        ? 'This product has a long shelf life, and most retailers sell through and reorder well before the shelf life expires. The brand ensures products are fresh when they arrive and maintains quality throughout the shelf life period.'
        : queryLower.includes('shipping')
        ? 'This product ships from the United States with an estimated delivery of Dec 3-10. The brand offers free returns and ships quickly according to retailer feedback.'
        : queryLower.includes('ingredient') || queryLower.includes('allergen')
        ? 'This product is made with premium ingredients and is crafted in the USA. For specific allergen information, please contact the brand directly.'
        : queryLower.includes('price') || queryLower.includes('cost')
        ? 'The product is priced at $10.00 with an MSRP of $16.00, offering good value for a premium gourmet snack.'
        : queryLower.includes('sell') || queryLower.includes('popular')
        ? 'Other retailers report this product has high sell-through rates, indicating strong customer demand and popularity.'
        : 'This is a premium gourmet snack that combines miso and caramel flavors. It\'s made in the USA, ships quickly, and has received positive feedback from retailers about packaging and sell-through rates.'
      ;
      
      setAiAnswer(mockAnswer);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <RetailerLayout languageSelector={false} cartCount={13} stickyNav={false}>
      <div id="main" className="relative w-full pb-4 md:pb-0">
        {/* Main Product Content - 2 Column Layout */}
        <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px", paddingTop: "48px", alignItems: "start" }}>
            {/* Product Images - Columns 1-8 */}
            <div 
              data-test-id="image-section"
              className="grid grid-cols-2"
              style={{ gridColumn: "1 / 9", gridRow: "1", gap: "2px" }}
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

            {/* Brand Info and Product Details - Columns 9-12 */}
            <div 
              className="w-full md:sticky md:top-[48px] md:z-10 area-product-details"
              style={{ 
                gridColumn: "9 / 13", 
                gridRow: "1", 
                paddingLeft: "48px" 
              }}
            >
              <div className="flex flex-col">
                {/* Brand Information */}
                <BrandInfo
                  brandName={product.brand}
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  rating={product.rating}
                  badge="Top Shop"
                  minReached="$100 min reached"
                  showCartCard={true}
                  cartCardVariant="number"
                  cartCardNumber={13}
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
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-xl font-medium text-[#333333]">{product.price}</span>
                  <span className="text-sm text-[#333333]">MSRP {product.msrp}</span>
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

                  {/* AI Answer Display */}
                  {aiAnswer && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-[#dfe0e1]">
                      <p className="text-sm text-[#333333] whitespace-pre-line">{aiAnswer}</p>
                    </div>
                  )}

                  {/* Loading State */}
                  {isThinking && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-[#dfe0e1]">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#333333] border-t-transparent"></div>
                        <p className="text-sm text-[#757575]">Thinking...</p>
                      </div>
                    </div>
                  )}

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
                          handleAIQuery(aiQuery.trim());
                          setAiQuery(""); // Clear input after submission
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
                  <div className="border-t border-[#dfe0e1] mb-4" />
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
                  <p className="text-sm text-[#333333] whitespace-pre-line">{product.description}</p>
                </div>

                {/* Details */}
                <div className="border-t border-[#dfe0e1] pt-6 mb-6">
                  <h2 className="text-sm font-medium text-[#333333] mb-2">Details</h2>
                  <p className="text-sm text-[#333333] whitespace-pre-line">{product.details}</p>
                </div>

                {/* Reviews Section - Placeholder for future implementation */}
                <div id="reviews" className="border-t border-[#dfe0e1] pt-6 scroll-mt-4">
                  <h2 className="text-sm font-medium text-[#333333] mb-2">Reviews</h2>
                  <p className="text-sm text-[#333333] text-[#757575]">Reviews section coming soon</p>
                </div>
                </div>
            </div>
        </div>
      </div>
    </RetailerLayout>
  );
}

