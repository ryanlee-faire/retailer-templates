import React from "react";
import RetailerLayout from "../components/RetailerLayout";
import { surfaces } from "../config/surfaces";
import { components } from "../config/components";

export default function IndexPage() {

  return (
    <RetailerLayout languageSelector={false} cartCount={0}>
      <div
        className="retailer-12col-grid mx-auto"
        style={{
          maxWidth: "1920px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "48px",
        }}
      >
        <div style={{ gridColumn: "1 / -1" }}>
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Retailer experience prototyping</h1>
          
          {/* Templates Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Starter templates</h2>
            <ul className="space-y-4">
              {surfaces.map((surface) => (
                <li key={surface.path}>
                  <a
                    href={surface.path}
                    className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                  >
                    {surface.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Components Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Components</h2>
            <ul className="space-y-4">
              {components.map((component) => (
                <li key={component.path}>
                  <a
                    href={component.path}
                    className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                  >
                    {component.name}
                  </a>
                  {component.description && (
                    <p className="text-sm text-[#757575] mt-1">{component.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </RetailerLayout>
  );
}

