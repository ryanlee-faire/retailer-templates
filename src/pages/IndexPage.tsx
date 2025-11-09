import React from "react";
import RetailerLayout from "../components/RetailerLayout";

export default function IndexPage() {
  const surfaces = [
    { name: "Template Page", path: "/template" },
    { name: "PDP", path: "/pdp" },
    { name: "Checkout", path: "/checkout" },
  ];

  return (
    <RetailerLayout languageSelector={false} cartCount={0}>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Retailer prototyping templates</h1>
        <ul className="space-y-4">
          {surfaces.map((surface) => (
            <li key={surface.path}>
              <a
                href={surface.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-[#333333] hover:text-[#757575] hover:underline"
              >
                {surface.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </RetailerLayout>
  );
}

