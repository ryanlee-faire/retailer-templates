import React from "react";
import { Link } from "react-router-dom";
import { brandNameToSlug } from "../../data/products";

interface BrandTileProps {
  imageUrl: string;
  brandName: string;
  brandAvatarUrl?: string;
  rating?: number;
  minOrder?: string;
  freeShipping?: boolean;
  topShop?: boolean;
  onFavorite?: () => void;
  isFavorited?: boolean;
  onClick?: () => void;
  className?: string;
  productName?: string;
  price?: number;
  msrp?: number;
}

export default function BrandTile({
  imageUrl,
  brandName,
  brandAvatarUrl,
  rating,
  minOrder,
  freeShipping = false,
  topShop = false,
  onFavorite,
  isFavorited = false,
  onClick,
  className = "",
  productName,
  price,
  msrp,
}: BrandTileProps) {
  // Heart icon component
  const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ color: filled ? "#333333" : "#ffffff" }}
    >
      <path d="m12 21.429-9.461-8.652c-5.11-5.11 2.41-15.02 9.461-7.029 7.05-7.99 14.572 1.918 9.461 7.029z" />
    </svg>
  );

  // Star icon component
  const StarIcon = () => (
    <svg
      className="w-3 h-3"
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-star"
      role="img"
      style={{ color: "#333333", fill: "#333333", fontSize: "12px" }}
    >
      <path
        d="m12.844 1.87 2.713 5.501a.94.94 0 0 0 .708.515l6.072.884a.94.94 0 0 1 .515 1.603l-4.396 4.286a.94.94 0 0 0-.269.831l1.037 6.055a.94.94 0 0 1-1.371.99l-5.416-2.848a.94.94 0 0 0-.874 0l-5.43 2.856a.94.94 0 0 1-1.37-.99L5.8 15.5a.94.94 0 0 0-.27-.832l-4.388-4.289a.939.939 0 0 1 .514-1.603l6.079-.89a.94.94 0 0 0 .708-.514l2.714-5.5a.941.941 0 0 1 1.687 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-star">Star</title>
    </svg>
  );

  // Free shipping icon (Insider icon)
  const FreeShippingIcon = () => (
    <svg
      className="w-3 h-3"
      focusable="false"
      viewBox="0 0 16 16"
      aria-labelledby="titleAccess-insider"
      role="img"
      style={{ color: "#36676a", fill: "#36676a", width: "12px", height: "12px" }}
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

  return (
    <div
      className={`relative w-full ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Image Container (Square with rounded corners) */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "1 / 1", borderRadius: "4px" }}
      >
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={brandName}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay - darker at bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Top Shop Badge - Top Left */}
        {topShop && (
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-white rounded px-2 py-1">
              <p className="text-xs font-medium text-[#333333]">Top Shop</p>
            </div>
          </div>
        )}

        {/* Heart Icon - Top Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavorite?.();
          }}
          className="absolute top-2 right-2 z-10 p-2 hover:bg-white/20 rounded-[8px] transition-colors duration-500 ease-in-out"
          aria-label={isFavorited ? "Un-follow" : "Follow"}
          style={{ display: onFavorite ? "block" : "none" }}
        >
          <HeartIcon filled={isFavorited} />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col items-start px-1">
        {/* Price with MSRP */}
        {price !== undefined && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-semibold text-[#333333]">${price.toFixed(2)}</span>
            {msrp && msrp > price && (
              <span className="text-sm text-[#757575]">MSRP ${msrp.toFixed(2)}</span>
            )}
          </div>
        )}
        
        {/* Product Name */}
        {productName && (
          <p className="text-sm font-medium text-[#333333] w-full mb-1" style={{ lineHeight: "1.4" }}>
            {productName}
          </p>
        )}
        
        {/* Brand Name - as link */}
        <Link to={`/brand/${brandNameToSlug(brandName)}`} className="text-sm text-[#333333] underline hover:text-[#757575] transition-colors mb-1">
          {brandName}
        </Link>
        
        {/* Rating and Min Order */}
        <div className="flex items-center gap-2 text-sm text-[#333333]">
          {rating !== undefined && (
            <div className="flex items-center gap-1">
              <StarIcon />
              <span>{rating}</span>
            </div>
          )}
          {minOrder && <span>{minOrder}</span>}
        </div>
        
        {/* Free Shipping - separate row */}
        {freeShipping && (
          <div className="flex items-center gap-1 mt-1">
            <FreeShippingIcon />
            <span className="text-sm text-[#154548]">Free shipping</span>
          </div>
        )}
      </div>
    </div>
  );
}

