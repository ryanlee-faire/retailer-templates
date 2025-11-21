import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SurfacesMenu from "./SurfacesMenu";
import { useCompass } from "../contexts/CompassContext";
import SearchDropdown from "./SearchDropdown";

// Hook to detect viewport size
function useViewport() {
  const [viewport, setViewport] = useState<"Mobile web" | "Tablet" | "Desktop">(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) return "Mobile web";
      if (width < 1024) return "Tablet";
      return "Desktop";
    }
    return "Desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewport("Mobile web");
      } else if (width < 1024) {
        setViewport("Tablet");
      } else {
        setViewport("Desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}

// SVG Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-search"
      role="img"
      style={{ color: "#333333", fill: "none" }}
    >
      <path
        d="M.857 10.144a9.287 9.287 0 1 0 18.573 0 9.287 9.287 0 0 0-18.573 0ZM23.143 23.143l-6.434-6.434"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-search">Search</title>
    </svg>
  );
}

function NotificationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-notification"
      role="img"
      style={{ color: "#333333", fill: "none", fontSize: "20px" }}
    >
      <path
        d="M9.171 20.133a2.71 2.71 0 0 0 2.622 2.028 2.71 2.71 0 0 0 2.622-2.028M12.15 2.015c1.864 0 3.652.768 4.97 2.136a7.43 7.43 0 0 1 2.059 5.157c0 8.11 2.85 8.327 3.621 8.327H1.5c.786 0 3.621-.235 3.621-8.327 0-1.934.74-3.79 2.059-5.157a6.9 6.9 0 0 1 4.97-2.136Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-notification">Notification</title>
    </svg>
  );
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-account"
      role="img"
      style={{ color: "#333333", fill: "none", fontSize: "24px" }}
    >
      <path
        d="M8 6.857a4 4 0 1 0 8 0 4 4 0 0 0-8 0ZM21 20.437c-.617-1.743-1.82-3.263-3.437-4.341S14 14.437 12 14.437s-3.947.581-5.563 1.659C4.82 17.174 3.617 18.694 3 20.437z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-account">Account</title>
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-cart"
      role="img"
      style={{ color: "#333333", fill: "none", fontSize: "20px" }}
    >
      <path
        d="M20.74 14.714H7.744L6.029 5.286h16.114a.857.857 0 0 1 .843 1.01l-1.402 7.714a.86.86 0 0 1-.843.704ZM6.029 5.286l-.72-3.6A.86.86 0 0 0 4.469 1H1.743M7.743 14.714l.72 3.6a.86.86 0 0 0 .84.686h9.583"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.884 22.429a.857.857 0 1 1-1.714 0 .857.857 0 0 1 1.714 0ZM11.17 22.429a.857.857 0 1 1-1.715 0 .857.857 0 0 1 1.715 0Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-cart">Cart</title>
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: "black" }}
    >
      <path d="M1 0.994751L6 6.00005L11 0.994751" stroke="currentColor" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-compass"
      role="img"
      style={{ color: "#333333", fill: "none", fontSize: "20px" }}
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M16 8L12 12L8 16L12 12L16 8Z" 
        fill="currentColor" 
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 2v2M12 20v2M2 12h2M20 12h2" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <title id="titleAccess-compass">Compass</title>
    </svg>
  );
}

type RetailerGlobalNavLoggedInProps = {
  languageSelector?: boolean;
  device?: "Desktop" | "Tablet" | "Mobile web";
  cartCount?: number;
  focused?: boolean;
  focused2?: boolean;
  hideSearch?: boolean; // New prop for variant without search bar
  navSearchBar?: React.ReactNode; // Search bar to show in nav
};

