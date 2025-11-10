import React, { useRef, useState, useEffect } from "react";
import BrandTile from "./BrandTile";

interface CarouselProps {
  variant?: "brand-tile";
  brands?: Array<{
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
  }>;
  onNavigationButtonsReady?: (buttons: React.ReactNode) => void;
  className?: string;
  tilesPerView?: number; // Number of tiles visible at once (default: 6)
}

export default function Carousel({
  variant = "brand-tile",
  brands = [],
  onNavigationButtonsReady,
  className = "",
  tilesPerView = 6,
}: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };
  
  // Check initial scrollability after mount
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkScrollability();
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerWidth = container.clientWidth;
    const gap = 16;
    const gapCount = tilesPerView - 1;
    const tileWidth = (containerWidth - (gapCount * gap)) / tilesPerView;
    const scrollAmount = (tileWidth + gap) * tilesPerView; // Scroll exactly one full set
    
    if (direction === "left") {
      const targetScroll = container.scrollLeft - scrollAmount;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    } else {
      const targetScroll = container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Chevron icons with proper stroke weight
  const ChevronLeftIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#333333" }}
    >
      <path
        d="m17 2-9.767 9.455A.77.77 0 0 0 7 12a.75.75 0 0 0 .233.545L17 22"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#333333" }}
    >
      <path
        d="m7 2 9.767 9.455A.77.77 0 0 1 17 12a.75.75 0 0 1-.233.545L7 22"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Create navigation buttons
  const createNavigationButtons = () => {
    const buttonStyle: React.CSSProperties = {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "12px",
      gap: "10px",
      width: "32px",
      height: "32px",
      border: "1px solid #dfe0e1",
      borderRadius: "100px",
      backgroundColor: "white",
      color: "#333333",
      cursor: "pointer",
      outline: "none",
      appearance: "none",
      WebkitAppearance: "none",
      flex: "none",
      order: 1,
      flexGrow: 0,
      position: "relative",
    };

    return (
      <>
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous carousel slide"
          aria-disabled={!canScrollLeft}
          style={{
            ...buttonStyle,
            cursor: !canScrollLeft ? "not-allowed" : "pointer",
            border: "1px solid #dfe0e1",
            opacity: 1, // Keep full opacity, handle disabled state differently
          }}
          onMouseEnter={(e) => {
            if (canScrollLeft) {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          {/* Touch target overlay */}
          <span
            style={{
              position: "absolute",
              width: "44px",
              height: "44px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "inherit",
              pointerEvents: "none",
            }}
          />
          {/* Icon container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
              opacity: !canScrollLeft ? 0.5 : 1, // Only reduce icon opacity when disabled
            }}
          >
            <ChevronLeftIcon />
          </div>
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next carousel slide"
          aria-disabled={!canScrollRight}
          style={{
            ...buttonStyle,
            cursor: !canScrollRight ? "not-allowed" : "pointer",
            border: "1px solid #dfe0e1",
            opacity: 1, // Keep full opacity, handle disabled state differently
          }}
          onMouseEnter={(e) => {
            if (canScrollRight) {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          {/* Touch target overlay */}
          <span
            style={{
              position: "absolute",
              width: "44px",
              height: "44px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "inherit",
              pointerEvents: "none",
            }}
          />
          {/* Icon container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
              opacity: !canScrollRight ? 0.5 : 1, // Only reduce icon opacity when disabled
            }}
          >
            <ChevronRightIcon />
          </div>
        </button>
      </>
    );
  };

  // Expose navigation buttons to parent if callback provided
  useEffect(() => {
    if (onNavigationButtonsReady) {
      onNavigationButtonsReady(createNavigationButtons());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canScrollLeft, canScrollRight, onNavigationButtonsReady, brands]);

  if (variant === "brand-tile") {
    // Use original brands array (no infinite scroll for now)
    const displayBrands = brands;
    
    return (
      <div className={`flex flex-col ${className}`}>
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto"
          style={{
            gridColumn: "1 / -1",
            gap: "16px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
          onScroll={() => {
            // This will be handled by the useEffect above
          }}
        >
          {displayBrands.map((brand, index) => {
            const gapCount = tilesPerView - 1;
            return (
              <div
                key={index}
                style={{
                  flexShrink: 0,
                  width: `calc((100% - (${gapCount} * 16px)) / ${tilesPerView})`,
                  minWidth: `calc((100% - (${gapCount} * 16px)) / ${tilesPerView})`,
                  scrollSnapAlign: "start",
                }}
              >
              <BrandTile
                imageUrl={brand.imageUrl}
                brandName={brand.brandName}
                brandAvatarUrl={brand.brandAvatarUrl}
                rating={brand.rating}
                minOrder={brand.minOrder}
                freeShipping={brand.freeShipping}
                topShop={brand.topShop}
                onFavorite={brand.onFavorite}
                isFavorited={brand.isFavorited}
                onClick={brand.onClick}
              />
              </div>
            );
          })}
          <style>{`
            .flex::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return null;
}
