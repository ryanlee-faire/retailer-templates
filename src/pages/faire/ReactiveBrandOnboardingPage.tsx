import { useState, useEffect } from "react";
import { Sidebar } from "../../components/faire/layout/Sidebar";
import { TaskCard, TaskStatus } from "../../components/faire/ReactiveOnboarding/TaskCard";
import { TermsModal } from "../../components/faire/ReactiveOnboarding/TermsModal";
import { COIUploadModal } from "../../components/faire/ReactiveOnboarding/COIUploadModal";
import { ConfirmationModal } from "../../components/faire/ReactiveOnboarding/ConfirmationModal";
import { VariantSwitcher } from "../../components/VariantSwitcher";

export default function ReactiveBrandOnboardingPage() {
  useEffect(() => {
    document.title = "Order #HYBYWJXJYN - Faire Prototype";
  }, []);

  // Modal states
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [coiModalOpen, setCoiModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'coi-upload' | 'coi-confirmation'>('coi-upload');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Task completion states
  const [termsStatus, setTermsStatus] = useState<TaskStatus>('not-started');
  const [coiStatus, setCoiStatus] = useState<TaskStatus>('not-started');

  // Variant switcher state (for showcasing design options)
  const [variant, setVariant] = useState(1);

  const handleTermsAccept = () => {
    setTermsStatus('complete');
    setTermsModalOpen(false);
  };

  const handleCOIUpload = (fileName: string) => {
    setUploadedFileName(fileName);
    setCoiModalOpen(false);
    setConfirmationType('coi-upload');
    setConfirmationModalOpen(true);
  };

  const handleConfirmationClose = () => {
    if (confirmationType === 'coi-upload') {
      // Show second confirmation modal
      setConfirmationType('coi-confirmation');
      setTimeout(() => setConfirmationModalOpen(true), 100);
    } else {
      // Final confirmation - mark as pending review
      setCoiStatus('pending-review');
      setConfirmationModalOpen(false);
    }
  };

  const allTasksComplete = termsStatus === 'complete' && (coiStatus === 'complete' || coiStatus === 'pending-review');
  const bannerMessage = allTasksComplete 
    ? "Your Faire+ application is under review. We'll notify you once approved."
    : "Complete the tasks below to unlock this enterprise order and access future high-value opportunities.";

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-[var(--color-grey-100)]">
        {/* Page Header */}
        <div className="border-b border-[var(--color-border-subdued)] bg-white px-8 py-6">
          <div className="mb-2 flex items-center gap-2 type-paragraph text-[var(--color-text-subdued)]">
            <button className="hover:text-[var(--color-text-primary)]">Orders</button>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4.5 3L7.5 6l-3 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Order details</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Order #HYBYWJXJYN</h1>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-lg bg-[#2D5F5D] px-3 py-1 text-sm text-white">
                  New
                </span>
                <span className="inline-flex items-center rounded-lg border border-[#E5E7EB] bg-white px-3 py-1 text-sm text-[#374151]">
                  First order
                </span>
                <span className="inline-flex items-center rounded-lg border border-[#E5E7EB] bg-white px-3 py-1 text-sm text-[#374151]">
                  Preorder
                </span>
                <span className="text-sm text-[#9CA3AF]">
                  Placed on Sept 10, 2024
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="type-paragraph text-[var(--color-text-primary)] underline hover:text-[var(--color-text-subdued)]">
                Large retailer guide
              </button>
              <button className="type-paragraph text-[var(--color-text-primary)] underline hover:text-[var(--color-text-subdued)]">
                Edit
              </button>
              <button className="type-paragraph text-[var(--color-text-primary)] underline hover:text-[var(--color-text-subdued)]">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-[1fr_384px] gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Widget 1: Join Faire+ Banner */}
              <div className="rounded-lg border border-[#dfe0e1] bg-[#FBF8F6]">
                <div className="px-6 pt-7 pb-4">
                  <h2 className="text-lg font-medium text-[#333333] leading-[26px] tracking-[0.15px] mb-4">
                    Join Faire+ to accept the order
                  </h2>
                  
                  <div className="text-sm text-[#333333] leading-[20px] tracking-[0.15px]">
                    <p className="mb-4">
                      Congratulations, you have received an order from a large retailer. To accept this order, you will need to join Faire+, our program required for selling to these unique retailers. To join, simply complete the following steps:
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <p className="flex items-center gap-3">
                        <span>
                          1.{' '}
                          <button 
                            onClick={() => setTermsModalOpen(true)}
                            className="underline decoration-[#333333] hover:text-[var(--color-text-subdued)]"
                          >
                            Sign the Faire+ agreement
                          </button>
                        </span>
                        {termsStatus === 'complete' && (
                          <span className="inline-flex items-center gap-1.5 border border-[#E5E7EB] bg-transparent text-[#333333] text-sm px-3 py-1 rounded-lg">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Complete
                          </span>
                        )}
                      </p>
                      <p className="flex items-center gap-3">
                        <span>
                          2.{' '}
                          <button 
                            onClick={() => setCoiModalOpen(true)}
                            className="underline decoration-[#333333] hover:text-[var(--color-text-subdued)]"
                          >
                            Upload a Certificate of Insurance
                          </button>
                        </span>
                        {(coiStatus === 'complete' || coiStatus === 'pending-review') && (
                          <span className="inline-flex items-center gap-1.5 border border-[#E5E7EB] bg-transparent text-[#333333] text-sm px-3 py-1 rounded-lg">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Complete
                          </span>
                        )}
                      </p>
                    </div>
                    
                    <p>
                      Keep in mind, no changes to your commission or fees.
                    </p>
                  </div>
                </div>
              </div>

              {/* Widget 2: Ordered Items Table */}
              <div className="rounded-lg border border-[#dfe0e1] bg-white">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-4 pb-4">
                  <h2 className="text-lg font-medium text-[#333333] leading-[26px] tracking-[0.15px]">
                    Ordered items
                  </h2>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-[#333333] underline hover:text-[var(--color-text-subdued)]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="4" y="2" width="8" height="4" rx="1" />
                        <path d="M4 4H3a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1h-1" />
                        <path d="M6 10h4" />
                      </svg>
                      Print packing slip
                    </button>
                    <button className="text-[#333333] hover:text-[var(--color-text-subdued)]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  {/* Table Header */}
                  <div className="grid grid-cols-[300px_130px_90px_1fr] gap-6 pb-4 border-b border-[#dfe0e1]">
                    <div className="text-sm font-medium text-[#333333]">Product</div>
                    <div className="text-sm font-medium text-[#333333]">SKU</div>
                    <div className="text-sm font-medium text-[#333333]">Qty</div>
                    <div className="text-sm font-medium text-[#333333] text-right">Amount</div>
                  </div>

                  {/* Product Rows */}
                  <div className="divide-y divide-transparent space-y-4 pt-4">
                    {/* Product 1 */}
                    <div className="grid grid-cols-[300px_130px_90px_1fr] gap-6 items-start">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded bg-[#f5f0eb] flex-shrink-0 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#E8DDD4] to-[#D4C4B5]"></div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button className="text-sm font-medium text-[#333333] underline text-left leading-[20px] tracking-[0.15px]">
                            Mismatched Moody Sock Buddies for The Weekender Wanderer
                          </button>
                          <div className="flex gap-2">
                            <span className="bg-[#f7f7f7] px-1 py-0.5 rounded text-xs font-medium text-[#3e4023]">Size: Large</span>
                            <span className="bg-[#f7f7f7] px-1 py-0.5 rounded text-xs font-medium text-[#3e4023]">Color: Spring</span>
                          </div>
                          <div className="flex gap-2 text-xs text-[#333333]">
                            <span>WS Price</span>
                            <span className="font-medium">$10.00</span>
                          </div>
                          <div className="flex gap-2 text-xs text-[#333333]">
                            <span>Weight</span>
                            <span className="font-medium">6 oz</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-[#333333]">MMSB-L-spring</div>
                      <div className="text-sm text-[#333333]">6 units</div>
                      <div className="text-sm text-[#333333] text-right">$72.00</div>
                    </div>

                    {/* Product 2 */}
                    <div className="grid grid-cols-[300px_130px_90px_1fr] gap-6 items-start">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded bg-[#f5f0eb] flex-shrink-0 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#E8DDD4] to-[#D4C4B5]"></div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button className="text-sm font-medium text-[#333333] underline text-left leading-[20px] tracking-[0.15px]">
                            Mismatched Moody Sock Buddies for The Weekender Wanderer
                          </button>
                          <div className="flex gap-2">
                            <span className="bg-[#f7f7f7] px-1 py-0.5 rounded text-xs font-medium text-[#3e4023]">Size: Medium</span>
                            <span className="bg-[#f7f7f7] px-1 py-0.5 rounded text-xs font-medium text-[#3e4023]">Color: Spring</span>
                          </div>
                          <div className="flex gap-2 text-xs text-[#333333]">
                            <span>WS Price</span>
                            <span className="font-medium">$10.00</span>
                          </div>
                          <div className="flex gap-2 text-xs text-[#333333]">
                            <span>Weight</span>
                            <span className="font-medium">6 oz</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-[#333333]">MMSB-M-spring</div>
                      <div className="text-sm text-[#333333]">6 units</div>
                      <div className="text-sm text-[#333333] text-right">$72.00</div>
                    </div>

                    {/* Product 3 */}
                    <div className="grid grid-cols-[300px_130px_90px_1fr] gap-6 items-start">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded bg-[#f5f0eb] flex-shrink-0 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#E8DDD4] to-[#D4C4B5]"></div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button className="text-sm font-medium text-[#333333] underline text-left leading-[20px] tracking-[0.15px]">
                            Mismatched Moody Sock Buddies for The Weekender Wanderer
                          </button>
                          <div className="flex gap-2">
                            <span className="bg-[#f7f7f7] px-1 py-0.5 rounded text-xs font-medium text-[#3e4023]">Size: Small</span>
                            <span className="bg-[#f7f7f7] px-1 py-0.5 rounded text-xs font-medium text-[#3e4023]">Color: Spring</span>
                          </div>
                          <div className="flex gap-2 text-xs text-[#333333]">
                            <span>WS Price</span>
                            <span className="font-medium">$10.00</span>
                          </div>
                          <div className="flex gap-2 text-xs text-[#333333]">
                            <span>Weight</span>
                            <span className="font-medium">6 oz</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-[#333333]">MMSB-S-spring</div>
                      <div className="text-sm text-[#333333]">6 units</div>
                      <div className="text-sm text-[#333333] text-right">$72.00</div>
                    </div>

                    {/* Product 4 */}
                    <div className="grid grid-cols-[300px_130px_90px_1fr] gap-6 items-start">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded bg-[#f5f0eb] flex-shrink-0 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#E8DDD4] to-[#D4C4B5]"></div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button className="text-sm font-medium text-[#333333] underline text-left leading-[20px] tracking-[0.15px]">
                            Sunbleached Misty Fields
                          </button>
                          <div className="flex gap-2">
                            <span className="bg-[#f7f7f7] px-1 py-0.5 rounded text-xs font-medium text-[#3e4023]">Color: Pastel</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-[#333333]">MMSB-OS-pastel-long-skusku</div>
                      <div className="text-sm text-[#333333]">6 units</div>
                      <div className="text-sm text-[#333333] text-right">$72.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Widget 3 & 4: Combined Order Details Card */}
              <div className="rounded-xl border border-[var(--color-border-subdued)] bg-white overflow-hidden">
                {/* New Large Retailer Promo Banner (Top Section) */}
                <div className="bg-[#DDE3D0] px-6 py-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-lg font-medium text-[#333333] mb-1">
                      New large retailer!
                    </h3>
                    <button className="text-sm text-[#333333] underline hover:text-[var(--color-text-subdued)]">
                      Learn about this retailer
                    </button>
                  </div>
                  <img 
                    src="/images/new-callout.png" 
                    alt="New large retailer celebration" 
                    className="absolute right-0 top-0 h-full w-auto mix-blend-multiply"
                  />
                </div>

                {/* Order Details Content */}
                <div className="px-6 py-4">
                {/* Customer */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-medium text-[#333333] leading-[26px]">
                      Ledger & Loom<br />Booksellers
                    </h3>
                    <div className="flex items-center gap-2">
                      {/* Business Card icon */}
                      <button className="text-[#333333] hover:text-[var(--color-text-subdued)] p-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <circle cx="8" cy="11" r="2" />
                          <path d="M14 10h4M14 14h4" strokeLinecap="round"/>
                        </svg>
                      </button>
                      {/* Chat bubble with notification */}
                      <button className="relative text-[#333333] hover:text-[var(--color-text-subdued)] p-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#F87171]"></span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#333333]">
                    Order placed by Lucia Bogan, Owner
                  </p>
                </div>

                {/* Shipping Destination */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#333333] mb-1">Shipping destination</p>
                  <div className="text-sm text-[#333333] leading-[20px] space-y-0">
                    <p>Mei Lin</p>
                    <p>1254 Crescent Park Avenue</p>
                    <p>Dearborn, MI 48126</p>
                    <p>United States of America</p>
                    <p>+1 313-555-7623</p>
                    <button className="text-sm text-[#333333] underline hover:text-[var(--color-text-subdued)]">
                      Copy
                    </button>
                  </div>
                </div>

                {/* Insider Free Shipping Badge */}
                <div className="mb-6">
                  <div className="flex items-center gap-1">
                    {/* Key icon */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="#36676A" className="flex-shrink-0">
                      <path d="M11.5 1.5L10 3M5.06 8.06a3.67 3.67 0 11-5.19 5.19 3.67 3.67 0 015.19-5.19zm0 0L8 5m0 0l2 2 2.67-2.67L10.67 2.33M8 5l2-2" stroke="#36676A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                    <p className="text-sm font-medium text-[#154548]">
                      Insider free shipping over $300
                    </p>
                  </div>
                  <p className="text-sm text-[#333333] flex items-center gap-1 mt-0">
                    paid by Faire
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </p>
                </div>

                {/* Commission */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#333333]">Commission</p>
                  <p className="text-sm text-[#333333]">
                    15% • Marketplace
                  </p>
                </div>

                {/* Preferred Carrier */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#333333]">Preferred carrier</p>
                  <p className="text-sm text-[#333333]">
                    UPS • FedEx
                  </p>
                </div>

                {/* Excluded Carriers */}
                <div>
                  <p className="text-sm font-medium text-[#333333]">Excluded carriers</p>
                  <p className="text-sm text-[#333333]">
                    DPD • GLS • ParcelForce
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        onAccept={handleTermsAccept}
        variant={variant as 1 | 2 | 3}
      />
      <COIUploadModal
        isOpen={coiModalOpen}
        onClose={() => setCoiModalOpen(false)}
        onUpload={handleCOIUpload}
        variant={variant as 1 | 2 | 3}
      />
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={handleConfirmationClose}
        fileName={uploadedFileName}
        type={confirmationType}
      />

      {/* Variant Switcher - for showcasing different design options */}
      <VariantSwitcher
        variantCount={3}
        activeVariant={variant}
        onVariantChange={setVariant}
      />
    </div>
  );
}

