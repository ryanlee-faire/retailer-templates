import React from "react";
import RetailerGlobalNavLoggedIn from "./RetailerGlobalNavLoggedIn";
import Footer from "./Footer";

interface RetailerLayoutProps {
  children: React.ReactNode;
  languageSelector?: boolean;
  cartCount?: number;
  focusedNav?: boolean;
  hideFooter?: boolean;
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
}: RetailerLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RetailerGlobalNavLoggedIn 
        languageSelector={languageSelector} 
        cartCount={cartCount}
        focused={focusedNav}
      />
      <main className="flex-1" style={{ paddingBottom: hideFooter ? 0 : "200px" }}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

