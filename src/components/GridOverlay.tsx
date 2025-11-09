import React, { useState, useEffect } from "react";

interface GridOverlayProps {
  enabled?: boolean;
}

export default function GridOverlay({ enabled: externalEnabled }: GridOverlayProps) {
  const [enabled, setEnabled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  });

  useEffect(() => {
    // Update viewport width on mount and resize
    const updateWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    // Keyboard shortcut: 'Shift + G' key to toggle grid (matches Figma)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only toggle if not typing in an input/textarea/contenteditable
      const target = e.target as HTMLElement;
      const isInput = 
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable ||
        target.closest('input, textarea, [contenteditable="true"]');

      if (
        e.key.toLowerCase() === "g" &&
        e.shiftKey &&
        !isInput &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        setEnabled((prev) => {
          console.log("Grid toggled:", !prev);
          return !prev;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Use external enabled state if provided, otherwise use internal state
  const isEnabled = externalEnabled !== undefined ? externalEnabled : enabled;

  // Grid rules:
  // - 48px padding on left and right
  // - 12 columns
  // - 16px gutters between columns
  // - Applies from 600px and up (container max width is 1920px)
  const shouldShowGrid = viewportWidth >= 600;

  if (!isEnabled || !shouldShowGrid) {
    return null;
  }

  // Grid rules
  const containerPadding = 48; // 48px on each side
  const numColumns = 12;
  const gutterWidth = 16; // 16px between columns
  const maxWidth = 1920; // Max container width is 1920px

  // Container width: use viewport width if < 1920px, otherwise use 1920px (centered)
  const containerWidth = viewportWidth < maxWidth ? viewportWidth : maxWidth;
  
  // Calculate available width for columns (container width minus padding)
  const availableWidth = containerWidth - containerPadding * 2;

  // Calculate column width
  // Total gutter space = (numColumns - 1) * gutterWidth
  // Column width = (availableWidth - totalGutterSpace) / numColumns
  const totalGutterSpace = (numColumns - 1) * gutterWidth;
  const columnWidth = (availableWidth - totalGutterSpace) / numColumns;

  // Calculate left offset (centered if viewport is wider than max width)
  const leftOffset = viewportWidth > maxWidth ? (viewportWidth - maxWidth) / 2 : 0;

  return (
    <div
      className="fixed top-0 bottom-0 pointer-events-none z-[9999]"
      style={{
        left: `${leftOffset}px`,
        width: `${containerWidth}px`,
      }}
    >
      {/* Container with padding */}
      <div
        className="h-full relative"
        style={{
          paddingLeft: `${containerPadding}px`,
          paddingRight: `${containerPadding}px`,
        }}
      >
        {/* Column backgrounds */}
        {Array.from({ length: numColumns }).map((_, index) => {
          const leftPosition = containerPadding + index * (columnWidth + gutterWidth);
          return (
            <div
              key={`col-${index}`}
              className="absolute top-0 bottom-0"
              style={{
                left: `${leftPosition}px`,
                width: `${columnWidth}px`,
                backgroundColor: "rgba(255, 0, 0, 0.15)",
              }}
            />
          );
        })}
      </div>

      {/* Info badge */}
      <div
        className="fixed bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded pointer-events-auto"
        style={{ zIndex: 10000 }}
      >
        <div>Grid: {numColumns} cols</div>
        <div>Gutter: {gutterWidth}px</div>
        <div>Padding: {containerPadding}px</div>
            <div className="text-[10px] mt-1 opacity-70">Press 'Shift + G' to toggle</div>
      </div>
    </div>
  );
}

