import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { surfaces } from "../config/surfaces";
import { BasicContainer } from "./shared";
import { useSurfacesMenu } from "../contexts/SurfacesMenuContext";

export default function SurfacesMenuOverlay() {
  const { isOpen, setIsOpen, toggleMenu } = useSurfacesMenu();
  const location = useLocation();

  // Global keyboard shortcut: Shift + M
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "M" || e.key === "m")) {
        e.preventDefault();
        toggleMenu();
      }
      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleMenu, setIsOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        onClick={() => setIsOpen(false)}
        style={{
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        {/* Gradient background */}
        <div
          className="absolute"
          style={{
            background: "linear-gradient(135deg, rgba(51, 51, 51, 0.15) 0%, rgba(117, 117, 117, 0.15) 100%)",
            filter: "blur(120px)",
            width: "100%",
            height: "100%",
            top: "48px",
            left: "48px",
            right: "-48px",
            bottom: "-48px",
          }}
        />
      </div>
      {/* Menu - Centered */}
      <div
        className="fixed z-50"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "fadeInScale 0.2s ease-out",
        }}
      >
        <BasicContainer style={{ minWidth: "200px" }}>
          <div className="flex flex-col gap-2">
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-[#333333]">Surfaces</h3>
            </div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  to="/"
                  className="block text-sm text-[#333333] hover:text-[#757575] hover:underline py-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Index
                </Link>
              </li>
              {surfaces.map((surface) => (
                <li key={surface.path}>
                  <Link
                    to={surface.path}
                    className="block text-sm text-[#333333] hover:text-[#757575] hover:underline py-1 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {surface.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </BasicContainer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}

