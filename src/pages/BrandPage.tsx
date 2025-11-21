import React, { useState } from "react";
import RetailerLayout from "../components/RetailerLayout";
import { ProductTile, PillButton, IconButton } from "../components/shared";

export default function BrandPage() {
  const [activeTab, setActiveTab] = useState("All products");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock brand data
  const brand = {
    name: "Casa Bosques",
    avatarUrl: "https://cdn.faire.com/fastly/f8d35214384d0cddc7711e8e5047d8a681ec72ecb1c2c682d77eebd47512c376.jpeg?dpr=1&fit=crop&format=jpg&height=192&width=192",
    bannerUrl: "https://cdn.faire.com/fastly/0c3d3d5e07d2f045fbd0fb530c84ebcc59678111fba895a326ec467f9612f085.jpeg?dpr=2&format=jpg&precrop=1200,272,x0,y598,safe",
    rating: 5.0,
    reviewCount: 11,
    location: "NYC, New York",
    minOrder: "$85 min",
    isTopShop: true,
    estimatedDelivery: "Nov 29-Dec 5",
  };

  // Mock products
  const products = [
    {
      id: "1",
      name: "Dried Fruits - Russ & Daughters",
      brandName: brand.name,
      imageUrl: "https://cdn.faire.com/fastly/aa243ceeb9c2b926180d207a116276237980a2ad1b11eccf0b6286523b8b686e.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
      price: "$10",
      msrp: "$20",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: brand.isTopShop,
    },
    {
      id: "2",
      name: "Date Caramel 74%",
      brandName: brand.name,
      imageUrl: "https://cdn.faire.com/fastly/216eb341e6eb732447f5d37cd12ecb8b60a057b9682643e38ab1b9678dfa55d9.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
      price: "$10",
      msrp: "$20",
      minOrder: "$150 min",
      freeShipping: false,
      isTopShop: brand.isTopShop,
    },
    {
      id: "3",
      name: "Pink Peppercorn",
      brandName: brand.name,
      imageUrl: "https://cdn.faire.com/fastly/caf7209f6d2ccd2a0788d0e7d01c881a2ef681b83dade8fbc52a58c43b34b126.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
      price: "$8.50",
      msrp: "$14",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: brand.isTopShop,
    },
    {
      id: "4",
      name: "Cardamom",
      brandName: brand.name,
      imageUrl: "https://cdn.faire.com/fastly/66a505dfc938a93c14399d106e0c98cf441f3b5d01b31473dc2974ee2bb69bad.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
      price: "$8.50",
      msrp: "$14",
      minOrder: "$150 min",
      freeShipping: false,
      isTopShop: brand.isTopShop,
    },
    {
      id: "5",
      name: "Black Toasted Sesame, Cacao Shell and Nib",
      brandName: brand.name,
      imageUrl: "https://cdn.faire.com/fastly/cb8e40395853db0ac5951c77b1af8469ed6a59abe99245bb3a5e2da90bf0aed1.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
      price: "$8.50",
      msrp: "$18",
      minOrder: "$150 min",
      freeShipping: true,
      isTopShop: brand.isTopShop,
    },
    {
      id: "6",
      name: "Product 6",
      brandName: brand.name,
      imageUrl: "https://cdn.faire.com/fastly/5cc57051908fe36a4b0f595510f920433910f1819b6b04422bb0f524150dbb04.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
      price: "$10",
      msrp: "$20",
      minOrder: "$150 min",
      freeShipping: false,
      isTopShop: brand.isTopShop,
    },
  ];

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
        {/* Banner Image - Full Width */}
        <div className="w-full bg-[#dfe0e1] h-[120px] md:h-[240px] lg:h-[240px]">
          <picture className="w-full h-full brightness-95">
            <img
              className="h-full w-full object-cover object-center"
              src={brand.bannerUrl}
              alt={brand.name}
            />
          </picture>
        </div>

        <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1600px" }}>
          {/* Brand Header Section */}
          <div
            style={{ gridColumn: "1 / -1", marginBottom: "24px" }}
          >
            <div className="flex w-full min-w-0 justify-center">
              <div className="w-full min-w-0">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full 2xl:max-w-[1600px]">
                    {/* Spacer */}
                    <div style={{ height: "24px" }} />

                    {/* Brand Info Section */}
                    <div className="w-full justify-between px-[48px] 2xl:px-[80px] flex flex-col md:flex-row">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
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

                      {/* Action Buttons */}
                      <div className="flex items-start gap-2">
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

              {/* Tabs and Search */}
              <div className="retailer-12col-grid" style={{ borderBottom: "1px solid #dfe0e1", marginBottom: "24px" }}>
                {/* Tabs - Columns 1-8 */}
                <div style={{ gridColumn: "1 / 9" }} className="flex items-end gap-6 pb-6">
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

              {/* Search - Columns 9-12 */}
              <div style={{ gridColumn: "9 / 13" }} className="flex items-end pb-6">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder={`Search ${brand.name}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 border border-[#dfe0e1] hover:border-[#757575] rounded-full text-sm focus:outline-none focus:border-[#333333]"
                    style={{ height: "48px", transition: "border-color 0.4s ease-in-out" }}
                    id="brand-search"
                    data-test-id="textInputContainer"
                  />
                </div>
                </div>
              </div>

              {/* Product Section Header */}
              <h4 
                className="mb-4 text-[#333333]"
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

              {/* Filters */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
              <button className="flex items-center gap-2 px-3 py-2 border border-[#dfe0e1] rounded text-sm text-[#333333] hover:bg-gray-100 transition-colors">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9.30001 9.66659H12V10.3333H9.30001C9.14559 11.094 8.47299 11.6666 7.66667 11.6666C6.74619 11.6666 6 10.9204 6 9.99992C6 9.07944 6.74619 8.33325 7.66667 8.33325C8.47299 8.33325 9.14559 8.90584 9.30001 9.66659ZM5.30001 5.66659H12V6.33325H5.30001C5.14559 7.094 4.47299 7.66659 3.66667 7.66659C2.74619 7.66659 2 6.92039 2 5.99992C2 5.07944 2.74619 4.33325 3.66667 4.33325C4.47299 4.33325 5.14559 4.90584 5.30001 5.66659ZM10.6333 1.66659H12V2.33325H10.6333C10.4789 3.094 9.80632 3.66659 9 3.66659C8.07953 3.66659 7.33333 2.92039 7.33333 1.99992C7.33333 1.07944 8.07953 0.333252 9 0.333252C9.80632 0.333252 10.4789 0.905839 10.6333 1.66659Z" />
                </svg>
                <span>All filters</span>
              </button>
              <button className="px-3 py-2 border border-[#dfe0e1] rounded text-sm text-[#333333] hover:bg-gray-100 transition-colors">
                Chocolate bars
              </button>
              <button className="px-3 py-2 border border-[#dfe0e1] rounded text-sm text-[#333333] hover:bg-gray-100 transition-colors">
                Spreads & nut butters
              </button>
              <div className="ml-auto">
                <PillButton variant="toggle" ariaLabel="Sort by Featured">
                  Sort by Featured
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1 6.00005L6 0.994751L11 6.00005" />
                  </svg>
                </PillButton>
              </div>
            </div>

              {/* Product Grid */}
              <div className="mb-6">
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
      </main>
    </RetailerLayout>
  );
}

