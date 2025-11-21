import React from "react";

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

/**
 * IconButton - A circular icon button component
 * Based on Faire design system icon button pattern
 */
export default function IconButton({
  icon,
  onClick,
  ariaLabel,
  className = "",
  type = "button",
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center w-12 rounded-full border border-[#dfe0e1] bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 ${className}`}
      style={{ height: "48px", width: "48px" }}
    >
      {icon}
    </button>
  );
}

