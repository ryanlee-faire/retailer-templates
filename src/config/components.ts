export interface Component {
  name: string;
  path: string;
  description?: string;
}

export const components: Component[] = [
  { name: "Global nav", path: "/components/global-nav", description: "Navigation bar with search, categories, and user actions" },
  { name: "Footer", path: "/components/footer", description: "Site footer with links and app download badges" },
  { name: "Brand info", path: "/components/brand-info", description: "Brand information display with rating and badges" },
  { name: "Brand cart toggle", path: "/components/brand-cart-toggle", description: "Brand avatar with cart icon button" },
  { name: "Brand tile", path: "/components/brand-tile", description: "Brand display tile with image, rating, and shipping info" },
  { name: "Carousel", path: "/components/carousel", description: "Horizontal carousel component with variants" },
  { name: "Carousel header", path: "/components/carousel-header", description: "Header component for carousels with title and shop all link" },
  { name: "Basic container", path: "/components/basic-container", description: "Standard container with border and padding" },
  { name: "Cart tile", path: "/components/cart-tile", description: "Tile displaying brand info, product images, and item count" },
  { name: "Post-order summary-01", path: "/components/post-order-summary-01", description: "Order summary card with brand, shipping, payment, and savings info" },
  { name: "Product tile", path: "/components/product-tile", description: "Product display tile with image, price, brand info, and quick add button" },
  { name: "Pill button", path: "/components/pill-button", description: "Filter/toggle button styled as a pill with pressed state" },
];

export const getTitleForComponentPath = (pathname: string): string => {
  const component = components.find((c) => c.path === pathname);
  return component ? component.name : "Component";
};

