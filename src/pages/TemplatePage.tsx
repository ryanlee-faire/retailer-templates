import React from "react";
import RetailerLayout from "../components/RetailerLayout";

export default function TemplatePage() {
  return (
    <RetailerLayout languageSelector={false} cartCount={13}>
      {/* Blank template content area */}
      <div className="retailer-12col-grid mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px", paddingTop: "48px" }}>
        <div style={{ gridColumn: "1 / 13" }}>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Retailer template — Logged in, basic</h1>
          <p className="text-gray-600">This is a basic blank page template with the global nav and footer. You can add more components and UI here to build out different surfaces.</p>
        </div>
      </div>
    </RetailerLayout>
  );
}

