import React from "react";

interface BrandCartCardProps {
  brandAvatarUrl?: string;
  brandName?: string;
  onClick?: () => void;
}

// Cart Icon Component
function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-cart"
      role="img"
      style={{ color: "#333333", fill: "none" }}
    >
      <path
        d="M20.74 14.714H7.744L6.029 5.286h16.114a.857.857 0 0 1 .843 1.01l-1.402 7.714a.86.86 0 0 1-.843.704ZM6.029 5.286l-.72-3.6A.86.86 0 0 0 4.469 1H1.743M7.743 14.714l.72 3.6a.86.86 0 0 0 .84.686h9.583"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.884 22.429a.857.857 0 1 1-1.714 0 .857.857 0 0 1 1.714 0ZM11.17 22.429a.857.857 0 1 1-1.715 0 .857.857 0 0 1 1.715 0Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-cart">Cart</title>
    </svg>
  );
}

/**
 * BrandCartCard Component
 * 
 * A compact card component displaying a brand avatar and shopping cart icon.
 * 
 * Specs:
 * - Container: 84px width, 48px height, 4px border radius
 * - Padding: 8px top/bottom, 8px left, 16px right
 * - Gap between avatar and cart: 12px
 * - Border: 1px, muted color (#dfe0e1)
 * - Fill: white
 */
export default function BrandCartCard({
  brandAvatarUrl,
  brandName,
  onClick,
}: BrandCartCardProps) {
  return (
    <div
      className="flex items-center bg-white rounded hover:bg-gray-100 transition-colors"
      style={{
        width: "84px",
        height: "48px",
        borderRadius: "9999px",
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "8px",
        paddingRight: "16px",
        border: "1px solid #dfe0e1",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {/* Brand Avatar */}
      <div
        className="flex-shrink-0 rounded-full overflow-hidden"
        style={{
          width: "32px",
          height: "32px",
        }}
      >
        {brandAvatarUrl ? (
          <img
            src={brandAvatarUrl}
            alt={brandName ? `${brandName} avatar` : "Brand avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-gray-200 flex items-center justify-center"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <span className="text-xs text-gray-400">Brand</span>
          </div>
        )}
      </div>

      {/* Spacing between avatar and cart */}
      <div style={{ width: "12px" }} />

      {/* Shopping Cart Icon */}
      <div className="flex-shrink-0">
        <CartIcon className="w-5 h-5" />
      </div>
    </div>
  );
}

