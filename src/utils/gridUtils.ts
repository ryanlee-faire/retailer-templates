/**
 * Grid utility functions for calculating column positions
 * Grid system: 48px padding, 12 columns, 16px gutters
 */

interface GridDimensions {
  containerPadding: number;
  numColumns: number;
  gutterWidth: number;
  maxWidth: number;
}

const GRID_CONFIG: GridDimensions = {
  containerPadding: 48,
  numColumns: 12,
  gutterWidth: 16,
  maxWidth: 1920,
};

/**
 * Calculate grid dimensions based on viewport width
 */
export function getGridDimensions(viewportWidth: number) {
  const containerWidth = viewportWidth < GRID_CONFIG.maxWidth ? viewportWidth : GRID_CONFIG.maxWidth;
  const availableWidth = containerWidth - GRID_CONFIG.containerPadding * 2;
  const totalGutterSpace = (GRID_CONFIG.numColumns - 1) * GRID_CONFIG.gutterWidth;
  const columnWidth = (availableWidth - totalGutterSpace) / GRID_CONFIG.numColumns;

  return {
    containerWidth,
    columnWidth,
    gutterWidth: GRID_CONFIG.gutterWidth,
    containerPadding: GRID_CONFIG.containerPadding,
  };
}

/**
 * Calculate the left position of a column (1-indexed)
 * Column 1 starts at the padding position
 */
export function getColumnPosition(columnIndex: number, viewportWidth: number): number {
  const { containerPadding, columnWidth, gutterWidth } = getGridDimensions(viewportWidth);
  // Column index is 1-based, so column 1 = index 0
  return containerPadding + (columnIndex - 1) * (columnWidth + gutterWidth);
}

/**
 * Calculate the width spanning multiple columns
 */
export function getColumnSpanWidth(startColumn: number, endColumn: number, viewportWidth: number): number {
  const { columnWidth, gutterWidth } = getGridDimensions(viewportWidth);
  const numColumns = endColumn - startColumn + 1;
  const numGutters = numColumns - 1;
  return numColumns * columnWidth + numGutters * gutterWidth;
}

/**
 * Get CSS styles for positioning content within the grid
 * Positions are relative to the container (which is centered if viewport > 1920px)
 */
export function getGridStyles(
  startColumn: number,
  endColumn: number,
  viewportWidth: number
): { left: string; width: string } {
  const { columnWidth, gutterWidth } = getGridDimensions(viewportWidth);
  
  // Calculate position relative to container (after padding)
  // Column positions are relative to the container's left edge (after 48px padding)
  const left = (startColumn - 1) * (columnWidth + gutterWidth);
  const numColumns = endColumn - startColumn + 1;
  const numGutters = numColumns - 1;
  const width = numColumns * columnWidth + numGutters * gutterWidth;

  return {
    left: `${left}px`,
    width: `${width}px`,
  };
}

