import React from "react";
import { Link } from "react-router-dom";
import { BrandCartCard } from "./index";
import { brandNameToSlug } from "../../data/products";

// Helper function to determine if brand should use V2 template
function getBrandPagePath(brandName: string): string {
  const slug = brandNameToSlug(brandName);
  // Use V2 for Pom Pom Popcorn by Bessou
  if (slug === "pom-pom-popcorn-by-bessou") {
    return `/brand/${slug}/v2`;
  }
  return `/brand/${slug}`;
}

interface BrandInfoProps {
  brandName: string;
  brandAvatarUrl?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string; // e.g., "Top Shop"
  minReached?: string; // e.g., "$100 min reached"
  showCartCard?: boolean;
  cartCardVariant?: "default" | "number";
  cartCardNumber?: number;
  showInsider?: boolean;
  itemTotal?: string;
  variant?: "pdp" | "checkout";
  className?: string;
}

export default function BrandInfo({
  brandName,
  brandAvatarUrl,
  rating,
  reviewCount,
  badge,
  minReached,
  showCartCard = false,
  cartCardVariant = "default",
  cartCardNumber,
  showInsider = false,
  itemTotal,
  variant = "pdp",
  className = "",
}: BrandInfoProps) {
  // Star icon component
  const StarIcon = () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12.844 1.87 2.713 5.501a.94.94 0 0 0 .708.515l6.072.884a.94.94 0 0 1 .515 1.603l-4.396 4.286a.94.94 0 0 0-.269.831l1.037 6.055a.94.94 0 0 1-1.371.99l-5.416-2.848a.94.94 0 0 0-.874 0l-5.43 2.856a.94.94 0 0 1-1.37-.99L5.8 15.5a.94.94 0 0 0-.27-.832l-4.388-4.289a.939.939 0 0 1 .514-1.603l6.079-.89a.94.94 0 0 0 .708-.514l2.714-5.5a.941.941 0 0 1 1.687 0Z" />
    </svg>
  );

  // Insider icon component
  const InsiderIcon = ({ className }: { className?: string }) => (
    <svg
      className={className || "w-3 h-3"}
      focusable="false"
      viewBox="0 0 16 16"
      aria-labelledby="titleAccess-insider"
      role="img"
      style={{ color: "#36676a", fill: "#36676a" }}
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

  if (variant === "checkout") {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="flex items-center gap-4">
          {brandAvatarUrl && (
            <div className="relative">
              <img
                src={brandAvatarUrl}
                alt={brandName}
                className="w-14 h-14 rounded object-cover"
              />
            </div>
          )}
          <div className="flex flex-col">
            <Link to={getBrandPagePath(brandName)} className="text-sm font-medium text-[#333333] hover:underline transition-colors duration-500 ease-in-out">
              {brandName}
            </Link>
            {showInsider && (
              <div className="flex items-center gap-1 mt-0.5">
                <InsiderIcon />
                <span className="text-xs text-[#154548]">Insider</span>
              </div>
            )}
            {itemTotal && (
              <p className="text-sm text-[#333333] mt-1">Item total: {itemTotal}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // PDP variant
  return (
    <div className={`mb-6 mt-0 ${showCartCard ? "flex items-start justify-between" : ""} ${className}`}>
      <div className="flex items-center gap-2">
        {brandAvatarUrl && (
          <div className="relative">
            <img
              src={brandAvatarUrl}
              alt={brandName}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <Link to={getBrandPagePath(brandName)} className="text-xs font-medium text-[#333333] hover:underline transition-colors duration-500 ease-in-out">
            {brandName}
          </Link>
          <div className="flex items-center gap-1 text-xs text-[#333333]">
            {badge && (
              <>
                <span>{badge}</span>
                <span className="text-[#757575]"> · </span>
              </>
            )}
            {rating !== undefined && (
              <>
                <StarIcon />
                <span>{rating}</span>
                {minReached && (
                  <>
                    <span className="text-[#757575]"> · </span>
                    <span>{minReached}</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showCartCard && (
        <div style={{ marginTop: "-8px" }}>
          <BrandCartCard
            brandAvatarUrl={brandAvatarUrl}
            brandName={brandName}
            variant={cartCardVariant}
            number={cartCardNumber}
          />
        </div>
      )}
    </div>
  );
}

