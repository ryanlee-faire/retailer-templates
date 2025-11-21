export interface Surface {
  name: string;
  path: string;
}

export const surfaces: Surface[] = [
  { name: "Basic logged-in", path: "/template" },
  { name: "New page", path: "/new-page" },
  { name: "Brand page", path: "/brand" },
  { name: "PDP", path: "/pdp" },
  { name: "PDP v2", path: "/pdp-v2" },
  { name: "PDP with drawer", path: "/pdp-with-drawer" },
  { name: "PDP with drawer (left)", path: "/pdp-with-drawer-left" },
  { name: "Checkout", path: "/checkout" },
  { name: "Order confirmation", path: "/order-confirmation" },
];

export const getTitleForPath = (pathname: string): string => {
  if (pathname === "/") {
    return "Retailer Template";
  }
  
  const surface = surfaces.find((s) => s.path === pathname);
  return surface ? surface.name : "Retailer Template";
};

