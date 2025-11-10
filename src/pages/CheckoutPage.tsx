import React, { useState } from "react";
import RetailerLayout from "../components/RetailerLayout";
import { BasicContainer, BrandInfo } from "../components/shared";

export default function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState("insider");
  const [saveDefaults, setSaveDefaults] = useState(false);
  const [shareEmail, setShareEmail] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data
  const order = {
    store: "[Faire Employee – No Commission] Ryan Lee",
    shipTo: "Ryan Lee, 2731 Chelsea Drive Oakland CA 94611",
    paymentMethod: {
      type: "amex",
      lastFour: "1000",
      expiry: "04/27",
    },
    items: [
      {
        brand: "Misewell",
        brandAvatar: "/images/products/product-image-01.webp",
        itemTotal: "$319.00",
        hasInsider: true,
        shippingDays: "11–14 days",
        deliveryEst: "Nov 30-Dec 8",
        images: [
          "/images/products/product-image-01.webp",
          "/images/products/product-image-02.webp",
        ],
      },
    ],
    subtotal: "$319.00",
    estimatedShipping: "$28.00",
    total: "$347.00",
  };

  // Chevron icon for accordions
  const ChevronIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation"
      style={{ color: "#333333", fill: "none", fontSize: "8px", ...style }}
    >
      <path
        d="M6.60693 0.857147L17.1429 11.3931C17.2228 11.4728 17.2861 11.5674 17.3293 11.6715C17.3725 11.7756 17.3948 11.8873 17.3948 12C17.3948 12.1127 17.3725 12.2244 17.3293 12.3285C17.2861 12.4327 17.2228 12.5272 17.1429 12.6069L6.60693 23.1429"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Amex card icon
  const AmexIcon = () => (
    <svg
      focusable="false"
      viewBox="0 0 40 26"
      aria-labelledby="titleAccess-amex"
      role="img"
      style={{ width: "30px", height: "auto" }}
    >
      <path d="M0 23a3 3 0 0 0 3 3h34a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3z" fill="#016FD0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.69 13.63v1.64h-4.17v1.14h4.07v1.64h-4.07v1.12h4.17v1.66l3.38-3.6zm-1.1-6.14-1.4-3.19h-4l-4.1 9.32h3.33v8.27l10.28.01 1.61-1.8 1.63 1.8H40v-2.63l-1.92-2.06L40 15.16v-2.59l-1.93.01V7.6l-1.81 4.98H34.5l-1.86-5v5h-4.2l-.6-1.46h-3.3l-.6 1.46h-2.22l3.23-7.27V5.3h2.55l3.19 7.21V5.3l3.1.01 1.6 4.47 1.62-4.48H40v-1h-3.77l-.85 2.39-.85-2.39h-4.94zm-5.06 6.11v7.27h6.16v-.01h2.54l2.1-2.32 2.12 2.32H40v-.1l-3.34-3.53L40 13.65v-.05h-2.52l-2.1 2.3-2.08-2.3zm.7-4.11.96-2.31.97 2.31z"
        fill="#fff"
      />
      <path
        d="M37 25.75H3A2.75 2.75 0 0 1 .25 23V3A2.75 2.75 0 0 1 3 .25h34A2.75 2.75 0 0 1 39.75 3v20A2.75 2.75 0 0 1 37 25.75Z"
        stroke="#AAA"
        strokeWidth=".5"
      />
      <title id="titleAccess-amex">Amex Icon</title>
    </svg>
  );

  // Insider icon
  const InsiderIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 16 16"
      aria-labelledby="titleAccess-insider"
      role="img"
      style={{ color: "#36676a", fill: "#36676a", width: "16px", height: "auto" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.874 8A4.002 4.002 0 0 1 1 7a4 4 0 0 1 7.874-1H15v3.75h-3V8zM5 9.222a2.222 2.222 0 1 0 0-4.444 2.222 2.222 0 0 0 0 4.444"
        fill="currentColor"
      />
      <title id="titleAccess-insider">Insider</title>
    </svg>
  );

  // Info icon
  const InfoIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-info"
      role="img"
      style={{ fill: "none", fontSize: "14px" }}
    >
      <path
        d="M0.857422 12C0.857422 14.9553 2.0314 17.7895 4.12109 19.8792C6.21078 21.9689 9.04501 23.1429 12.0003 23.1429C14.9555 23.1429 17.7898 21.9689 19.8795 19.8792C21.9692 17.7895 23.1431 14.9553 23.1431 12C23.1431 9.04477 21.9692 6.21054 19.8795 4.12085C17.7898 2.03115 14.9555 0.857178 12.0003 0.857178C9.04501 0.857178 6.21078 2.03115 4.12109 4.12085C2.0314 6.21054 0.857422 9.04477 0.857422 12V12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12V18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1426 7.71432C11.1426 7.94165 11.2329 8.15967 11.3936 8.32041C11.5544 8.48116 11.7724 8.57146 11.9997 8.57146C12.227 8.57146 12.4451 8.48116 12.6058 8.32041C12.7666 8.15967 12.8569 7.94165 12.8569 7.71432C12.8569 7.48699 12.7666 7.26897 12.6058 7.10823C12.4451 6.94748 12.227 6.85718 11.9997 6.85718C11.7724 6.85718 11.5544 6.94748 11.3936 7.10823C11.2329 7.26897 11.1426 7.48699 11.1426 7.71432Z"
        fill="currentColor"
      />
      <title id="titleAccess-info">Information</title>
    </svg>
  );

  return (
    <RetailerLayout languageSelector={false} cartCount={0} focusedNav={true} hideFooter={true}>
      <div
        className="retailer-12col-grid mx-auto"
        style={{
          maxWidth: "1920px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "48px",
          paddingBottom: "120px",
          alignItems: "start",
          position: "relative",
        }}
      >
        {/* Left Column - Main Content */}
        <div style={{ gridColumn: "2 / 8", gridRow: "1" }}>
          <div className="flex flex-col">
            {/* Store info Section */}
            <div className="mb-12">
              <h5 className="text-2xl font-medium text-[#333333] mb-4">Store info</h5>
              <div className="flex flex-col gap-0">
                {/* Store */}
                <div className="border-t border-[#dfe0e1]">
                  <div className="flex items-center justify-between py-3">
                    <button className="flex items-center justify-between w-full text-left">
                      <p className="text-sm text-[#757575]">Store</p>
                      <ChevronIcon className="w-2 h-2" style={{ transform: "rotateZ(90deg)" }} />
                    </button>
                  </div>
                  <button className="w-full text-left pb-4">
                    <p className="text-sm font-medium text-[#333333]">{order.store}</p>
                  </button>
                </div>

                {/* Ship to */}
                <div className="border-t border-[#dfe0e1]">
                  <div className="flex items-center justify-between py-3">
                    <button className="flex items-center justify-between w-full text-left">
                      <p className="text-sm text-[#757575]">Ship to</p>
                      <ChevronIcon className="w-2 h-2" style={{ transform: "rotateZ(90deg)" }} />
                    </button>
                  </div>
                  <button className="w-full text-left pb-4">
                    <p className="text-sm font-medium text-[#333333]">{order.shipTo}</p>
                  </button>
                </div>

                {/* Payment method */}
                <div className="border-t border-[#dfe0e1]">
                  <div className="flex items-center justify-between py-3">
                    <button className="flex items-center justify-between w-full text-left">
                      <p className="text-sm text-[#757575]">Payment method</p>
                      <ChevronIcon className="w-2 h-2" style={{ transform: "rotateZ(90deg)" }} />
                    </button>
                  </div>
                  <button className="w-full text-left pb-4">
                    <div className="flex items-center gap-2">
                      <AmexIcon />
                      <p className="text-sm font-medium text-[#333333]">•••• {order.paymentMethod.lastFour}</p>
                      <p className="text-sm text-[#757575]">Exp {order.paymentMethod.expiry}</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Save defaults checkbox */}
              <div className="mt-4 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="save-defaults"
                  checked={saveDefaults}
                  onChange={(e) => setSaveDefaults(e.target.checked)}
                  className="mt-1"
                />
                <div className="flex flex-col">
                  <label htmlFor="save-defaults" className="text-sm text-[#333333]">
                    Save this shipping address and payment method as default for {order.store}
                  </label>
                  <p className="text-sm text-[#757575] mt-1">
                    We will preselect these when you or any teammate checkout for this store
                  </p>
                </div>
              </div>
            </div>

            {/* Choose shipping option Section */}
            <div className="mb-12">
              <h5 className="text-2xl font-medium text-[#333333] mb-4">Choose shipping option</h5>
              <div className="flex flex-col gap-4">
                {/* Free shipping with Insider */}
                <div className="flex flex-col">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        value="insider"
                        checked={selectedShipping === "insider"}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="flex flex-col pl-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#154548]">Free shipping with Insider</p>
                          <p className="text-sm font-medium text-[#154548]">Free</p>
                        </div>
                        <p className="text-sm text-[#333333] mt-1">
                          Try Insider, free for 30 days. Only <s>$19.99</s>{" "}
                          <b>
                            <span style={{ color: "#36676A" }}>$9.99/month</span>
                          </b>{" "}
                          for your first 6 months after that!{" "}
                          <button className="text-sm underline">View offer</button>
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Estimated shipping */}
                <div className="flex flex-col">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        value="estimated"
                        checked={selectedShipping === "estimated"}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="flex flex-col pl-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#333333]">Estimated shipping</p>
                          <p className="text-sm text-[#333333]">$28.00</p>
                        </div>
                        <p className="text-sm text-[#333333] mt-1">
                          Shipping price is estimated and will be finalized upon order fulfillment.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Review order details Section */}
            <div>
              <h5 className="text-2xl font-medium text-[#333333] mb-4">Review order details</h5>
              <div className="flex flex-col gap-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col border border-[#dfe0e1] rounded p-4">
                    {/* Brand header */}
                    <div className="flex items-center justify-between mb-4">
                      <BrandInfo
                        brandName={item.brand}
                        brandAvatarUrl={item.brandAvatar}
                        showInsider={item.hasInsider}
                        itemTotal={item.itemTotal}
                        variant="checkout"
                      />
                      <button className="text-sm text-[#333333] underline">Edit</button>
                    </div>

                    {/* Divider - matches Total divider style */}
                    <div className="flex items-center justify-between mb-4 pt-3 border-t border-[#dfe0e1]">
                      <span style={{ visibility: "hidden" }}>spacer</span>
                    </div>

                    {/* Shipping info */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[#333333]">Ships in {item.shippingDays}</p>
                          <span className="text-sm text-[#757575]">
                            Est. delivery{" "}
                            <span className="underline" style={{ cursor: "pointer" }}>
                              {item.deliveryEst}
                            </span>
                          </span>
                        </div>
                        <button className="text-sm text-[#333333] underline">Choose ship date</button>
                      </div>
                      <p className="text-sm" style={{ color: "#7d3e1e" }}>
                        Eligible for free returns
                      </p>

                      {/* Product thumbnails */}
                      <div className="flex gap-2">
                        {item.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${item.brand} product ${imgIndex + 1}`}
                            className="w-13 h-13 rounded object-cover border-2 border-white"
                            style={{ width: "52px", height: "52px" }}
                          />
                        ))}
                      </div>
                    </div>

                    <hr className="border-t border-[#dfe0e1] my-4" />

                    {/* Purchase order number */}
                    <div className="flex flex-col">
                      <label htmlFor="purchase-order" className="text-sm text-[#333333] mb-1">
                        Purchase order number (optional)
                      </label>
                      <textarea
                        id="purchase-order"
                        maxLength={30}
                        value={purchaseOrder}
                        onChange={(e) => setPurchaseOrder(e.target.value)}
                        className="w-full border border-[#757575] rounded px-3 py-2 text-sm resize-none"
                        style={{ height: "42px" }}
                      />
                      <div className="flex justify-end mt-1">
                        <p className="text-xs text-[#333333]">
                          {purchaseOrder.length}/30
                        </p>
                      </div>
                    </div>

                    {/* Share email checkbox */}
                    <div className="mt-4 flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="share-email"
                        checked={shareEmail}
                        onChange={(e) => setShareEmail(e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="share-email" className="text-sm text-[#333333]">
                        Share my email address directly with this brand.{" "}
                        <a href="https://www.faire.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                          Read Faire's Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div
          className="sticky self-start"
          style={{ 
            gridColumn: "8 / 12", 
            gridRow: "1", 
            paddingLeft: "48px",
            top: "56px",
            maxHeight: "calc(100vh - 56px)",
            overflowY: "auto"
          }}
        >
          <div className="flex flex-col">
            <h5 className="text-2xl font-medium text-[#333333] mb-4">Order summary</h5>

            <BasicContainer>
              {/* Brand line items */}
              <div className="mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <p className="text-sm text-[#333333] truncate">{item.brand}</p>
                    <p className="text-sm text-[#333333] ml-4">{item.itemTotal}</p>
                  </div>
                ))}
              </div>

              <hr className="border-t border-[#dfe0e1] my-4" style={{ width: "calc(100% + 48px)", marginLeft: "-24px", marginRight: "-24px" }} />

              {/* Subtotal */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#333333]">Subtotal</p>
                <p className="text-sm text-[#333333]">{order.subtotal}</p>
              </div>

              {/* Estimated shipping */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[#333333]">Estimated shipping</p>
                  <div className="relative group">
                    <InfoIcon className="w-3.5 h-3.5 text-[#333333]" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Shipping is estimated and may change when a brand fulfills the order.
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#333333]">{order.estimatedShipping}</p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-4 pt-3 border-t border-[#dfe0e1]">
                <h5 className="text-sm font-medium text-[#333333]">Total</h5>
                <h5 className="text-sm font-medium text-[#333333]">{order.total}</h5>
              </div>

              {/* Insider free shipping message */}
              <div className="flex items-start gap-4 mb-4 p-3 rounded" style={{ backgroundColor: "rgb(242, 245, 245)" }}>
                <InsiderIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#333333]">
                  Your order total qualifies for <b>free shipping</b> when you join Insider.
                </p>
              </div>

              {/* Place order button */}
              <button
                onClick={() => setIsProcessing(!isProcessing)}
                className="w-full bg-[#333333] text-white py-3 px-6 rounded font-medium mb-4 hover:bg-[#222222] transition-colors duration-500 ease-in-out flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span>Processing order</span>
                    <div className="flex items-center justify-center gap-1" style={{ marginLeft: "4px" }}>
                      <span 
                        className="w-1.5 h-1.5 bg-white rounded-full" 
                        style={{ 
                          animation: "dotPulse 1.2s ease-in-out infinite",
                          animationDelay: "0s"
                        }} 
                      />
                      <span 
                        className="w-1.5 h-1.5 bg-white rounded-full" 
                        style={{ 
                          animation: "dotPulse 1.2s ease-in-out infinite",
                          animationDelay: "0.4s"
                        }} 
                      />
                      <span 
                        className="w-1.5 h-1.5 bg-white rounded-full" 
                        style={{ 
                          animation: "dotPulse 1.2s ease-in-out infinite",
                          animationDelay: "0.8s"
                        }} 
                      />
                    </div>
                    <style>{`
                      @keyframes dotPulse {
                        0%, 100% {
                          opacity: 0.3;
                        }
                        50% {
                          opacity: 1;
                        }
                      }
                    `}</style>
                  </>
                ) : (
                  "Place order"
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-[#333333] mb-6">
                By placing your order, you agree to our{" "}
                <a href="/tos-retailer" target="_blank" rel="noopener noreferrer" className="underline">
                  Terms
                </a>
                .
              </p>

              {/* Promo code */}
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label htmlFor="promo-code" className="text-sm text-[#333333] mb-1 block">
                      Promo code
                    </label>
                    <input
                      id="promo-code"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder=""
                      className="w-full border border-[#dfe0e1] rounded px-3 py-2 text-sm"
                      style={{ height: "42px" }}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      disabled={!promoCode}
                      className="px-4 py-2 bg-[#333333] text-white rounded text-sm font-medium disabled:cursor-not-allowed hover:bg-[#222222] transition-colors duration-500 ease-in-out"
                      style={{
                        height: "42px",
                        ...(!promoCode && {
                          backgroundColor: "#F7F7F7",
                          color: "#333333",
                        }),
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </BasicContainer>
          </div>
        </div>
      </div>
    </RetailerLayout>
  );
}
