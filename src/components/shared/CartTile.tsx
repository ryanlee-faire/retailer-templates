import React from "react";
import BasicContainer from "./BasicContainer";

interface CartTileProps {
  brandName: string;
  avatarUrl: string;
  productImages: string[];
  additionalCount: number;
  className?: string;
}

export default function CartTile({
  brandName,
  avatarUrl,
  productImages,
  additionalCount,
  className = "",
}: CartTileProps) {
  return (
    <BasicContainer className={className} style={{ padding: "16px" }}>
      <div className="flex items-center gap-3 mb-3">
        <img
          src={avatarUrl}
          alt={brandName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-[#333333]">{brandName}</span>
      </div>
      <div className="flex gap-2">
        {productImages.map((img, imgIndex) => (
          <img
            key={imgIndex}
            src={img}
            alt="Product"
            className="w-12 h-12 object-cover rounded"
          />
        ))}
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-xs font-medium text-[#333333]">+{additionalCount}</span>
        </div>
      </div>
    </BasicContainer>
  );
}

