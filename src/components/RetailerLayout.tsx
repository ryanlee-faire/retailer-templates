import React from "react";
import RetailerGlobalNavLoggedIn from "./RetailerGlobalNavLoggedIn";
import Footer from "./Footer";

interface RetailerLayoutProps {
  children: React.ReactNode;
  languageSelector?: boolean;
  cartCount?: number;
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
}: RetailerLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RetailerGlobalNavLoggedIn 
        languageSelector={languageSelector} 
        cartCount={cartCount} 
      />
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

