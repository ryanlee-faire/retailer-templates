import { Sidebar } from "../../components/faire/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BulkEditorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Bulk Editor - Faire Prototype";
  }, []);

  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Woon Bamboo Temple Black Cold Brew Tea",
      gtin: "123456789012",
      weight: "",
      length: "10",
      width: "5",
      height: "3",
      countryOfOrigin: "USA",
    },
    {
      id: "2",
      name: "Woon Bamboo Temple Black Tea",
      gtin: "234567890123",
      weight: "8 oz",
      length: "10",
      width: "5",
      height: "3",
      countryOfOrigin: "USA",
    },
    {
      id: "3",
      name: "Woon Black Rice",
      gtin: "345678901234",
      weight: "16 oz",
      length: "12",
      width: "6",
      height: "4",
      countryOfOrigin: "China",
    },
    {
      id: "4",
      name: "Woon Dried Shiitake Mushrooms",
      gtin: "456789012345",
      weight: "4 oz",
      length: "8",
      width: "4",
      height: "2",
      countryOfOrigin: "China",
    },
    {
      id: "5",
      name: "Woon Dumpling Candles (Set of 3)",
      gtin: "567890123456",
      weight: "12 oz",
      length: "6",
      width: "6",
      height: "3",
      countryOfOrigin: "USA",
    },
    {
      id: "6",
      name: "Woon Frozen Chewy Noodles (LOC...",
      gtin: "678901234567",
      weight: "20 oz",
      length: "10",
      width: "8",
      height: "2",
      countryOfOrigin: "USA",
    },
    {
      id: "7",
      name: "Woon Frozen Pork Dumplings (LOC...",
      gtin: "789012345678",
      weight: "",
      length: "10",
      width: "8",
      height: "2",
      countryOfOrigin: "USA",
    },
    {
      id: "8",
      name: "Woon Frozen Vegan Dumplings (L...",
      gtin: "890123456789",
      weight: "",
      length: "10",
      width: "8",
      height: "2",
      countryOfOrigin: "USA",
    },
    {
      id: "9",
      name: "Woon Genmaicha Cold Brew Tea (L...",
      gtin: "901234567890",
      weight: "8 oz",
      length: "10",
      width: "5",
      height: "3",
      countryOfOrigin: "Japan",
    },
    {
      id: "10",
      name: "Woon Genmaicha Tea",
      gtin: "012345678901",
      weight: "8 oz",
      length: "10",
      width: "5",
      height: "3",
      countryOfOrigin: "Japan",
    },
    {
      id: "11",
      name: "Woon Hibiscus Cold Brew Tea (LO...",
      gtin: "111234567890",
      weight: "",
      length: "10",
      width: "5",
      height: "3",
      countryOfOrigin: "USA",
    },
    {
      id: "12",
      name: "Woon Hibiscus Tea",
      gtin: "222345678901",
      weight: "8 oz",
      length: "10",
      width: "5",
      height: "3",
      countryOfOrigin: "USA",
    },
    {
      id: "13",
      name: "Woon Mama's Way Hot Sauce",
      gtin: "333456789012",
      weight: "6 oz",
      length: "5",
      width: "3",
      height: "7",
      countryOfOrigin: "USA",
    },
    {
      id: "14",
      name: "Woon Matcha Latte (LOCAL DELIVE...",
      gtin: "",
      weight: "12 oz",
      length: "8",
      width: "4",
      height: "6",
      countryOfOrigin: "USA",
    },
    {
      id: "15",
      name: "Woon Milk Tea (LOCAL DELIVERY O...",
      gtin: "",
      weight: "12 oz",
      length: "8",
      width: "4",
      height: "6",
      countryOfOrigin: "",
    },
    {
      id: "16",
      name: "Woon Peanuts & Seamoss",
      gtin: "",
      weight: "10 oz",
      length: "8",
      width: "4",
      height: "6",
      countryOfOrigin: "",
    },
    {
      id: "17",
      name: "Woon Sesame Oil",
      gtin: "555678901234",
      weight: "16 oz",
      length: "8",
      width: "3",
      height: "8",
      countryOfOrigin: "Taiwan",
    },
    {
      id: "18",
      name: "Woon Chili Oil",
      gtin: "666789012345",
      weight: "8 oz",
      length: "5",
      width: "3",
      height: "6",
      countryOfOrigin: "China",
    },
    {
      id: "19",
      name: "Woon Soy Sauce",
      gtin: "777890123456",
      weight: "18 oz",
      length: "8",
      width: "3",
      height: "9",
      countryOfOrigin: "Japan",
    },
    {
      id: "20",
      name: "Woon Rice Vinegar",
      gtin: "888901234567",
      weight: "12 oz",
      length: "7",
      width: "3",
      height: "8",
      countryOfOrigin: "China",
    },
    {
      id: "21",
      name: "Woon Dumpling Wrappers",
      gtin: "999012345678",
      weight: "16 oz",
      length: "10",
      width: "6",
      height: "2",
      countryOfOrigin: "USA",
    },
    {
      id: "22",
      name: "Woon Noodle Soup Mix",
      gtin: "000123456789",
      weight: "14 oz",
      length: "10",
      width: "8",
      height: "3",
      countryOfOrigin: "USA",
    },
  ]);

  const updateProduct = (id: string, field: string, value: string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleInputBlur = () => {
    // Sort products when user finishes editing
    setProducts(prev => [...prev].sort((a, b) => {
      const aMissing = isProductMissingAttribute(a);
      const bMissing = isProductMissingAttribute(b);
      if (aMissing && !bMissing) return -1;
      if (!aMissing && bMissing) return 1;
      return 0;
    }));
  };

  // Sort products on initial mount
  useEffect(() => {
    handleInputBlur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMissingCounts = () => {
    return {
      gtin: products.filter(p => !p.gtin).length,
      weight: products.filter(p => !p.weight).length,
      countryOfOrigin: products.filter(p => !p.countryOfOrigin).length,
      dimensions: products.filter(p => !p.length || !p.width || !p.height).length,
    };
  };

  const getProductsMissingAnyAttribute = () => {
    return products.filter(p =>
      !p.gtin || !p.weight || !p.countryOfOrigin || !p.length || !p.width || !p.height
    ).length;
  };

  const isProductMissingAttribute = (product: typeof products[0]) => {
    return !product.gtin || !product.weight || !product.countryOfOrigin ||
           !product.length || !product.width || !product.height;
  };

  const missingCounts = getMissingCounts();
  const productsMissingAny = getProductsMissingAnyAttribute();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white">
        {/* Header */}
        <div className="border-b border-[var(--color-border-subdued)] px-8 py-6">
          <div className="mb-4">
            <button
              onClick={() => navigate("/faire/products")}
              className="flex items-center gap-2 type-paragraph text-[var(--color-text-subdued)] hover:text-[var(--color-text-primary)]"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7.5 9L4.5 6l3-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to products
            </button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Add key attributes for Large Retailers</h1>
              <div className="flex items-center gap-4 type-paragraph text-[var(--color-text-subdued)]">
                <span className="rounded bg-[#f7f7f7] px-3 py-1 type-paragraph font-medium text-[var(--color-text-subdued)]">22 products</span>
                <span>Edit fields in bulk, refine listings, and publish drafts.</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] underline hover:text-[var(--color-text-subdued)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 5l3-3m0 0l3 3M5 2v8M14 11l-3 3m0 0l-3-3m3 3V6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Enter fullscreen
              </button>
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] underline hover:text-[var(--color-text-subdued)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11v-1M8 5v3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Guide
              </button>
              <button className="flex items-center gap-2 type-paragraph text-[var(--color-text-primary)] underline hover:text-[var(--color-text-subdued)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M7 7v4M9 7v4M4 4l1 9a1 1 0 001 1h4a1 1 0 001-1l1-9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Discard edits
              </button>
              <button className="rounded bg-[var(--color-grey-900)] px-6 py-3 type-paragraph-medium text-white hover:bg-[var(--color-grey-800)]">
                Save edits
              </button>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="px-8 pt-4 pb-2">
          <div className="bg-[#F5EFE7] px-6 py-4 rounded">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L21 19H3L12 3Z" fill="#D4A574"/>
                  <path d="M12 10v4M12 16v1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="type-paragraph text-[var(--color-text-primary)]">
                <span className="font-semibold">You have {missingCounts.gtin} products missing GTINs:</span> Increase conversion with large retailers by adding GTINs in the table below, or <span className="underline cursor-pointer hover:text-[var(--color-text-subdued)]">let us help you</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter/Control Bar */}
        <div className="border-b border-[var(--color-border-subdued)] px-8 py-4">
          <div className="flex items-center gap-3">
            {/* Sort Button */}
            <button className="flex items-center gap-2 rounded-full border border-[var(--color-border-subdued)] bg-white px-5 py-2.5 type-paragraph text-[var(--color-text-primary)] hover:bg-[var(--color-grey-100)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 10l2 2 2-2M6 12V4M10 6l2-2 2 2M12 4v8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Sort: A-Z</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Search Button */}
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-subdued)] bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-grey-100)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8.5" cy="8.5" r="5.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 12.5L16 16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Change Columns Button */}
            <button className="flex items-center gap-2 rounded-full border border-[var(--color-border-subdued)] bg-white px-5 py-2.5 type-paragraph text-[var(--color-text-primary)] hover:bg-[var(--color-grey-100)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="5" height="5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="9" y="2" width="5" height="5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="2" y="9" width="5" height="5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="9" y="9" width="5" height="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Change columns</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table style={{ tableLayout: 'auto' }}>
            <thead>
              <tr className="border-b border-[var(--color-border-subdued)]">
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-3 text-left" style={{ width: '80px' }}>
                  <input type="checkbox" />
                </th>
                <th className="border-r border-[var(--color-border-subdued)]" style={{ width: '40px' }}></th>
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-3 text-left type-paragraph-medium" style={{ width: '100px' }}>Image</th>
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-3 text-left type-paragraph-medium" style={{ maxWidth: '300px' }}>Product name</th>
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-3 text-left type-paragraph-medium" style={{ width: '180px' }}>GTIN</th>
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-3 text-left type-paragraph-medium" style={{ width: '150px' }}>Weight</th>
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-3 text-left type-paragraph-medium" style={{ width: '180px' }}>Country of origin</th>
                <th className="px-4 py-3 text-left type-paragraph-medium" colSpan={3}>Dimensions</th>
              </tr>
              <tr className="border-b border-[var(--color-border-subdued)] bg-white">
                <th className="border-r border-[var(--color-border-subdued)]"></th>
                <th className="border-r border-[var(--color-border-subdued)]"></th>
                <th className="border-r border-[var(--color-border-subdued)]"></th>
                <th className="border-r border-[var(--color-border-subdued)]"></th>
                <th className="border-r border-[var(--color-border-subdued)]"></th>
                <th className="border-r border-[var(--color-border-subdued)]"></th>
                <th className="border-r border-[var(--color-border-subdued)]"></th>
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-2 text-left type-paragraph text-[var(--color-text-subdued)]" style={{ width: '120px' }}>Length</th>
                <th className="border-r border-[var(--color-border-subdued)] px-4 py-2 text-left type-paragraph text-[var(--color-text-subdued)]" style={{ width: '120px' }}>Width</th>
                <th className="px-4 py-2 text-left type-paragraph text-[var(--color-text-subdued)]" style={{ width: '120px' }}>Height</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((product, index) => (
                <tr key={product.id} className="border-b border-[var(--color-border-subdued)] hover:bg-[var(--color-grey-100)]" style={{ height: '40px' }}>
                  <td className="border-r border-[var(--color-border-subdued)] px-4 py-0">
                    <div className="flex items-center">
                      <span className="mr-2 type-label text-[var(--color-text-subdued)]">{index + 1}</span>
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] px-2 py-0">
                    {isProductMissingAttribute(product) && (
                      <div className="flex items-center justify-center h-full">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 2L18 17H2L10 2Z" fill="#D4A574"/>
                          <path d="M10 8v4M10 14v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] px-4 py-0">
                    <div className="h-8 w-8 rounded border border-[var(--color-border-subdued)] bg-[var(--color-grey-300)]"></div>
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] px-4 py-0 type-paragraph">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ maxWidth: '300px' }}>
                      {product.name}
                    </div>
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] p-0 relative">
                    {!product.gtin && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-r-[12px] border-b-[12px] border-r-[#D4A574] border-b-transparent pointer-events-none z-20"></div>
                    )}
                    <input
                      type="text"
                      value={product.gtin}
                      onChange={(e) => updateProduct(product.id, "gtin", e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                      className="absolute inset-0 w-full h-full px-4 type-paragraph text-[var(--color-text-subdued)] bg-transparent border-2 border-transparent focus:border-[#0066FF] focus:outline-none focus:z-10"
                    />
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] p-0 relative">
                    {!product.weight && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-r-[12px] border-b-[12px] border-r-[#D4A574] border-b-transparent pointer-events-none z-20"></div>
                    )}
                    <input
                      type="text"
                      value={product.weight}
                      onChange={(e) => updateProduct(product.id, "weight", e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                      className="absolute inset-0 w-full h-full px-4 type-paragraph text-[var(--color-text-subdued)] bg-transparent border-2 border-transparent focus:border-[#0066FF] focus:outline-none focus:z-10"
                    />
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] p-0 relative">
                    {!product.countryOfOrigin && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-r-[12px] border-b-[12px] border-r-[#D4A574] border-b-transparent pointer-events-none z-20"></div>
                    )}
                    <input
                      type="text"
                      value={product.countryOfOrigin}
                      onChange={(e) => updateProduct(product.id, "countryOfOrigin", e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                      className="absolute inset-0 w-full h-full px-4 type-paragraph text-[var(--color-text-subdued)] bg-transparent border-2 border-transparent focus:border-[#0066FF] focus:outline-none focus:z-10"
                    />
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] p-0 relative">
                    {!product.length && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-r-[12px] border-b-[12px] border-r-[#D4A574] border-b-transparent pointer-events-none z-20"></div>
                    )}
                    <input
                      type="text"
                      value={product.length}
                      onChange={(e) => updateProduct(product.id, "length", e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                      className="absolute inset-0 w-full h-full px-4 type-paragraph text-[var(--color-text-subdued)] bg-transparent border-2 border-transparent focus:border-[#0066FF] focus:outline-none focus:z-10"
                    />
                  </td>
                  <td className="border-r border-[var(--color-border-subdued)] p-0 relative">
                    {!product.width && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-r-[12px] border-b-[12px] border-r-[#D4A574] border-b-transparent pointer-events-none z-20"></div>
                    )}
                    <input
                      type="text"
                      value={product.width}
                      onChange={(e) => updateProduct(product.id, "width", e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                      className="absolute inset-0 w-full h-full px-4 type-paragraph text-[var(--color-text-subdued)] bg-transparent border-2 border-transparent focus:border-[#0066FF] focus:outline-none focus:z-10"
                    />
                  </td>
                  <td className="border-[var(--color-border-subdued)] p-0 relative">
                    {!product.height && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-r-[12px] border-b-[12px] border-r-[#D4A574] border-b-transparent pointer-events-none z-20"></div>
                    )}
                    <input
                      type="text"
                      value={product.height}
                      onChange={(e) => updateProduct(product.id, "height", e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                      className="absolute inset-0 w-full h-full px-4 type-paragraph text-[var(--color-text-subdued)] bg-transparent border-2 border-transparent focus:border-[#0066FF] focus:outline-none focus:z-10"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

