import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RetailerLayout from "../components/RetailerLayout";
import { ProductTile } from "../components/shared";
import { getProductsForGrid } from "../data/products";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [resultType, setResultType] = useState<"products" | "brands">("products");

  // Get products for 20 rows (120 products for 6-column layout at 1440px)
  const products = getProductsForGrid(20, 6);

  const filterOptions = [
    { id: "no-import-duties", label: "No import duties" },
    { id: "bestsellers", label: "Bestsellers" },
    { id: "sale", label: "Sale" },
    { id: "low-minimum", label: "Low minimum" },
    { id: "insider-free-shipping", label: "Free shipping with Insider", hasIcon: true, iconType: "insider" },
    { id: "top-shop", label: "Top Shop", hasIcon: true, iconType: "topshop" },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  // Filter icon
  const FilterIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="currentColor" d="M3 5.214 21 5.214" />
      <path stroke="currentColor" d="M3 19.357 21 19.357" />
      <path stroke="currentColor" d="M8.5 23 8.5 15.143" />
      <path stroke="currentColor" d="M16 8.857 16 1" />
    </svg>
  );

  // Insider icon
  const InsiderIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#36676a" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.874 8A4.002 4.002 0 0 1 1 7a4 4 0 0 1 7.874-1H15v3.75h-3V8zM5 9.222a2.222 2.222 0 1 0 0-4.444 2.222 2.222 0 0 0 0 4.444"
        fill="currentColor"
      />
    </svg>
  );

  // Top Shop icon (simplified version)
  const TopShopIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 33 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#ffffff" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.7386 25.8757C26.9767 23.7168 28.2269 20.7777 28.2269 17.721V2.14441H4.42419V17.721C4.42419 20.7777 5.66423 23.7168 7.90235 25.8757C9.51267 27.429 11.5301 28.4955 13.7105 28.9715C11.1775 29.7309 9.18703 31.5645 8.39131 33.8813H24.2597C23.4636 31.5713 21.4645 29.7329 18.9313 28.9717C21.1144 28.4958 23.1353 27.4292 24.7386 25.8757Z"
        fill="#8B9478"
      />
      <path
        d="M16.5194 7.32299L17.9511 11.0387C17.9915 11.1421 18.1009 11.1967 18.2046 11.1642L21.9322 9.99353C22.1122 9.93743 22.2663 10.1353 22.1727 10.3021L20.2297 13.7683C20.1764 13.8643 20.2038 13.9868 20.2916 14.0503L23.5079 16.3075C23.6634 16.4167 23.6087 16.6632 23.4214 16.6928L19.5686 17.2965C19.462 17.3128 19.3857 17.4117 19.3929 17.5224L19.6766 21.5068C19.691 21.6987 19.4678 21.8094 19.3295 21.6781L16.4662 18.9662C16.3869 18.8909 16.2645 18.8909 16.1853 18.9662L13.322 21.6781C13.1837 21.8094 12.9604 21.6987 12.9748 21.5068L13.2586 17.5224C13.2658 17.4117 13.1894 17.3143 13.0829 17.2965L9.22858 16.6928C9.04278 16.6632 8.98805 16.4167 9.14216 16.3075L12.3584 14.0503C12.4477 13.9883 12.475 13.8657 12.4203 13.7683L10.4802 10.3035C10.3866 10.1367 10.5407 9.93743 10.7207 9.99501L14.4483 11.1657C14.552 11.1982 14.6629 11.1435 14.7018 11.0402L16.1334 7.32447C16.2026 7.14437 16.4503 7.14437 16.5194 7.32299Z"
        fill="white"
      />
    </svg>
  );

  return (
    <RetailerLayout languageSelector={false} cartCount={0}>
      <div
        className="retailer-12col-grid mx-auto"
        style={{
          maxWidth: "1920px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "24px",
          paddingBottom: "48px",
        }}
      >
        {/* Sticky Filter Row */}
        <div
          style={{
            gridColumn: "1 / -1",
            position: "sticky",
            top: "104px",
            zIndex: 10,
            backgroundColor: "var(--color-surface-primary)",
            transition: "top 0.4s cubic-bezier(0.1, 0.7, 0.6, 1)",
            paddingTop: "8px",
            paddingBottom: "0px",
          }}
          className="-mx-4 flex items-center pl-4 md:px-4 lg:-mx-12 lg:px-12 md:pt-4"
        >
          <div className="flex items-center w-full flex-wrap">
            {/* All Filters Button - Desktop */}
            <div className="hidden md:block mr-2">
              <button
                role="button"
                tabIndex={0}
                aria-label="Open filters sidebar"
                className="flex items-center gap-1 px-3 rounded-full text-sm type-paragraph transition-colors cursor-pointer"
                style={{
                  height: "40px",
                  border: "1px solid rgb(223, 224, 225)",
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "#333333",
                }}
              >
                <div style={{ width: "4px", height: 0 }} />
                <span className="type-paragraph">All filters</span>
                <div style={{ width: "4px", height: 0 }} />
                <FilterIcon />
              </button>
            </div>

            {/* All Filters Button - Mobile */}
            <div className="md:hidden mr-2">
              <button
                role="button"
                tabIndex={0}
                aria-label="Open filters modal"
                className="flex items-center gap-1 px-3 rounded-full text-sm type-paragraph transition-colors cursor-pointer"
                style={{
                  height: "40px",
                  border: "1px solid rgb(223, 224, 225)",
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "#333333",
                  width: "max-content",
                }}
              >
                <div style={{ width: "4px", height: 0 }} />
                <span className="type-paragraph">All filters</span>
                <div style={{ width: "4px", height: 0 }} />
                <FilterIcon />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap">
              {filterOptions.map((filter) => (
                <div key={filter.id} className="mr-2">
                  <button
                    role="button"
                    tabIndex={0}
                    aria-pressed={activeFilters.includes(filter.id)}
                    aria-label={filter.label}
                    onClick={() => toggleFilter(filter.id)}
                    className="flex items-center gap-1 px-3 rounded-full text-sm type-paragraph transition-colors"
                    style={{
                      height: "40px",
                      border: "1px solid rgb(223, 224, 225)",
                      backgroundColor: "rgb(255, 255, 255)",
                      color: filter.id === "insider-free-shipping" && activeFilters.includes(filter.id) ? "#154548" : "#333333",
                    }}
                  >
                    {filter.hasIcon && filter.iconType === "insider" && (
                      <>
                        <InsiderIcon />
                        <div style={{ width: "4px", height: 0 }} />
                      </>
                    )}
                    {filter.hasIcon && filter.iconType === "topshop" && (
                      <>
                        <TopShopIcon />
                        <div style={{ width: "4px", height: 0 }} />
                      </>
                    )}
                    <span
                      className={filter.id === "insider-free-shipping" && activeFilters.includes(filter.id) ? "type-paragraph-medium" : "type-paragraph"}
                      style={{
                        color: filter.id === "insider-free-shipping" && activeFilters.includes(filter.id) ? "#154548" : "#333333",
                      }}
                    >
                      {filter.label}
                    </span>
                  </button>
                </div>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-grow hidden lg:block" style={{ minWidth: "40px" }} />

            {/* Products/Brands Toggle (Desktop Only) */}
            <div className="hidden lg:block">
              <div
                className="relative inline-flex h-10 items-center gap-1 rounded-[20px] border p-1"
                style={{
                  backgroundColor: "var(--color-surface-primary)",
                  borderColor: "rgb(223, 224, 225)",
                }}
              >
                <div
                  className="absolute h-8 rounded-2xl transition-all duration-300 ease-out pointer-events-none"
                  style={{
                    backgroundColor: "var(--color-action-surface-default)",
                    left: resultType === "products" ? "4px" : "calc(100% - 91.609375px - 4px)",
                    width: "91.609375px",
                  }}
                />
                <button
                  aria-pressed={resultType === "products"}
                  onClick={() => setResultType("products")}
                  className="relative flex h-8 cursor-pointer items-center rounded-2xl px-4 type-paragraph transition-colors duration-300 z-10"
                  style={{
                    color: resultType === "products" ? "var(--color-text-inverse)" : "var(--color-text-primary)",
                  }}
                >
                  Products
                </button>
                <button
                  aria-pressed={resultType === "brands"}
                  onClick={() => setResultType("brands")}
                  className="relative flex h-8 cursor-pointer items-center rounded-2xl px-4 type-paragraph transition-colors duration-300 z-10"
                  style={{
                    color: resultType === "brands" ? "var(--color-text-inverse)" : "var(--color-text-primary)",
                  }}
                >
                  Brands
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid - All 12 Columns */}
        <div style={{ gridColumn: "1 / -1", marginTop: "24px" }}>
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
    </RetailerLayout>
  );
}

