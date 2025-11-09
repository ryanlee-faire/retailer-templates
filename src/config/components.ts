export interface Component {
  name: string;
  path: string;
  description?: string;
}

export const components: Component[] = [
  { name: "Global Nav", path: "/components/global-nav", description: "Navigation bar with search, categories, and user actions" },
  { name: "Footer", path: "/components/footer", description: "Site footer with links and app download badges" },
  { name: "Brand Info", path: "/components/brand-info", description: "Brand information display with rating and badges" },
  { name: "Brand Cart Card", path: "/components/brand-cart-card", description: "Brand avatar with cart icon button" },
  { name: "Basic Container", path: "/components/basic-container", description: "Standard container with border and padding" },
];

export const getTitleForComponentPath = (pathname: string): string => {
  const component = components.find((c) => c.path === pathname);
  return component ? component.name : "Component";
};

