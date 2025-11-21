import React from "react";

export interface PillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isPressed?: boolean;
  ariaLabel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "toggle" | "default"; // Add variant prop
}

/**
 * PillButton - A pill-shaped button component
 * - "toggle" variant: For filter/toggle buttons with pressed state (default)
 * - "default" variant: For regular action buttons like "Follow"
 * Based on Faire design system button patterns
 */
export default function PillButton({
  children,
  onClick,
  isPressed = false,
  ariaLabel,
  className = "",
  type = "button",
  variant = "toggle",
}: PillButtonProps) {
  // Default variant (for regular buttons like "Follow")
  if (variant === "default") {
    return (
      <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`px-6 rounded-full text-sm text-[#333333] border border-[#dfe0e1] bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 ${className}`}
        style={{ height: "48px" }}
      >
        {children}
      </button>
    );
  }

  // Toggle variant (for filter buttons with pressed state)
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={isPressed}
      role="switch"
      aria-label={ariaLabel}
      className={`px-3 py-1.5 rounded-full text-sm text-[#333333] border border-[#dfe0e1] bg-white hover:bg-gray-50 hover:border-[#333333] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 flex items-center gap-2 ${className} ${
        isPressed ? "bg-[#333333] text-white border-[#333333] hover:bg-[#333333]" : ""
      }`}
    >
      {children}
    </button>
  );
}

