import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import RetailerLayout from "../components/RetailerLayout";
import { ProductTile } from "../components/shared";

interface Product {
  id: string;
  name: string;
  brandName: string;
  imageUrl: string;
  price: string;
  msrp: string;
  minOrder: string;
  freeShipping: boolean;
  isTopShop: boolean;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  products?: Product[]; // Products to display in grid
}

interface SearchBarProps {
  className?: string;
  isCompact?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

// Search bar component - defined outside to prevent recreation
const SearchBar = ({ className = "", isCompact = false, value, onChange, onKeyDown, onSubmit, placeholder = "Search anything" }: SearchBarProps & { placeholder?: string }) => (
  <div className={`relative flex items-center ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`w-full ${isCompact ? 'px-4 py-2 pr-12' : 'px-6 py-4 pr-14'} border border-[#dfe0e1] rounded-full text-base text-[#333333] placeholder:text-[#757575] focus:outline-none focus:border-[#333333] transition-all shadow-lg`}
      style={{
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    />
    <button
      onClick={onSubmit}
      className={`absolute right-3 flex items-center justify-center ${isCompact ? 'w-6 h-6' : 'w-8 h-8'} rounded-full hover:bg-gray-100 transition-colors`}
      aria-label="Search"
    >
      <svg
        className={`${isCompact ? 'w-4 h-4' : 'w-5 h-5'} text-[#757575]`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

export default function CompassFullSurfacePage() {
  const [searchValue, setSearchValue] = useState("");
  const [showInNav, setShowInNav] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatMode) return; // Don't handle scroll in chat mode
    
    const handleScroll = () => {
      if (searchBarRef.current && topSectionRef.current) {
        const searchBarRect = searchBarRef.current.getBoundingClientRect();
        const navHeight = 80; // Approximate nav height
        // When search bar is fully under the nav (top of search bar is above nav bottom)
        const shouldShowInNav = searchBarRect.bottom <= navHeight;
        setShowInNav(shouldShowInNav);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isChatMode]);


  const suggestedSearches = [
    "Holiday gifts starter kit",
    "Coachella vibes",
    "Birdwatching corner",
    "Pearls and coastal treasures",
  ];

  // Mock products for the grid
  const products = [
    {
      id: "1",
      name: "Sardinha Yellow Package",
      brandName: "Casa Bosques",
      imageUrl: "/images/products/product-image-01.webp",
      price: "$12",
      msrp: "$20",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "2",
      name: "Sardinha Green Package",
      brandName: "Casa Bosques",
      imageUrl: "/images/products/product-image-02.webp",
      price: "$12",
      msrp: "$20",
      minOrder: "$150 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "3",
      name: "Jam Collection Set",
      brandName: "Artisan Foods",
      imageUrl: "/images/products/product-image-03.webp",
      price: "$24",
      msrp: "$35",
      minOrder: "$100 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "4",
      name: "Night Blooms Earth Candle",
      brandName: "Casa Bosques",
      imageUrl: "/images/products/product-image-04.webp",
      price: "$28",
      msrp: "$42",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "5",
      name: "Meadow Land Incense Cones",
      brandName: "Casa Bosques",
      imageUrl: "/images/products/product-image-05.webp",
      price: "$18",
      msrp: "$28",
      minOrder: "$150 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "6",
      name: "Dream Lion Incense",
      brandName: "Casa Bosques",
      imageUrl: "/images/products/product-image-06.webp",
      price: "$18",
      msrp: "$28",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "7",
      name: "Tarot Candle",
      brandName: "Mystic Goods",
      imageUrl: "/images/products/product-image-07.webp",
      price: "$22",
      msrp: "$35",
      minOrder: "$100 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "8",
      name: "Sardine Tin Silver",
      brandName: "Casa Bosques",
      imageUrl: "/images/products/product-image-08.webp",
      price: "$15",
      msrp: "$25",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "9",
      name: "Huppy Round Container",
      brandName: "Beauty Co",
      imageUrl: "/images/products/product-image-01.webp",
      price: "$20",
      msrp: "$32",
      minOrder: "$100 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "10",
      name: "Kit-sch Oak & Amber",
      brandName: "Personal Care",
      imageUrl: "/images/products/product-image-02.webp",
      price: "$16",
      msrp: "$26",
      minOrder: "$100 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "11",
      name: "The Wishbone Kitchen Cookbook",
      brandName: "Cookbook Press",
      imageUrl: "/images/products/product-image-03.webp",
      price: "$35",
      msrp: "$50",
      minOrder: "$75 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "12",
      name: "Gummy Candies Pink",
      brandName: "Sweet Treats",
      imageUrl: "/images/products/product-image-04.webp",
      price: "$8",
      msrp: "$14",
      minOrder: "$50 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "13",
      name: "Scalloped Edge Placemat",
      brandName: "Home Goods",
      imageUrl: "/images/products/product-image-05.webp",
      price: "$24",
      msrp: "$38",
      minOrder: "$100 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "14",
      name: "Gold Cutlery Set",
      brandName: "Tableware Co",
      imageUrl: "/images/products/product-image-06.webp",
      price: "$45",
      msrp: "$68",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "15",
      name: "More Molly B Cookbook",
      brandName: "Cookbook Press",
      imageUrl: "/images/products/product-image-07.webp",
      price: "$35",
      msrp: "$50",
      minOrder: "$75 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "16",
      name: "Checkered Tablecloth",
      brandName: "Home Goods",
      imageUrl: "/images/products/product-image-08.webp",
      price: "$28",
      msrp: "$42",
      minOrder: "$100 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "17",
      name: "Cadbeaver Soups Pasta",
      brandName: "Artisan Foods",
      imageUrl: "/images/products/product-image-01.webp",
      price: "$12",
      msrp: "$20",
      minOrder: "$100 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "18",
      name: "Barware Collection",
      brandName: "Drinkware Co",
      imageUrl: "/images/products/product-image-02.webp",
      price: "$38",
      msrp: "$58",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "19",
      name: "Magnesium Body Butter",
      brandName: "Beauty Co",
      imageUrl: "/images/products/product-image-03.webp",
      price: "$22",
      msrp: "$35",
      minOrder: "$100 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "20",
      name: "Davids Healthy Mouth",
      brandName: "Personal Care",
      imageUrl: "/images/products/product-image-04.webp",
      price: "$14",
      msrp: "$22",
      minOrder: "$50 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "21",
      name: "Decorative Wireframe Stand",
      brandName: "Home Decor",
      imageUrl: "/images/products/product-image-05.webp",
      price: "$32",
      msrp: "$48",
      minOrder: "$100 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "22",
      name: "Striped Plate with Pears",
      brandName: "Tableware Co",
      imageUrl: "/images/products/product-image-06.webp",
      price: "$18",
      msrp: "$28",
      minOrder: "$100 min",
      freeShipping: true,
      isTopShop: false,
    },
    {
      id: "23",
      name: "Candy Cane Bottle",
      brandName: "Drinkware Co",
      imageUrl: "/images/products/product-image-07.webp",
      price: "$20",
      msrp: "$32",
      minOrder: "$100 min",
      freeShipping: false,
      isTopShop: false,
    },
    {
      id: "24",
      name: "Top Dog Book",
      brandName: "Book Press",
      imageUrl: "/images/products/product-image-08.webp",
      price: "$25",
      msrp: "$38",
      minOrder: "$75 min",
      freeShipping: true,
      isTopShop: false,
    },
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && isChatMode) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages.length, isChatMode]);

  const generateAgentResponse = (userQuery: string): { content: string; products: Product[] } => {
    // Simple mock responses based on query
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes("holiday") || lowerQuery.includes("gift")) {
      return {
        content: "I found some great holiday gift options for you! Here are some curated products:",
        products: [
          products[0], // Sardinha Yellow Package
          products[2], // Jam Collection Set
          products[3], // Night Blooms Earth Candle
          products[5], // Dream Lion Incense
          products[6], // Tarot Candle
          products[7], // Sardine Tin Silver
        ]
      };
    } else if (lowerQuery.includes("coachella") || lowerQuery.includes("festival")) {
      return {
        content: "Perfect for festival vibes! I've curated a selection of bohemian and colorful items:",
        products: [
          products[5], // Dream Lion Incense
          products[6], // Tarot Candle
          products[17], // Barware Collection (index 17 = id "18")
          products[0], // Sardinha Yellow Package
          products[1], // Sardinha Green Package
          products[2], // Jam Collection Set
        ]
      };
    } else if (lowerQuery.includes("bird") || lowerQuery.includes("nature")) {
      return {
        content: "For your birdwatching corner, I recommend these nature-inspired products:",
        products: [
          products[4], // Meadow Land Incense Cones
          products[3], // Night Blooms Earth Candle
          products[20], // Decorative Wireframe Stand (index 20 = id "21")
          products[5], // Dream Lion Incense
          products[7], // Sardine Tin Silver
          products[8], // Huppy Round Container
        ]
      };
    } else {
      return {
        content: `I understand you're looking for: "${userQuery}". Here are some great options I found:`,
        products: products.slice(0, 6) // First 6 products as default
      };
    }
  };

  const handleBackToStart = useCallback(() => {
    setIsChatMode(false);
    setMessages([]);
    setSearchValue("");
    setIsThinking(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      // Enter chat mode
      setIsChatMode(true);
      
      // Add user message
      const userMessage: Message = {
        id: `msg-${Date.now()}-user`,
        role: "user",
        content: searchValue.trim(),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setSearchValue("");
      
      // Show thinking indicator
      setIsThinking(true);
      
      // Simulate agent response after delay
      setTimeout(() => {
        setIsThinking(false);
        const response = generateAgentResponse(userMessage.content);
        const agentMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: "assistant",
          content: response.content,
          products: response.products,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, agentMessage]);
      }, 1500);
    }
  };

  // Memoize handlers to prevent unnecessary re-renders
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearchSubmit();
    }
  }, [handleSearchSubmit]);

