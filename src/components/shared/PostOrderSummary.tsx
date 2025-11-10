import React from "react";
import BasicContainer from "./BasicContainer";

interface PostOrderSummaryProps {
  brandName: string;
  orderNumber: string;
  total: string;
  shippingAddress: string;
  paymentMethod: {
    type: string;
    lastFour: string;
    terms: string;
  };
  itemCount: number;
  itemImageUrl: string;
  savings: string;
  savingsType: string;
  className?: string;
}

// VISA logo component
const VisaIcon = () => (
  <svg
    width="32"
    height="10"
    viewBox="0 0 32 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="10" rx="1.5" fill="#1434CB" />
    <text
      x="16"
      y="7"
      fontFamily="Arial, sans-serif"
      fontSize="7"
      fontWeight="700"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      VISA
    </text>
  </svg>
);

// Key icon component (for savings bar)
const KeyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 0C8.57 0 7 1.57 7 3.5C7 4.29 7.25 5.01 7.66 5.6L0 13.26V16H2.74V13.26H5.48V10.52H8.22L10.4 8.34C11.49 8.75 12.71 8.75 13.8 8.34C15.73 7.43 16.93 5.46 16.93 3.5C16.93 1.57 15.36 0 13.43 0H10.5ZM10.5 2C11.88 2 13 3.12 13 4.5C13 5.88 11.88 7 10.5 7C9.12 7 8 5.88 8 4.5C8 3.12 9.12 2 10.5 2Z"
      fill="#36676a"
    />
  </svg>
);

export default function PostOrderSummary({
  brandName,
  orderNumber,
  total,
  shippingAddress,
  paymentMethod,
  itemCount,
  itemImageUrl,
  savings,
  savingsType,
  className = "",
}: PostOrderSummaryProps) {
  return (
    <BasicContainer
      className={className}
      style={{
        display: "flex",
        width: "438px",
        height: "292px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "4px",
        border: "1px solid #dfe0e1",
        background: "white",
        padding: "24px",
        paddingBottom: "36px",
      }}
    >
      {/* Brand and Order Details with Item Count Icon */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-[#333333] mb-2">{brandName}</h3>
            <p className="text-sm text-[#333333] mb-1">Order {orderNumber}</p>
            <p className="text-lg font-medium text-[#333333]">Total: {total}</p>
          </div>
          {/* Item Count Image with Badge - positioned to the right */}
          <div className="relative">
            <img
              src={itemImageUrl}
              alt="Order items"
              className="w-16 h-16 object-cover rounded"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#333333] text-white rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-xs font-medium">{itemCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div style={{ marginBottom: "38px", width: "100%" }}>
        <p className="text-sm text-[#333333] font-medium mb-2" style={{ marginBottom: "12px" }}>Ship to</p>
        <p className="text-sm text-[#333333]">{shippingAddress}</p>
      </div>

      {/* Payment Method */}
      <div style={{ marginBottom: "38px", width: "100%" }}>
        <p className="text-sm text-[#333333] font-medium mb-2" style={{ marginBottom: "12px" }}>Payment method</p>
        <div className="flex items-center gap-2">
          <VisaIcon />
          <p className="text-sm text-[#333333]">
            .... {paymentMethod.lastFour} • {paymentMethod.terms}
          </p>
        </div>
      </div>

      {/* Savings Bar */}
      <div className="bg-[#f2f5f5] rounded p-3 flex items-center gap-2" style={{ width: "100%" }}>
        <KeyIcon />
        <p className="text-sm text-[#333333]">
          Saving {savings} with {savingsType}
        </p>
      </div>
    </BasicContainer>
  );
}