export default function RetailerGlobalNavLoggedIn({
  languageSelector = false,
  device,
  cartCount = 0,
  focused = false,
  focused2 = false,
  hideSearch = false,
  navSearchBar = null,
}: RetailerGlobalNavLoggedInProps) {
  const detectedDevice = useViewport();
  const currentDevice = device || detectedDevice;
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { togglePanel } = useCompass();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Only enable Compass on specific routes (not on index page)
  const isCompassEnabled = location.pathname !== '/';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    if (showSearchDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchDropdown]);

  const handleSearchFocus = () => {
    setShowSearchDropdown(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setShowSearchDropdown(true);
  };

  // Production bottom nav links
  const bottomNavLinks = [
    { label: "Brand updates", href: "/my-brands/updates", testId: "header-my_brands-dropdown-link" },
    { label: "Bestsellers", href: "/category/Bestsellers", testId: "header-bestsellers-dropdown-link" },
    { label: "New products", href: "/category/New Products", testId: "header-new_products-dropdown-link" },
    { label: "New brands", href: "/category/New Brands", testId: "header-new_brands-dropdown-link" },
    { label: "Gifts", href: "/category/Gifts", testId: "header-gifts-dropdown-link" },
    { label: "Home decor", href: "/category/Home Decor", testId: "header-home_living-dropdown-link" },
    { label: "Food & drink", href: "/category/Food & Drink", testId: "header-food_drink-dropdown-link" },
    { label: "Holiday Shop", href: "/category/Holiday Shop", testId: "header-holiday_shop-dropdown-link" },
    { label: "Sale", href: "/category/Sale", testId: "header-sale-dropdown-link", isSale: true },
  ];

  // Tablet layout
  if (currentDevice === "Tablet") {
    return (
      <header className="relative z-[301] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
        <div className="m-auto w-full lg:px-12 lg:pt-4 flex items-center justify-center gap-4 px-4 py-4" style={{ maxWidth: "1920px", width: "100%" }}>
          <button
            aria-label="Menu"
            className="bg-white flex items-center justify-center p-2.5 rounded-full w-10 h-10"
            type="button"
          >
            <div className="w-5 h-0.5 bg-[#333333]"></div>
          </button>
          <a id="faire-logo-link" aria-label="Go to Faire homepage" href="/" className="h-6 w-[98px] relative">
            <img alt="Faire Logo" src="https://cdn.faire.com/static/logo.svg" className="h-full w-full object-contain" onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "http://localhost:3845/assets/1e3ffc68be20eda669774f7388f9632f2f0bab67.svg";
            }} />
          </a>
          <div className="flex-1" style={{ position: "relative" }} ref={searchContainerRef}>
            <div className="bg-white border border-[#757575] rounded-full flex items-center gap-2 h-10 px-4 pr-5">
              <input
                id="top-search"
                placeholder="Search products or brands"
                aria-label="Search products or brands"
                autoComplete="off"
                data-test-id="searchBarInput"
                className="flex-1 bg-transparent border-0 outline-0 text-[#333333] text-sm placeholder:text-[#757575]"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={handleSearchFocus}
              />
              <div className="flex items-center justify-center">
                <SearchIcon className="w-4 h-4" />
              </div>
            </div>
            {showSearchDropdown && isCompassEnabled && (
              <SearchDropdown 
                searchQuery={searchValue} 
                onClose={() => setShowSearchDropdown(false)} 
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <SurfacesMenu />
            {isCompassEnabled && (
              <button
                data-test-id="compassButton"
                onClick={togglePanel}
                className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
                aria-label="Compass"
                type="button"
              >
                <div className="flex items-center justify-center w-10 h-10 relative">
                  <CompassIcon className="w-5 h-5" />
                </div>
              </button>
            )}
            <button
              data-test-id="notificationDropdown"
              className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
              aria-label="Notifications"
              type="button"
            >
              <div className="flex items-center justify-center w-10 h-10 relative">
                <NotificationIcon className="w-5 h-5" />
              </div>
            </button>
            <button
              aria-label="My Profile"
              data-test-id="accountDropdown"
              className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
              type="button"
            >
              <div className="flex items-center justify-center w-10 h-10 relative">
                <AccountIcon className="w-6 h-6" />
              </div>
            </button>
            <a
              data-test-id="headerCartButton"
              href="/cart"
              className="flex items-center justify-center relative rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
              style={{ height: "unset", width: "40px" }}
            >
              <div className="flex items-center justify-center w-10 h-10 relative">
                <CartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 flex items-center justify-center bg-[#333333] text-white rounded-full min-w-[18px] h-[18px] px-1 text-xs font-medium z-10">
                    {cartCount > 99 ? "99+" : cartCount}
                  </div>
                )}
              </div>
            </a>
          </div>
        </div>
      </header>
    );
  }

  // Mobile web layout
  if (currentDevice === "Mobile web") {
    return (
      <header className="relative z-[301] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b h-[112px] print:hidden">
        <div className="h-[112px] relative w-full" ref={searchContainerRef}>
          <div className="absolute bg-white h-[112px] left-0 top-0 w-full" />
          <div className="absolute bg-white border border-[#757575] rounded-full flex items-center gap-2 h-10 left-4 right-4 px-4 pr-5 top-14">
            <input
              id="top-search"
              placeholder="Search products or brands"
              aria-label="Search products or brands"
              autoComplete="off"
              data-test-id="searchBarInput"
              className="flex-1 bg-transparent border-0 outline-0 text-[#333333] text-sm placeholder:text-[#757575]"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleSearchFocus}
            />
            <div className="flex items-center justify-center">
              <SearchIcon className="w-4 h-4" />
            </div>
          </div>
          {showSearchDropdown && isCompassEnabled && (
            <div className="absolute top-[72px] left-4 right-4">
              <SearchDropdown 
                searchQuery={searchValue} 
                onClose={() => setShowSearchDropdown(false)} 
              />
            </div>
          )}
          <button
            aria-label="Menu"
            className="absolute bg-white flex items-center justify-center p-2.5 rounded-full w-10 h-10 left-2 top-2"
            type="button"
          >
            <div className="w-5 h-0.5 bg-[#333333]"></div>
          </button>
          <a id="faire-logo-link" aria-label="Go to Faire homepage" href="/" className="absolute h-6 w-[98px] left-[60px] top-4">
            <img alt="Faire Logo" src="https://cdn.faire.com/static/logo.svg" className="h-full w-full object-contain" />
          </a>
          <a
            data-test-id="headerCartButton"
            href="/cart"
            className="absolute flex items-center justify-center w-10 h-10 right-2 top-2 relative rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
          >
            <div className="flex items-center justify-center w-10 h-10 relative">
              <CartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center justify-center bg-[#333333] text-white rounded-full min-w-[18px] h-[18px] px-1 text-xs font-medium z-10">
                  {cartCount > 99 ? "99+" : cartCount}
                </div>
              )}
            </div>
          </a>
          {isCompassEnabled && (
            <button
              data-test-id="compassButton"
              onClick={togglePanel}
              className="absolute bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 right-[88px] top-2 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
              aria-label="Compass"
              type="button"
            >
              <div className="flex items-center justify-center w-10 h-10 relative">
                <CompassIcon className="w-5 h-5" />
              </div>
            </button>
          )}
          <button
            data-test-id="notificationDropdown"
            className="absolute bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 top-2 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
            style={isCompassEnabled ? { right: '48px' } : { right: '12px' }}
            aria-label="Notifications"
            type="button"
          >
            <div className="flex items-center justify-center w-10 h-10 relative">
              <NotificationIcon className="w-5 h-5" />
            </div>
          </button>
        </div>
      </header>
    );
  }

  // Focused variant - only logo (centered, same position as full variant)
  if (focused) {
    return (
      <header className="sticky top-0 z-[301] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
        <div className="m-auto w-full lg:px-12 lg:pt-4 flex items-center justify-center px-4 py-4" style={{ maxWidth: "1920px", width: "100%" }}>
          <button
            aria-label="Menu"
            className="lg:hidden bg-white flex items-center justify-center p-2.5 rounded-full w-10 h-10"
            type="button"
          >
            <div className="w-5 h-0.5 bg-[#333333]"></div>
          </button>
          <a id="faire-logo-link" aria-label="Go to Faire homepage" href="/" className="h-6 w-[98px] relative shrink-0">
            <img alt="Faire Logo" src="https://cdn.faire.com/static/logo.svg" className="h-full w-full object-contain" onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "http://localhost:3845/assets/1e3ffc68be20eda669774f7388f9632f2f0bab67.svg";
            }} />
          </a>
        </div>
      </header>
    );
  }

  // Focused variant 2 - only logo (left-aligned, same position as standard variant)
  // Adjusted padding to account for search bar height in standard variant
  if (focused2) {
    return (
      <header className="sticky top-0 z-[301] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
        <div className="m-auto w-full lg:px-12 flex items-center px-4 pt-5 pb-5 lg:pt-5" style={{ maxWidth: "1920px", width: "100%" }}>
          <button
            aria-label="Menu"
            className="lg:hidden bg-white flex items-center justify-center p-2.5 rounded-full w-10 h-10"
            type="button"
          >
            <div className="w-5 h-0.5 bg-[#333333]"></div>
          </button>
          <a id="faire-logo-link" aria-label="Go to Faire homepage" href="/" className="h-6 w-[98px] relative shrink-0">
            <img alt="Faire Logo" src="https://cdn.faire.com/static/logo.svg" className="h-full w-full object-contain" onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "http://localhost:3845/assets/1e3ffc68be20eda669774f7388f9632f2f0bab67.svg";
            }} />
          </a>
        </div>
      </header>
    );
  }

  // Desktop layout
  return (
    <header className="sticky top-0 z-[301] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
      {/* Top Nav */}
      <div className="m-auto w-full lg:px-12 lg:pt-4 flex items-center justify-center px-4 py-4" style={{ maxWidth: "1920px", width: "100%" }}>
        <button
          aria-label="Menu"
          className="lg:hidden bg-white flex items-center justify-center p-2.5 rounded-full w-10 h-10"
          type="button"
        >
          <div className="w-5 h-0.5 bg-[#333333]"></div>
        </button>
        <a id="faire-logo-link" aria-label="Go to Faire homepage" href="/" className="h-6 w-[98px] relative shrink-0">
          <img alt="Faire Logo" src="https://cdn.faire.com/static/logo.svg" className="h-full w-full object-contain" onError={(e) => {
            // Fallback to MCP server if CDN fails
            const target = e.target as HTMLImageElement;
            target.src = "http://localhost:3845/assets/1e3ffc68be20eda669774f7388f9632f2f0bab67.svg";
          }} />
        </a>
        <div className="hidden lg:block" style={{ width: "16px", height: "16px" }} />
        <div className="hidden lg:block">
          <button
            aria-label="All categories"
            aria-haspopup="menu"
            className="flex items-center h-10 px-4 rounded-[8px] bg-transparent border-0 cursor-pointer hover:bg-gray-100 transition-colors duration-500 ease-in-out text-sm leading-5 font-normal text-[#333333]"
            type="button"
          >
            All categories
            <div style={{ width: "8px" }} />
            <ChevronDownIcon className="w-3 h-2" />
          </button>
        </div>
        {navSearchBar ? (
          <>
            <div className="hidden lg:block flex-1" />
            <div className="hidden lg:flex items-center justify-center max-w-2xl w-full">
              <div 
                className="w-full max-w-2xl"
                style={{
                  animation: 'fade-in-scale 0.3s ease-out forwards'
                }}
              >
                {navSearchBar}
              </div>
            </div>
            <div className="hidden lg:block flex-1" />
          </>
        ) : !hideSearch && (
          <>
            <div className="hidden lg:block" style={{ width: "16px", height: "16px" }} />
            <div style={{ flex: "1 1 0%", position: "relative" }} ref={searchContainerRef}>
              <div className="bg-white border border-[#757575] rounded-full flex items-center h-10 px-4 pr-5">
                <input
                  id="top-search"
                  placeholder="Search products or brands"
                  aria-label="Search products or brands"
                  autoComplete="off"
                  data-test-id="searchBarInput"
                  className="flex-1 bg-transparent border-0 outline-0 text-[#333333] text-sm placeholder:text-[#757575]"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={handleSearchFocus}
                />
                <div className="flex items-center justify-center">
                  <SearchIcon className="w-4 h-4" />
                </div>
              </div>
              {showSearchDropdown && isCompassEnabled && (
                <SearchDropdown 
                  searchQuery={searchValue} 
                  onClose={() => setShowSearchDropdown(false)} 
                />
              )}
            </div>
            <div className="hidden lg:block" style={{ width: "16px", height: "0px" }} />
            <div className="hidden lg:block" style={{ width: "12px", height: "0px" }} />
          </>
        )}
        {hideSearch && <div className="hidden lg:block flex-1" />}
        {!hideSearch && <div className="hidden lg:block" style={{ width: "12px", height: "0px" }} />}
        {languageSelector && (
          <>
            <div className="hidden lg:block" style={{ width: "12px" }} />
            <button
              className="hidden lg:flex items-center gap-2 h-10 px-4 rounded-full bg-transparent border-0 cursor-pointer hover:bg-gray-50"
              aria-label="Language selector"
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="text-sm text-[#333333]">EN-US</span>
            </button>
          </>
        )}
        {isCompassEnabled && (
          <>
            <div>
              <button
                data-test-id="compassButton"
                onClick={togglePanel}
                className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
                aria-label="Compass"
                type="button"
              >
                <div className="flex items-center justify-center w-10 h-10 relative">
                  <CompassIcon className="w-5 h-5" />
                </div>
              </button>
            </div>
            <div className="hidden lg:block" style={{ width: "8px", height: "0px" }} />
          </>
        )}
        <div>
          <button
            data-test-id="notificationDropdown"
            className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
            aria-label="Notifications"
            type="button"
          >
            <div className="flex items-center justify-center w-10 h-10 relative">
              <NotificationIcon className="w-5 h-5" />
            </div>
          </button>
        </div>
        <div className="hidden lg:block" style={{ width: "8px", height: "0px" }} />
        <div>
          <button
            aria-label="My Profile"
            data-test-id="accountDropdown"
            className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
            type="button"
          >
            <div className="flex items-center justify-center w-10 h-10 relative">
              <AccountIcon className="w-6 h-6" />
            </div>
          </button>
        </div>
        <div style={{ width: "8px" }} />
        <div>
          <a
            data-test-id="headerCartButton"
            href="/cart"
            className="flex items-center justify-center relative rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
            style={{ height: "unset", width: "40px" }}
          >
            <div className="flex items-center justify-center w-10 h-10 relative">
              <CartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center justify-center bg-[#333333] text-white rounded-full min-w-[18px] h-[18px] px-1 text-xs font-medium z-10">
                  {cartCount > 99 ? "99+" : cartCount}
                </div>
              )}
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Nav Links - Only show if search is not hidden */}
      {!hideSearch && (
        <div className="bg-white flex min-h-[47px] w-full flex-row justify-center hidden lg:flex">
          <div className="bg-white relative flex">
            <div
              data-test-id="desktop-header-c1-categories"
              className="relative flex flex-row flex-wrap justify-center px-6 pt-2.5 pb-2"
            >
              {bottomNavLinks.map((link) => (
                <div key={link.href} aria-haspopup="menu" className="relative px-2 py-1 flex cursor-pointer">
                  <a
                    className={`text-sm leading-5 active:text-[#757575] focus:text-[#757575] border-b border-solid border-transparent whitespace-nowrap hover:border-[#333333] transition-colors duration-500 ease-in-out ${
                      link.isSale ? "text-[#7d3e1e]" : "text-[#333333]"
                    }`}
                    aria-label={link.label}
                    data-test-id={link.testId}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
              <div className="invisible absolute bottom-0 w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
