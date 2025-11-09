export interface Surface {
  name: string;
  path: string;
}

export const surfaces: Surface[] = [
  { name: "Basic logged-in", path: "/template" },
  { name: "PDP", path: "/pdp" },
  { name: "PDP v2", path: "/pdp-v2" },
  { name: "Checkout", path: "/checkout" },
];

export const getTitleForPath = (pathname: string): string => {
  if (pathname === "/") {
    return "Retailer Template";
  }
  
  const surface = surfaces.find((s) => s.path === pathname);
  return surface ? surface.name : "Retailer Template";
};

