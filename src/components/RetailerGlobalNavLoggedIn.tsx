import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SurfacesMenu from "./SurfacesMenu";
import { useCompass } from "../contexts/CompassContext";
import SearchDropdown, { SearchDropdownHandle } from "./SearchDropdown";
import { isConversationalQuery } from "../utils/searchIntentDetection";

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
      width="25"
      height="25"
      viewBox="0 0 28 25"
      aria-labelledby="titleAccess-compass"
      role="img"
      style={{ color: "#333333", fontSize: "25px" }}
    >
      <path
        d="M15.5 9.5L15.9642 9.6857L16.3975 8.60247L15.3143 9.03576L15.5 9.5ZM3 14.5L2.8143 14.0358L2.93798 14.9961L3 14.5ZM9.66667 15.3333L10.1628 15.2713L10.1146 14.8854L9.72868 14.8372L9.66667 15.3333ZM10.5 22L10.0039 22.062L10.9642 22.1857L10.5 22ZM22 0.5C22 0.223858 21.7761 0 21.5 0C21.2239 0 21 0.223858 21 0.5H21.5H22ZM25.5 5C25.7761 5 26 4.77614 26 4.5C26 4.22386 25.7761 4 25.5 4V4.5V5ZM21.5 8.5H21C21 8.77172 21.217 8.9937 21.4886 8.99987C21.7603 9.00604 21.9871 8.79414 21.9995 8.5227L21.5 8.5ZM17.5 4C17.2239 4 17 4.22386 17 4.5C17 4.77614 17.2239 5 17.5 5V4.5V4ZM26 10.5C26 10.2239 25.7761 10 25.5 10C25.2239 10 25 10.2239 25 10.5H25.5H26ZM27.5 13C27.7761 13 28 12.7761 28 12.5C28 12.2239 27.7761 12 27.5 12V12.5V13ZM25.5 14.5H25C25 14.7717 25.217 14.9937 25.4886 14.9999C25.7603 15.006 25.9871 14.7941 25.9995 14.5227L25.5 14.5ZM23.5 12C23.2239 12 23 12.2239 23 12.5C23 12.7761 23.2239 13 23.5 13V12.5V12ZM20.5 14.5H20C20 19.7467 15.7467 24 10.5 24V24.5V25C16.299 25 21 20.299 21 14.5H20.5ZM10.5 24.5V24C5.25329 24 1 19.7467 1 14.5H0.5H0C0 20.299 4.70101 25 10.5 25V24.5ZM0.5 14.5H1C1 9.25329 5.25329 5 10.5 5V4.5V4C4.70101 4 0 8.70101 0 14.5H0.5ZM10.5 4.5V5C15.7467 5 20 9.25329 20 14.5H20.5H21C21 8.70101 16.299 4 10.5 4V4.5ZM15.5 9.5L15.3143 9.03576L2.8143 14.0358L3 14.5L3.1857 14.9642L15.6857 9.96424L15.5 9.5ZM3 14.5L2.93798 14.9961L9.60465 15.8295L9.66667 15.3333L9.72868 14.8372L3.06202 14.0039L3 14.5ZM9.66667 15.3333L9.17053 15.3954L10.0039 22.062L10.5 22L10.9961 21.938L10.1628 15.2713L9.66667 15.3333ZM10.5 22L10.9642 22.1857L15.9642 9.6857L15.5 9.5L15.0358 9.3143L10.0358 21.8143L10.5 22ZM21.5 0.5H21C21 1.85977 21.3081 3.00935 22.0799 3.8162C22.8557 4.62733 24.0113 5 25.5 5V4.5V4C24.1651 4 23.3208 3.66679 22.8025 3.12498C22.2802 2.57889 22 1.72846 22 0.5H21.5ZM25.5 4.5V4C24.1156 4 22.9989 4.37954 22.2161 5.17976C21.4388 5.97438 21.0626 7.1107 21.0005 8.4773L21.5 8.5L21.9995 8.5227C22.055 7.30106 22.3848 6.43739 22.9309 5.87906C23.4716 5.32634 24.2961 5 25.5 5V4.5ZM21.5 8.5H22C22 7.19357 21.6894 6.0496 20.9238 5.23182C20.1525 4.40789 18.9995 4 17.5 4V4.5V5C18.824 5 19.671 5.35682 20.1938 5.91524C20.7223 6.47981 21 7.33584 21 8.5H21.5ZM17.5 4.5V5C18.8598 5 20.0093 4.69192 20.8162 3.92014C21.6273 3.14428 22 1.98867 22 0.5H21.5H21C21 1.83486 20.6668 2.67925 20.125 3.1975C19.5789 3.71985 18.7285 4 17.5 4V4.5ZM25.5 10.5H25C25 11.2127 25.161 11.8623 25.6093 12.3309C26.0616 12.8038 26.7172 13 27.5 13V12.5V12C26.871 12 26.5266 11.8433 26.3319 11.6397C26.1331 11.4318 26 11.0814 26 10.5H25.5ZM27.5 12.5V12C26.7627 12 26.1313 12.2031 25.6793 12.6651C25.2329 13.1214 25.0332 13.7578 25.0005 14.4773L25.5 14.5L25.9995 14.5227C26.0256 13.9481 26.1789 13.5844 26.3942 13.3644C26.604 13.1499 26.9432 13 27.5 13V12.5ZM25.5 14.5H26C26 13.8112 25.8365 13.1672 25.3944 12.6951C24.9466 12.2167 24.2937 12 23.5 12V12.5V13C24.1181 13 24.4652 13.1656 24.6644 13.3785C24.8694 13.5975 25 13.9535 25 14.5H25.5ZM23.5 12.5V13C24.2127 13 24.8623 12.839 25.3309 12.3907C25.8038 11.9384 26 11.2828 26 10.5H25.5H25C25 11.129 24.8433 11.4734 24.6397 11.6681C24.4318 11.8669 24.0814 12 23.5 12V12.5Z"
        fill="#333333"
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
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { togglePanel, openPanel, clearMessages, closePanel, state } = useCompass();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<SearchDropdownHandle>(null);

  // Dev shortcut: Click bell to open Compass with preset query
  const handleNotificationClick = () => {
    if (isCompassEnabled) {
      openPanel('search', 'New York City hotel room gifts for guests');
    }
  };

  // Reset prototype to beginning when clicking person icon
  const handleProfileClick = useCallback(() => {
    // Close panel first
    closePanel();
    // Clear all Compass state first
    clearMessages();
    // Navigate to home page (use replace to avoid back button issues)
    navigate('/template', { replace: true });
  }, [closePanel, clearMessages, navigate]);

  // Enable Compass on template, category, and PDP routes (Compass prototype)
  const isCompassEnabled = 
    location.pathname === '/template' ||
    location.pathname.startsWith('/category/') ||
    location.pathname === '/pdp';

  // Keyboard shortcut: CMD/CTRL + Shift + R to restart prototype
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleProfileClick();
      }
    };

    if (isCompassEnabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isCompassEnabled, handleProfileClick]);

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

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isCompassEnabled && isConversationalQuery(searchValue) && searchDropdownRef.current) {
      e.preventDefault();
      searchDropdownRef.current.selectHighlighted();
    }
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
      <header className="relative z-[600] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
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
                placeholder="What are you looking for?"
                aria-label="What are you looking for?"
                autoComplete="off"
                data-test-id="searchBarInput"
                className="flex-1 bg-transparent border-0 outline-0 text-[#333333] text-sm placeholder:text-[#757575]"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={handleSearchFocus}
                onKeyDown={handleSearchKeyDown}
              />
              <div className="flex items-center justify-center">
                <SearchIcon className="w-4 h-4" />
              </div>
            </div>
            {showSearchDropdown && isCompassEnabled && (
              <SearchDropdown
                ref={searchDropdownRef}
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
                className={`bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-all duration-300 ease-in-out ${
                  state.isPanelOpen 
                    ? 'opacity-0 scale-95 pointer-events-none' 
                    : 'opacity-100 scale-100 pointer-events-auto'
                }`}
                aria-label="Compass"
                type="button"
              >
                <div className="flex items-center justify-center w-10 h-10 relative">
                  <CompassIcon className="w-[25px] h-[25px]" />
                </div>
              </button>
            )}
            <button
              data-test-id="notificationDropdown"
              className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
              aria-label="Notifications"
              type="button"
              onClick={handleNotificationClick}
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
              onClick={handleProfileClick}
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
      <header className="relative z-[600] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b h-[112px] print:hidden">
        <div className="h-[112px] relative w-full" ref={searchContainerRef}>
          <div className="absolute bg-white h-[112px] left-0 top-0 w-full" />
          <div className="absolute bg-white border border-[#757575] rounded-full flex items-center gap-2 h-10 left-4 right-4 px-4 pr-5 top-14">
            <input
              id="top-search"
              placeholder="Search or use a phrase"
              aria-label="Search or use a phrase"
              autoComplete="off"
              data-test-id="searchBarInput"
              className="flex-1 bg-transparent border-0 outline-0 text-[#333333] text-sm placeholder:text-[#757575]"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleSearchFocus}
              onKeyDown={handleSearchKeyDown}
            />
            <div className="flex items-center justify-center">
              <SearchIcon className="w-4 h-4" />
            </div>
          </div>
          {showSearchDropdown && isCompassEnabled && (
            <div className="absolute top-[72px] left-4 right-4">
              <SearchDropdown
                ref={searchDropdownRef}
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
              className={`absolute bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 right-[88px] top-2 rounded-[8px] hover:bg-gray-100 transition-all duration-300 ease-in-out ${
                state.isPanelOpen 
                  ? 'opacity-0 scale-95 pointer-events-none' 
                  : 'opacity-100 scale-100 pointer-events-auto'
              }`}
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
            onClick={handleNotificationClick}
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
      <header className="sticky top-0 z-[600] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
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
      <header className="sticky top-0 z-[600] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
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
    <header className="relative z-[600] flex w-full flex-col items-stretch bg-white border-[#dfe0e1] border-b print:hidden">
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
        <div className="hidden lg:block" style={{ width: "16px", height: "16px" }} />
        <div style={{ flex: "1 1 0%", position: "relative" }} ref={searchContainerRef}>
          <div className="bg-white border border-[#757575] rounded-full flex items-center h-10 px-4 pr-5">
            <input
              id="top-search"
              placeholder="Search or use a phrase"
              aria-label="Search or use a phrase"
              autoComplete="off"
              data-test-id="searchBarInput"
              className="flex-1 bg-transparent border-0 outline-0 text-[#333333] text-sm placeholder:text-[#757575]"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleSearchFocus}
              onKeyDown={handleSearchKeyDown}
            />
            <div className="flex items-center justify-center">
              <SearchIcon className="w-4 h-4" />
            </div>
          </div>
          {showSearchDropdown && isCompassEnabled && (
            <SearchDropdown
              ref={searchDropdownRef}
              searchQuery={searchValue}
              onClose={() => setShowSearchDropdown(false)}
            />
          )}
        </div>
        <div className="hidden lg:block" style={{ width: "16px", height: "0px" }} />
        <div className="hidden lg:block" style={{ width: "12px", height: "0px" }} />
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
            <div
              className={`transition-all duration-300 ease-in-out ${
                state.isPanelOpen 
                  ? 'opacity-0 scale-95 pointer-events-none' 
                  : 'opacity-100 scale-100 pointer-events-auto'
              }`}
            >
              <button
                data-test-id="compassButton"
                onClick={togglePanel}
                className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
                aria-label="Compass"
                type="button"
              >
                <div className="flex items-center justify-center w-10 h-10 relative">
                  <CompassIcon className="w-[25px] h-[25px]" />
                </div>
              </button>
            </div>
            <div className={`hidden lg:block transition-all duration-300 ease-in-out ${
              state.isPanelOpen ? 'opacity-0' : 'opacity-100'
            }`} style={{ width: "8px", height: "0px" }} />
          </>
        )}
        <div>
          <button
            data-test-id="notificationDropdown"
            className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-gray-100 transition-colors duration-500 ease-in-out"
            aria-label="Notifications"
            type="button"
            onClick={handleNotificationClick}
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
            onClick={handleProfileClick}
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
