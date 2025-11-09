import React from "react";

interface BasicContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: number | string;
}

/**
 * BasicContainer Component
 *
 * A standardized container component from the design system.
 *
 * Specs:
 * - Border: 1px, muted color (#dfe0e1)
 * - Border radius: 4px
 * - Fill: white
 * - Padding: 24px all around (default, can be customized)
 */
export default function BasicContainer({
  children,
  className = "",
  style = {},
  padding = "24px",
}: BasicContainerProps) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid #dfe0e1",
        borderRadius: "4px",
        backgroundColor: "white",
        padding: typeof padding === "number" ? `${padding}px` : padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}


