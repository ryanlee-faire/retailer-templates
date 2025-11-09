import React, { createContext, useContext, useState, ReactNode } from "react";

interface SurfacesMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleMenu: () => void;
}

const SurfacesMenuContext = createContext<SurfacesMenuContextType | undefined>(undefined);

export function SurfacesMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SurfacesMenuContext.Provider value={{ isOpen, setIsOpen, toggleMenu }}>
      {children}
    </SurfacesMenuContext.Provider>
  );
}

export function useSurfacesMenu() {
  const context = useContext(SurfacesMenuContext);
  if (context === undefined) {
    throw new Error("useSurfacesMenu must be used within a SurfacesMenuProvider");
  }
  return context;
}