  return (
    <RetailerLayout 
      languageSelector={false} 
      cartCount={0} 
      hideSearch={true}
      hideFooter={isChatMode}
      navSearchBar={showInNav && !isChatMode ? <SearchBar isCompact={true} value={searchValue} onChange={handleInputChange} onKeyDown={handleKeyDown} onSubmit={handleSearchSubmit} /> : null}
    >
      {!isChatMode ? (
        <>
          {/* Centered Top Section */}
          <div ref={topSectionRef} className="flex flex-col items-center justify-center px-4 py-12" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {/* Main Heading */}
            <h1 className="type-display-s mb-8 text-center max-w-4xl">
              Your customers are going to love it
            </h1>

            {/* Search Bar - Fades out when it touches nav */}
            <div 
              ref={searchBarRef}
              className={`w-full max-w-2xl mb-8 transition-opacity duration-300 ${showInNav ? 'opacity-0' : 'opacity-100'}`}
            >
              <SearchBar value={searchValue} onChange={handleInputChange} onKeyDown={handleKeyDown} onSubmit={handleSearchSubmit} />
            </div>

            {/* Suggested Searches */}
            <div className="w-full max-w-2xl mb-12">
              <div className="flex flex-wrap gap-3 justify-center">
                {suggestedSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchValue(search)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#dfe0e1] rounded-full text-sm text-[#333333] hover:border-[#333333] hover:bg-gray-50 transition-colors"
                  >
                    <span>{search}</span>
                    <svg
                      className="w-4 h-4 text-[#757575]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Get Inspired Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-lg text-[#333333]">
                <span>Get inspired</span>
                <svg
                  className="w-5 h-5 text-[#757575]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Product Grid - Full Width, All 12 Columns */}
          <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px", paddingBottom: "48px", marginTop: "-50px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 1440:grid-cols-6 gap-4">
                {products.map((product) => (
                  <ProductTile
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    brandName={product.brandName}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    msrp={product.msrp}
                    minOrder={product.minOrder}
                    freeShipping={product.freeShipping}
                    isTopShop={product.isTopShop}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Back Button - Upper Left Corner */}
          <button
            onClick={handleBackToStart}
            className="fixed z-50 flex items-center gap-2 px-4 py-2 text-sm text-[#333333] hover:text-[#757575] transition-colors duration-200 ease-in-out"
            style={{ 
              top: '96px', // Below the nav (80px nav + 16px spacing)
              left: '48px' // Align with page padding
            }}
            aria-label="Back to start"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          {/* Chat Interface */}
          <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 80px)', paddingBottom: '80px' }}>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto py-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col mb-6 ${message.role === "user" ? "items-end px-4 md:px-12" : "items-start px-4 md:px-12"}`}
                >
                  {message.role === "user" ? (
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-[#333333] text-white rounded-tr-sm">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-[#f5f5f5] text-[#333333] rounded-tl-sm mb-4">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      {message.products && message.products.length > 0 && (
                        <div className="w-screen" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
                          <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px" }}>
                            <div style={{ gridColumn: "1 / -1" }}>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 1440:grid-cols-6 gap-4">
                                {message.products.map((product) => (
                                  <ProductTile
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    brandName={product.brandName}
                                    imageUrl={product.imageUrl}
                                    price={product.price}
                                    msrp={product.msrp}
                                    minOrder={product.minOrder}
                                    freeShipping={product.freeShipping}
                                    isTopShop={product.isTopShop}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              
              {/* Thinking indicator */}
              {isThinking && (
                <div className="flex mb-4">
                  <div className="max-w-[85%] bg-[#f5f5f5] text-[#333333] px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#757575] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-[#757575] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-[#757575] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <span className="text-sm text-[#757575]">Compass is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Search Bar at bottom (fixed) */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-[#dfe0e1] bg-white p-4 md:px-12 z-10">
              <div className="max-w-4xl mx-auto">
                <SearchBar value={searchValue} onChange={handleInputChange} onKeyDown={handleKeyDown} onSubmit={handleSearchSubmit} placeholder="Refine your search" />
              </div>
            </div>
          </div>
        </>
      )}
    </RetailerLayout>
  );
}

