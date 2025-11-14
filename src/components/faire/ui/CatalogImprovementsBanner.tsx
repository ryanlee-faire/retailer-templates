import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CatalogImprovementsBanner() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const navigate = useNavigate();

  const dismiss = (id: string) => {
    setDismissed([...dismissed, id]);
  };

  const improvements = [
    {
      id: "enterprise-sales",
      text: "You have 7 products missing key attributes for large retailers. Add GTIN, weight, dimensions and country of origin to increase conversion by 3x.",
    },
    {
      id: "faire-market",
      text: "Keep your catalog up-to-date with help of your team. Create individual logins for team members to work faster and more securely together.",
    },
    {
      id: "catalog-import",
      text: "Easily import your products to Faire by setting up an integration with your catalog management software.",
    },
  ];

  const visibleImprovements = improvements.filter(
    (item) => !dismissed.includes(item.id)
  );

  if (visibleImprovements.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 rounded border border-[var(--color-border-subdued)] bg-white p-6">
      <h3 className="type-paragraph-medium mb-4">Catalog improvements</h3>
      <div className="divide-y divide-[var(--color-border-subdued)]">
        {visibleImprovements.map((item, index) => (
          <div key={item.id} className="py-2">
            <div
              onClick={index === 0 ? () => navigate("/faire/bulk-editor") : undefined}
              className={`flex items-center justify-between gap-4 p-3 rounded hover:bg-[#F7F7F7] ${index === 0 ? 'cursor-pointer' : ''}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F7F7]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--color-text-subdued)]">
                    <path d="M10 2C7.8 2 6 3.8 6 6c0 1.5.8 2.8 2 3.5V12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V9.5c1.2-.7 2-2 2-3.5 0-2.2-1.8-4-4-4zM9 14h2M9 16h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="type-paragraph text-[var(--color-text-primary)] flex-1">
                  {item.text}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismiss(item.id);
                }}
                className="text-[var(--color-text-subdued)] hover:text-[var(--color-text-primary)] flex-shrink-0"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

