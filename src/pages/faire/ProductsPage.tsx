import { Sidebar } from "../../components/faire/layout/Sidebar";
import { CatalogImprovementsBanner } from "../../components/faire/ui/CatalogImprovementsBanner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProductsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Products - Faire Prototype";
  }, []);

  const products = [
    {
      id: "1",
      name: "Pascale iron framed mirror",
      options: "No options",
      price: "$60.00",
      availability: "In Stock",
      status: "Published",
      hasWarning: true,
    },
    {
      id: "2",
      name: "Papasan cushion",
      options: "No options",
      price: "$90.00",
      availability: "In Stock",
      status: "Published",
      hasWarning: false,
    },
    {
      id: "3",
      name: "Mille nightstand",
      options: "No options",
      price: "$30.00",
      availability: "In Stock",
      status: "Published",
      hasWarning: false,
    },
    {
      id: "4",
      name: "Elmira desk",
      options: "No options",
      price: "$50.00",
      availability: "In Stock",
      status: "Published",
      hasWarning: true,
    },
    {
      id: "5",
      name: "Corner desk",
      options: "2 options",
      price: "$200.00",
      availability: "In Stock",
      status: "Published",
      hasWarning: false,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-3xl font-semibold">Products</h1>
          <button className="rounded bg-[var(--color-action-surface-default)] px-6 py-3 type-paragraph-medium text-white hover:bg-[var(--color-action-surface-hover)]">
            Add products
          </button>
        </div>
        <div className="-mx-8 mb-6 border-b border-[var(--color-border-subdued)]"></div>

        {/* Catalog Improvements Banner */}
        <CatalogImprovementsBanner />

        {/* Tabs */}
        <div className="mb-6 rounded border border-[var(--color-border-subdued)] bg-white">
          <div className="flex border-b border-[var(--color-border-subdued)]">
            <button className="border-b-2 border-[var(--color-grey-900)] px-6 py-4 type-paragraph-medium text-[var(--color-text-primary)]">
              All <span className="ml-2 type-label text-[var(--color-text-subdued)]">594</span>
            </button>
            <button className="px-6 py-4 type-paragraph text-[var(--color-text-subdued)] hover:text-[var(--color-text-primary)]">
              Published <span className="ml-2 type-label">324</span>
            </button>
            <button className="px-6 py-4 type-paragraph text-[var(--color-text-subdued)] hover:text-[var(--color-text-primary)]">
              Unpublished <span className="ml-2 type-label">212</span>
            </button>
            <button className="px-6 py-4 type-paragraph text-[var(--color-text-subdued)] hover:text-[var(--color-text-primary)]">
              Drafts <span className="ml-2 type-label">58</span>
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-4 border-b border-[var(--color-border-subdued)] px-6 py-4">
            <button className="type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
              Sort: A-Z
            </button>
            <button className="type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
              Search
            </button>
            <button className="type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
              Change columns
            </button>
            <button className="ml-auto type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
              New! Improve listings
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-between border-b border-[var(--color-border-subdued)] bg-[var(--color-grey-200)] px-6 py-4">
            <div className="type-paragraph text-[var(--color-text-subdued)]">
              Select products to take an action
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/faire/bulk-editor")}
                className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M11.5 2l2.5 2.5-7 7H4.5V9l7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Bulk edit
              </button>
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 12V3M4 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export
              </button>
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3c2.5 0 5 2 5 5s-2.5 5-5 5-5-2-5-5 2.5-5 5-5z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="8" r="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Publish
              </button>
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l12 12M8 3c2.5 0 5 2 5 5M3 8c0-1.5.8-2.8 2-3.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Unpublish
              </button>
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] hover:text-[var(--color-text-subdued)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="2" width="6" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v-1h4v1M8 5v3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Duplicate
              </button>
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-red-700)] hover:text-[var(--color-red-800)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M7 7v4M9 7v4M4 4l1 9a1 1 0 001 1h4a1 1 0 001-1l1-9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Delete
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--color-border-subdued)] bg-[var(--color-grey-200)]">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="px-6 py-3 text-left type-paragraph-medium">Image</th>
                  <th className="px-6 py-3 text-left type-paragraph-medium">Product name</th>
                  <th className="px-6 py-3 text-left type-paragraph-medium">Options</th>
                  <th className="px-6 py-3 text-left type-paragraph-medium">WS Price</th>
                  <th className="px-6 py-3 text-left type-paragraph-medium">Availability</th>
                  <th className="px-6 py-3 text-left type-paragraph-medium">Status</th>
                  <th className="px-6 py-3 text-left type-paragraph-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subdued)] bg-white">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[var(--color-grey-200)]">
                    <td className="px-6 py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 flex-shrink-0">
                          {product.hasWarning && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--color-warning)]">
                              <path d="M8 1L15 14H1L8 1Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                              <text x="8" y="12" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">!</text>
                            </svg>
                          )}
                        </div>
                        <div className="h-12 w-12 rounded border border-[var(--color-border-subdued)] bg-[var(--color-grey-300)]"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 type-paragraph">{product.name}</td>
                    <td className="px-6 py-4 type-paragraph text-[var(--color-text-subdued)]">
                      {product.options}
                    </td>
                    <td className="px-6 py-4 type-paragraph">{product.price}</td>
                    <td className="px-6 py-4 type-paragraph">{product.availability}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[var(--color-grey-300)] px-3 py-1 type-label">
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 type-paragraph text-[var(--color-text-subdued)]">
                        <button className="hover:text-[var(--color-text-primary)]">
                          Preview
                        </button>
                        <button className="hover:text-[var(--color-text-primary)]">
                          Duplicate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

