import React from "react";
import RetailerGlobalNavLoggedIn from "./RetailerGlobalNavLoggedIn";
import Footer from "./Footer";

interface RetailerLayoutProps {
  children: React.ReactNode;
  languageSelector?: boolean;
  cartCount?: number;
  focusedNav?: boolean;
  hideFooter?: boolean;
  hideSearch?: boolean; // New prop for variant without search bar
  navSearchBar?: React.ReactNode; // Search bar to show in nav
  stickyNav?: boolean; // Whether the nav should be sticky (default: true)
  contentMaxWidth?: string; // Max width for content area (affects nav width too)
}

/**
 * Base layout component for retailer pages.
 * Includes the global navigation and footer.
 * Use this as the wrapper for all retailer-facing pages.
 */
export default function RetailerLayout({
  children,
  languageSelector = false,
  cartCount = 0,
  focusedNav = false,
  hideFooter = false,
  hideSearch = false,
  navSearchBar = null,
  stickyNav = true,
  contentMaxWidth = "1920px",
}: RetailerLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RetailerGlobalNavLoggedIn 
        languageSelector={languageSelector} 
        cartCount={cartCount}
        focused={focusedNav}
        hideSearch={hideSearch}
        navSearchBar={navSearchBar}
        sticky={stickyNav}
        contentMaxWidth={contentMaxWidth}
      />
      <main className="flex-1" style={{ paddingBottom: hideFooter ? 0 : "200px" }}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

