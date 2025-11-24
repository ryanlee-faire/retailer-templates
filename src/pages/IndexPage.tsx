import React, { useState } from "react";
import { Link } from "react-router-dom";
import RetailerLayout from "../components/RetailerLayout";
import { surfaces } from "../config/surfaces";
import { components } from "../config/components";

export default function IndexPage() {
  const [isBrandExperimentalOpen, setIsBrandExperimentalOpen] = useState(false);
  const [isBrandTemplatesOpen, setIsBrandTemplatesOpen] = useState(false);
  const [isExperimentalOpen, setIsExperimentalOpen] = useState(true);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(true);
  const [isComponentsOpen, setIsComponentsOpen] = useState(false);
  const [isProjectCompassOpen, setIsProjectCompassOpen] = useState(true);

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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
          paddingTop: "48px",
        }}
      >
        <div style={{ gridColumn: "1 / -1" }}>
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Design Prototype Playground</h1>
          <div className="border-b border-[#dfe0e1] mb-8"></div>
          
          {/* Brand Experience Section */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Brand</h2>
          
          {/* Brand Experimental Section */}
          <div className="mb-6">
            <button
              onClick={() => setIsBrandExperimentalOpen(!isBrandExperimentalOpen)}
              className="flex items-center gap-2 w-full text-left mb-4 hover:opacity-70 transition-opacity"
            >
              <ChevronIcon isOpen={isBrandExperimentalOpen} />
              <h3 className="text-2xl font-semibold text-gray-800">Experimental</h3>
            </button>
            {isBrandExperimentalOpen && (
              <ul className="space-y-4 ml-6">
                <li className="flex items-center gap-2">
                  <Link
                    to="/faire/bulk-editor"
                    className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                  >
                    Bulk editor page
                  </Link>
                  <span className="text-xs bg-[#757575] text-white px-2 py-0.5 rounded">John</span>
                </li>
              </ul>
            )}
          </div>

          {/* Brand Starter Templates Section */}
          <div className="mb-12">
            <button
              onClick={() => setIsBrandTemplatesOpen(!isBrandTemplatesOpen)}
              className="flex items-center gap-2 w-full text-left mb-4 hover:opacity-70 transition-opacity"
            >
              <ChevronIcon isOpen={isBrandTemplatesOpen} />
              <h3 className="text-2xl font-semibold text-gray-800">Starter templates</h3>
            </button>
            {isBrandTemplatesOpen && (
              <ul className="space-y-4 ml-6">
                <li className="flex items-center gap-2">
                  <Link
                    to="/faire/products"
                    className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                  >
                    Products page
                  </Link>
                  <span className="text-xs bg-[#757575] text-white px-2 py-0.5 rounded">John</span>
                </li>
              </ul>
            )}
          </div>

          {/* Retailer Experience Section */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-12">Retailer</h2>
          
          {/* Project Compass Section */}
          <div className="mb-6">
            <button
              onClick={() => setIsProjectCompassOpen(!isProjectCompassOpen)}
              className="flex items-center gap-2 w-full text-left mb-4 hover:opacity-70 transition-opacity"
            >
              <ChevronIcon isOpen={isProjectCompassOpen} />
              <h3 className="text-2xl font-semibold text-gray-800">Project Compass</h3>
            </button>
            {isProjectCompassOpen && (
              <ul className="space-y-4 ml-6">
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/template"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      🧭 Compass Prototype (JI)
                    </Link>
                    <span className="text-xs bg-[#757575] text-white px-2 py-0.5 rounded">John</span>
                  </div>
                  <p className="text-sm text-[#757575] mt-1">
                    AI-powered product discovery that helps retailers find multiple product types in one search
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/compass-full-surface"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      🧭 Compass Full Surface
                    </Link>
                    <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                  </div>
                  <p className="text-sm text-[#757575] mt-1">
                    Full surface page for Compass interface (Cristi)
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/compass-contained/home"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      🧭 Compass Ecosystem Approach
                    </Link>
                    <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                  </div>
                  <p className="text-sm text-[#757575] mt-1">
                    Isolated Compass flow starting with John's homepage prototype
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/pdp-with-drawer"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      PDP with drawer
                    </Link>
                    <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/pdp-with-drawer-left"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      PDP with drawer (left)
                    </Link>
                    <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/pdp-v2-with-ai"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      PDP with AI overview
                    </Link>
                    <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                  </div>
                  <p className="text-sm text-[#757575] mt-1">
                    Product detail page with AI-powered overview and search
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/pdp-v2-with-ai-inline"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      PDP with AI overview (inline)
                    </Link>
                    <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                  </div>
                  <p className="text-sm text-[#757575] mt-1">
                    Product detail page with AI answers displayed inline in the Overview section
                  </p>
                </li>
              </ul>
            )}
          </div>

          {/* Experimental Section */}
          <div className="mb-6">
            <button
              onClick={() => setIsExperimentalOpen(!isExperimentalOpen)}
              className="flex items-center gap-2 w-full text-left mb-4 hover:opacity-70 transition-opacity"
            >
              <ChevronIcon isOpen={isExperimentalOpen} />
              <h3 className="text-2xl font-semibold text-gray-800">Experimental</h3>
            </button>
            {isExperimentalOpen && (
              <ul className="space-y-4 ml-6">
                <li>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/brand/casa-bosques/v2"
                      className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                    >
                      Brand Page V2 (with AI summary)
                    </Link>
                    <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                  </div>
                  <p className="text-sm text-[#757575] mt-1">
                    Brand page variant with AI summary box and action buttons on banner
                  </p>
                </li>
              </ul>
            )}
          </div>
          
          {/* Templates Section */}
          <div className="mb-6">
            <button
              onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
              className="flex items-center gap-2 w-full text-left mb-4 hover:opacity-70 transition-opacity"
            >
              <ChevronIcon isOpen={isTemplatesOpen} />
              <h3 className="text-2xl font-semibold text-gray-800">Starter templates</h3>
            </button>
            {isTemplatesOpen && (
              <ul className="space-y-4 ml-6">
                {surfaces
                  .filter((surface) => 
                    surface.path !== "/pdp-with-drawer" && 
                    surface.path !== "/pdp-with-drawer-left"
                  )
                  .map((surface) => (
                    <li key={surface.path} className="flex items-center gap-2">
                      <a
                        href={surface.path}
                        className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                      >
                        {surface.name}
                      </a>
                      <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Components Section */}
          <div>
            <button
              onClick={() => setIsComponentsOpen(!isComponentsOpen)}
              className="flex items-center gap-2 w-full text-left mb-4 hover:opacity-70 transition-opacity"
            >
              <ChevronIcon isOpen={isComponentsOpen} />
              <h3 className="text-2xl font-semibold text-gray-800">Components</h3>
            </button>
            {isComponentsOpen && (
              <ul className="space-y-4 ml-6">
                {components.map((component) => (
                  <li key={component.path}>
                    <div className="flex items-center gap-2">
                      <a
                        href={component.path}
                        className="text-lg text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
                      >
                        {component.name}
                      </a>
                      <span className="text-xs bg-[#333333] text-white px-2 py-0.5 rounded">Ryan</span>
                    </div>
                    {component.description && (
                      <p className="text-sm text-[#757575] mt-1">{component.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </RetailerLayout>
  );
}

