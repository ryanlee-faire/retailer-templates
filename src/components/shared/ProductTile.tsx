import React from "react";
import { Link } from "react-router-dom";
import { brandNameToSlug } from "../../data/products";

export interface ProductTileProps {
  id: string;
  name: string;
  brandName: string;
  imageUrl: string;
  price: string;
  msrp?: string;
  minOrder?: string;
  freeShipping?: boolean;
  isTopShop?: boolean;
  zoomButton?: boolean;
  onClick?: () => void;
  onQuickAdd?: () => void;
  className?: string;
}

export default function ProductTile({
  id,
  name,
  brandName,
  imageUrl,
  price,
  msrp,
  minOrder,
  freeShipping = false,
  isTopShop = false,
  zoomButton = false,
  onClick,
  onQuickAdd,
  className = "",
}: ProductTileProps) {
  // Top Shop icon
  const TopShopIcon = () => (
    <svg
      className="w-3 h-3"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#333333" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.577 11.57a5.43 5.43 0 0 0 1.645-3.888V.254H0v7.428c0 1.457.584 2.859 1.64 3.888.759.741 1.71 1.25 2.737 1.477-1.194.362-2.132 1.236-2.507 2.34h7.481c-.375-1.1-1.317-1.977-2.511-2.34a5.65 5.65 0 0 0 2.737-1.477"
        fill="currentColor"
      />
      <path
        d="m5.702 2.723.675 1.772c.02.05.071.075.12.06l1.757-.559c.085-.026.158.068.114.148l-.916 1.652a.105.105 0 0 0 .029.135l1.516 1.076c.074.052.048.17-.04.184L7.14 7.48a.1.1 0 0 0-.083.108l.134 1.9c.007.091-.099.144-.164.081l-1.35-1.293a.095.095 0 0 0-.132 0l-1.35 1.293c-.065.063-.17.01-.164-.081l.134-1.9a.1.1 0 0 0-.083-.108l-1.817-.288c-.087-.014-.113-.132-.04-.184L3.74 5.931a.103.103 0 0 0 .029-.135l-.915-1.652c-.044-.08.029-.174.114-.147l1.757.558a.097.097 0 0 0 .12-.06l.674-1.771a.097.097 0 0 1 .182-.001"
        fill="#fff"
      />
    </svg>
  );

  // Insider/Free shipping icon
  const InsiderIcon = () => (
    <svg
      className="w-3 h-3"
      viewBox="0 0 16 16"
      fill="none"
      style={{ color: "#36676a", fill: "#36676a", width: "12px", height: "12px" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.874 8A4.002 4.002 0 0 1 1 7a4 4 0 0 1 7.874-1H15v3.75h-3V8zM5 9.222a2.222 2.222 0 1 0 0-4.444 2.222 2.222 0 0 0 0 4.444"
        fill="currentColor"
      />
    </svg>
  );

  // Zoom icon
  const ZoomIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.357 10.149a8.791 8.791 0 1 1 15.061 6.162.5.5 0 0 0-.107.107 8.791 8.791 0 0 1-14.955-6.27m15.353 7.268a9.76 9.76 0 0 1-6.562 2.523c-5.407 0-9.791-4.384-9.791-9.791C.357 4.74 4.74.357 10.148.357c5.408 0 9.792 4.384 9.792 9.792a9.76 9.76 0 0 1-2.523 6.56l6.08 6.08a.5.5 0 0 1-.708.707z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.786 6a.5.5 0 1 0-1 0v3.786H6a.5.5 0 1 0 0 1h3.786v3.785a.5.5 0 1 0 1 0v-3.785h3.785a.5.5 0 1 0 0-1h-3.785z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className={`relative flex flex-col ${className}`} data-test-id="product-tile">
      <div className="relative">
        <Link
          to={`/product/${id}`}
          data-test-id="product-tile-link"
          onClick={onClick}
        >
          <div data-test-id="carousel-image">
            <picture
              className="rounded relative flex h-0 w-full shrink-0 overflow-hidden"
              data-test-id="product-image"
              style={{ paddingTop: "calc(100%)" }}
            >
              <img
                className="absolute top-0 left-0 h-full w-full object-center object-cover rounded"
                alt={name}
                src={imageUrl}
              />
              <div
                className="rounded pointer-events-none absolute top-0 left-0 z-2 h-full w-full print:hidden"
                style={{ background: "rgba(0, 0, 0, 0.02)" }}
              />
            </picture>
          </div>
        </Link>

        {/* Zoom Button (bottom-left) */}
        {zoomButton && (
          <button
            className="bg-white border border-[#dfe0e1] hover:border-[#333333] hover:bg-[#333333] hover:text-white transition-all absolute bottom-2 left-2 z-5 flex h-8 w-8 items-center justify-center rounded-full duration-200 ease-in-out"
            aria-label="Zoom in"
          >
            <ZoomIcon />
          </button>
        )}

        {/* Quick Add Button (bottom-right) */}
        <div className="absolute right-2 bottom-2 z-5">
          <div data-test-id="quick-add-marketplace-product">
            <button
              data-test-id="round-quantity-picker-expand-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickAdd?.();
              }}
              aria-label="Add to cart"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#333333] hover:bg-[#333333] hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1.714v20.572M1.714 12h20.572" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: "8px" }} />

      {/* Product Information */}
      <Link
        to={`/product/${id}`}
        data-test-id="product-tile-product-information"
        onClick={onClick}
        className="flex flex-col gap-0.5"
      >
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-medium text-[#333333]">{price}</span>
            {msrp && (
              <div>
                <span className="text-xs text-[#333333]">MSRP {msrp}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Name */}
        <div className="max-w-full">
          <p
            className="text-sm font-medium text-[#333333] whitespace-normal break-words line-clamp-2"
            data-test-id="product-tile-product-name"
          >
            {name}
          </p>
        </div>
      </Link>

      {/* Brand Name */}
      <div className="mt-2 flex flex-col gap-0.5">
        <Link
          to={`/brand/${brandNameToSlug(brandName)}`}
          data-test-id="product-tile-brand-link"
          className="flex items-center gap-1 overflow-hidden underline"
        >
          <p className="text-sm text-[#333333] break-all line-clamp-1">{brandName}</p>
        </Link>

        {/* Min Order and Free Shipping */}
        <Link to={`/product/${id}`} className="flex flex-col gap-0.5">
          {minOrder && (
            <div className="flex items-center gap-1">
              <p className="text-sm text-[#333333]">{minOrder}</p>
            </div>
          )}
          {freeShipping && (
            <div className="flex items-center">
              <p className="text-sm text-[#154548] flex items-center gap-1">
                <InsiderIcon />
                <span>Free shipping</span>
              </p>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

