import React, { useState, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import RetailerLayout from "../components/RetailerLayout";
import { ProductTile, PillButton, IconButton } from "../components/shared";
import { getBrandBySlug, getProductsByBrand, brands } from "../data/products";

export default function BrandPageV2() {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const [activeTab, setActiveTab] = useState("All products");
  const [aiSearchQuery, setAiSearchQuery] = useState("");

  // Get brand data from repository
  const brandData = useMemo(() => {
    if (!brandSlug) return null;
    return getBrandBySlug(brandSlug);
  }, [brandSlug]);

  // Get products for this brand
  const allBrandProducts = useMemo(() => {
    if (!brandData) return [];
    return getProductsByBrand(brandData.name);
  }, [brandData]);

  // Filter products based on active tab and search query
  const filteredProducts = useMemo(() => {
    let filtered = allBrandProducts;

    // Filter by tab
    if (activeTab === "Bestsellers") {
      filtered = filtered.filter((p) => p.isBestseller);
    } else if (activeTab === "New") {
      // For now, show all products. In production, this would filter by date
      filtered = filtered;
    } else if (activeTab === "Collections") {
      // For now, show all products. In production, this would filter by collection
      filtered = filtered;
    }

    return filtered;
  }, [allBrandProducts, activeTab]);

  // Redirect if brand not found
  if (!brandData || !brandSlug) {
    return <Navigate to="/" replace />;
  }

  // Brand data with defaults
  const brand = {
    name: brandData.name,
    avatarUrl: brandData.avatarUrl || "https://cdn.faire.com/fastly/f8d35214384d0cddc7711e8e5047d8a681ec72ecb1c2c682d77eebd47512c376.jpeg?dpr=1&fit=crop&format=jpg&height=192&width=192",
    bannerUrl: brandData.bannerUrl || "https://cdn.faire.com/fastly/0c3d3d5e07d2f045fbd0fb530c84ebcc59678111fba895a326ec467f9612f085.jpeg?dpr=2&format=jpg&precrop=1200,272,x0,y598,safe",
    rating: brandData.rating || 4.8,
    reviewCount: 11, // Mock review count
    location: brandData.location || "New York, New York",
    minOrder: brandData.minOrder || "$100 min",
    isTopShop: brandData.isTopShop || false,
    estimatedDelivery: "Nov 29-Dec 5", // Mock delivery date
    description: brandData.description || `${brandData.name} is an artisanal brand known for its high-quality products and unique creative partnerships.`,
  };

  const products = filteredProducts;

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

  return (
    <RetailerLayout languageSelector={false} cartCount={0}>
      <main id="main">
        {/* Banner Image - Full Width with Action Buttons Overlay */}
        <div className="relative w-full bg-[#dfe0e1] h-[120px] md:h-[240px] lg:h-[240px]">
          <picture className="w-full h-full brightness-95">
            <img
              className="h-full w-full object-cover object-center"
              src={brand.bannerUrl}
              alt={brand.name}
            />
          </picture>
          
          {/* Action Buttons - Positioned on top of banner */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex items-center gap-2 z-10">
            <PillButton variant="default" ariaLabel="Follow">
              Follow
            </PillButton>
            <IconButton
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333333"
                  strokeWidth="1.5"
                >
                  <path d="M11.997.923A11.07 11.07 0 0 0 2.239 6.77a11.08 11.08 0 0 0 .541 11.365L.923 23.077l6.218-1.125a11.072 11.072 0 0 0 15.652-7.46A11.08 11.08 0 0 0 16.81 2.022 11.1 11.1 0 0 0 11.997.923Z" />
                </svg>
              }
              ariaLabel="Message"
            />
            <IconButton
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333333"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="3.5" r="2.5" />
                  <circle cx="12" cy="12" r="2.5" />
                  <circle cx="12" cy="20.5" r="2.5" />
                </svg>
              }
              ariaLabel="More actions"
            />
          </div>
        </div>

        <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1600px" }}>
          {/* Brand Header Section */}
          <div
            style={{ gridColumn: "1 / -1", marginBottom: "48px" }}
          >
            <div className="flex w-full min-w-0 justify-center">
              <div className="w-full min-w-0">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full 2xl:max-w-[1600px]">
                    {/* Spacer */}
                    <div style={{ height: "24px" }} />

                    {/* Brand Info Section with AI Summary Box */}
                    <div className="w-full px-[48px] 2xl:px-[80px] flex flex-col lg:flex-row gap-6 items-start">
                      {/* Left: Brand Info */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                        {/* Brand Avatar */}
                        <button
                          aria-label="Go to their story"
                          className="cursor-default"
                        >
                          <div className="flex items-center">
                            <span className="h-24 w-24 rounded-full overflow-hidden">
                              <img
                                className="h-full w-full rounded-full object-cover"
                                src={brand.avatarUrl}
                                alt={brand.name}
                              />
                            </span>
                          </div>
                        </button>

                        <div className="flex flex-col">
                          <h1 className="type-fs-section-heading-medium mb-2">
                            {brand.name}
                          </h1>
                          <div className="flex flex-wrap items-center gap-1 mb-1">
                            {/* Top Shop Badge */}
                            {brand.isTopShop && (
                              <>
                                <div className="flex items-center gap-1">
                                  <div className="flex items-center" style={{ position: "relative", top: "0.65px" }}>
                                    <TopShopIcon />
                                  </div>
                                  <p className="text-sm font-medium text-[#333333]">Top Shop</p>
                                </div>
                                <span className="text-sm font-medium text-[#757575]"> · </span>
                              </>
                            )}
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                              <StarIcon />
                              <p className="text-sm text-[#333333]">{brand.rating}</p>
                              <p className="text-sm text-[#333333]">
                                (<button className="text-sm text-[#333333] hover:underline">{brand.reviewCount}</button>)
                              </p>
                            </div>
                            <span className="text-sm font-medium text-[#757575]"> · </span>
                            {/* Location */}
                            <p className="text-sm text-[#333333]">
                              <span>{brand.location}</span>
                            </p>
                            <span className="text-sm font-medium text-[#757575]"> · </span>
                            {/* Min Order */}
                            <p className="text-sm text-[#333333]">{brand.minOrder}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-1">
                            <p className="text-sm text-[#333333]">
                              Get it by {brand.estimatedDelivery}
                            </p>
                            <span className="text-sm font-medium text-[#757575]"> · </span>
                            <button className="text-sm text-[#333333] hover:underline">
                              Shipping details
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: AI Summary Box - Full right section */}
                      <div className="w-full lg:w-auto lg:flex-1 lg:max-w-none">
                        <div 
                          className="bg-white rounded-lg p-6 h-full"
                          style={{
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                            border: "1px solid #dfe0e1",
                          }}
                        >
                          {/* Brand Description */}
                          <p 
                            className="mb-4 leading-relaxed"
                            style={{
                              fontSize: "14px",
                              lineHeight: "20px",
                              color: "#333333",
                              fontFamily: "system-ui, -apple-system, sans-serif",
                            }}
                          >
                            {brand.description}
                          </p>
                          
                          {/* AI Search Input */}
                          <input
                            type="text"
                            placeholder={`Search the ${brand.name} catalog or ask about anything`}
                            value={aiSearchQuery}
                            onChange={(e) => setAiSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 border border-[#dfe0e1] hover:border-[#757575] rounded-full text-sm focus:outline-none focus:border-[#333333] bg-white"
                            style={{ 
                              transition: "border-color 0.4s ease-in-out",
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Section */}
          <div
            className="w-full"
            style={{ gridColumn: "1 / -1" }}
          >
            <div className="w-full px-[48px] 2xl:px-[80px]">

              {/* Tabs */}
              <div style={{ borderBottom: "1px solid #dfe0e1", marginBottom: "24px" }}>
                {/* Tabs - Full width */}
                <div className="flex items-end gap-6 pb-6">
                <button
                  data-test-id="All Products"
                  onClick={() => setActiveTab("All products")}
                  className={`pb-6 border-b-2 transition-colors ${
                    activeTab === "All products"
                      ? "border-[#333333]"
                      : "border-transparent"
                  }`}
                  style={{ marginBottom: '-25px' }}
                >
                  <div className="flex items-center">
                    <p className={`text-sm transition-colors duration-200 ease-in-out ${
                      activeTab === "All products"
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-subdued)]"
                    }`}>
                      All products
                    </p>
                  </div>
                </button>
                <button
                  data-test-id="Bestsellers"
                  onClick={() => setActiveTab("Bestsellers")}
                  className={`pb-6 border-b-2 transition-colors ${
                    activeTab === "Bestsellers"
                      ? "border-[#333333]"
                      : "border-transparent"
                  }`}
                  style={{ marginBottom: '-25px' }}
                >
                  <div className="flex items-center">
                    <p className={`text-sm transition-colors duration-200 ease-in-out ${
                      activeTab === "Bestsellers"
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-subdued)]"
                    }`}>
                      Bestsellers
                    </p>
                  </div>
                </button>
                <button
                  data-test-id="New"
                  onClick={() => setActiveTab("New")}
                  className={`pb-6 border-b-2 transition-colors ${
                    activeTab === "New"
                      ? "border-[#333333]"
                      : "border-transparent"
                  }`}
                  style={{ marginBottom: '-25px' }}
                >
                  <div className="flex items-center">
                    <p className={`text-sm transition-colors duration-200 ease-in-out ${
                      activeTab === "New"
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-subdued)]"
                    }`}>
                      New
                    </p>
                  </div>
                </button>
                <button
                  data-test-id="Collections"
                  onClick={() => setActiveTab("Collections")}
                  className={`pb-6 border-b-2 transition-colors ${
                    activeTab === "Collections"
                      ? "border-[#333333]"
                      : "border-transparent"
                  }`}
                  style={{ marginBottom: '-25px' }}
                >
                  <div className="flex items-center">
                    <p className={`text-sm transition-colors duration-200 ease-in-out ${
                      activeTab === "Collections"
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-subdued)]"
                    }`}>
                      Collections
                    </p>
                  </div>
                </button>
                <button
                  data-test-id="About"
                  onClick={() => setActiveTab("About")}
                  className={`pb-6 border-b-2 transition-colors ${
                    activeTab === "About"
                      ? "border-[#333333]"
                      : "border-transparent"
                  }`}
                  style={{ marginBottom: '-25px' }}
                >
                  <div className="flex items-center">
                    <p className={`text-sm transition-colors duration-200 ease-in-out ${
                      activeTab === "About"
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-subdued)]"
                    }`}>
                      About
                    </p>
                  </div>
                </button>
              </div>

              {/* Product Section */}
              <div>
                <h4 
                  className="mb-6 text-[#333333]"
                  style={{
                    fontFamily: "Nantes, serif",
                    fontSize: "28px",
                    lineHeight: "36px",
                    letterSpacing: "-0.3px",
                    fontWeight: 400,
                  }}
                >
                  All products
                </h4>

                {/* Product Grid */}
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
          </div>
        </div>
        </div>
      </main>
    </RetailerLayout>
  );
}

