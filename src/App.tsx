import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import TemplatePage from "./pages/TemplatePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductDetailPageV2 from "./pages/ProductDetailPageV2";
import CheckoutPage from "./pages/CheckoutPage";
import ComponentShowcasePage from "./pages/ComponentShowcasePage";
import GridOverlay from "./components/GridOverlay";
import SurfacesMenuOverlay from "./components/SurfacesMenuOverlay";
import { getTitleForPath } from "./config/surfaces";
import { getTitleForComponentPath } from "./config/components";
import { SurfacesMenuProvider } from "./contexts/SurfacesMenuContext";
import "./App.css";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    let title = "Retailer Template";
    if (location.pathname.startsWith("/components/")) {
      title = getTitleForComponentPath(location.pathname);
    } else {
      title = getTitleForPath(location.pathname);
    }
    document.title = title;
  }, [location.pathname]);

  return (
    <div className="App">
      <GridOverlay />
      <SurfacesMenuOverlay />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/template" element={<TemplatePage />} />
        <Route path="/pdp" element={<ProductDetailPage />} />
        <Route path="/pdp-v2" element={<ProductDetailPageV2 />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/components/global-nav" element={<ComponentShowcasePage />} />
        <Route path="/components/footer" element={<ComponentShowcasePage />} />
        <Route path="/components/brand-info" element={<ComponentShowcasePage />} />
        <Route path="/components/brand-cart-card" element={<ComponentShowcasePage />} />
        <Route path="/components/basic-container" element={<ComponentShowcasePage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SurfacesMenuProvider>
        <AppContent />
      </SurfacesMenuProvider>
    </BrowserRouter>
  );
}

export default App;

