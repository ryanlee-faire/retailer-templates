import React from "react";

interface CarouselHeaderProps {
  title: string;
  shopAllLink?: {
    href: string;
    text?: string;
  };
  navigationButtons?: React.ReactNode;
  className?: string;
}

export default function CarouselHeader({
  title,
  shopAllLink,
  navigationButtons,
  className = "",
}: CarouselHeaderProps) {
  return (
    <div
      className={`flex justify-between items-baseline gap-2 pb-4 ${className}`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-start">
          <p
            className="text-[#333333]"
            style={{
              fontFamily: "Nantes, serif",
              fontWeight: 400,
              fontSize: "22px",
              lineHeight: "28px",
              letterSpacing: "-0.3px",
            }}
          >
            {title}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {shopAllLink && (
          <a
            href={shopAllLink.href}
            className="text-sm text-[#333333] hover:text-[#757575] hover:underline transition-colors duration-500 ease-in-out"
          >
            {shopAllLink.text || "Shop all"}
          </a>
        )}
        {navigationButtons && (
          <div className="flex gap-2" style={{ marginLeft: shopAllLink ? "8px" : "0" }}>
            {navigationButtons}
          </div>
        )}
      </div>
    </div>
  );
}

