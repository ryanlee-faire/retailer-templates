import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Security } from "@okta/okta-react";
import IndexPage from "./pages/IndexPage";
import TemplatePage from "./pages/TemplatePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductDetailPageV2 from "./pages/ProductDetailPageV2";
import ProductDetailPageWithDrawer from "./pages/ProductDetailPageWithDrawer";
import ProductDetailPageWithDrawerLeft from "./pages/ProductDetailPageWithDrawerLeft";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ComponentShowcasePage from "./pages/ComponentShowcasePage";
import NewPage from "./pages/NewPage";
import BrandPage from "./pages/BrandPage";
import CompassFullSurfacePage from "./pages/CompassFullSurfacePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProductsPage from "./pages/faire/ProductsPage";
import BulkEditorPage from "./pages/faire/BulkEditorPage";
import GridOverlay from "./components/GridOverlay";
import SurfacesMenuOverlay from "./components/SurfacesMenuOverlay";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginCallback from "./components/LoginCallback";
import { getTitleForPath } from "./config/surfaces";
import { getTitleForComponentPath } from "./config/components";
import { SurfacesMenuProvider } from "./contexts/SurfacesMenuContext";
import { CompassProvider, useCompass } from "./contexts/CompassContext";
import CompassSidePanel from "./components/compass/CompassSidePanel";
import oktaAuth from "./config/okta";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const { state: compassState } = useCompass();

  useEffect(() => {
    let title = "Retailer Template";
    if (location.pathname.startsWith("/components/")) {
      title = getTitleForComponentPath(location.pathname);
    } else {
      title = getTitleForPath(location.pathname);
    }
    document.title = title;
  }, [location.pathname]);

  // Check if Okta is enabled (requires both issuer and clientId)
  const isOktaEnabled = !!(process.env.REACT_APP_OKTA_ISSUER && process.env.REACT_APP_OKTA_CLIENT_ID);

  // Wrapper component to conditionally apply protection
  const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isOktaEnabled) {
      return <ProtectedRoute>{children}</ProtectedRoute>;
    }
    return <>{children}</>;
  };

  // Determine which Compass component to show based on route
  const showCompassDrawer = location.pathname === '/pdp-with-drawer' || location.pathname === '/pdp-with-drawer-left';
  const showCompassSidePanel = !showCompassDrawer;

  // Don't apply margin transform for drawer routes since they're part of the grid
  const shouldApplyMargin = showCompassSidePanel && compassState.isPanelOpen;

  return (
    <div className="App">
      <GridOverlay />
      <SurfacesMenuOverlay />
      {showCompassSidePanel && <CompassSidePanel />}
      <div
        className="compass-content-wrapper"
        style={{
          marginRight: shouldApplyMargin ? '385px' : '0',
          transition: 'margin-right 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Routes>
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/" element={<RouteWrapper><IndexPage /></RouteWrapper>} />
        <Route path="/experimental" element={<RouteWrapper><IndexPage /></RouteWrapper>} />
        <Route path="/templates" element={<RouteWrapper><IndexPage /></RouteWrapper>} />
        <Route path="/components" element={<RouteWrapper><IndexPage /></RouteWrapper>} />
        <Route path="/template" element={<RouteWrapper><TemplatePage /></RouteWrapper>} />
        <Route path="/category/:categoryName" element={<RouteWrapper><CategoryPage /></RouteWrapper>} />
        <Route path="/new-page" element={<RouteWrapper><NewPage /></RouteWrapper>} />
        <Route path="/brand" element={<RouteWrapper><BrandPage /></RouteWrapper>} />
        <Route path="/search-results" element={<RouteWrapper><SearchResultsPage /></RouteWrapper>} />
        <Route path="/compass-full-surface" element={<RouteWrapper><CompassFullSurfacePage /></RouteWrapper>} />
        <Route path="/pdp" element={<RouteWrapper><ProductDetailPage /></RouteWrapper>} />
        <Route path="/pdp-v2" element={<RouteWrapper><ProductDetailPageV2 /></RouteWrapper>} />
        <Route path="/pdp-with-drawer" element={<RouteWrapper><ProductDetailPageWithDrawer /></RouteWrapper>} />
        <Route path="/pdp-with-drawer-left" element={<RouteWrapper><ProductDetailPageWithDrawerLeft /></RouteWrapper>} />
        <Route path="/checkout" element={<RouteWrapper><CheckoutPage /></RouteWrapper>} />
        <Route path="/order-confirmation" element={<RouteWrapper><OrderConfirmationPage /></RouteWrapper>} />
        <Route path="/components/global-nav" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/footer" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/brand-info" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/brand-cart-toggle" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/brand-tile" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/carousel" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/carousel-header" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/basic-container" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/cart-tile" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/post-order-summary-01" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/product-tile" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        <Route path="/components/pill-button" element={<RouteWrapper><ComponentShowcasePage /></RouteWrapper>} />
        {/* Faire Product Management Routes */}
        <Route path="/faire/products" element={<RouteWrapper><ProductsPage /></RouteWrapper>} />
        <Route path="/faire/bulk-editor" element={<RouteWrapper><BulkEditorPage /></RouteWrapper>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  // Check if Okta is enabled
  const isOktaEnabled = !!(process.env.REACT_APP_OKTA_ISSUER && process.env.REACT_APP_OKTA_CLIENT_ID);

  const appContent = (
    <BrowserRouter>
      <SurfacesMenuProvider>
        <CompassProvider>
          <AppContent />
        </CompassProvider>
      </SurfacesMenuProvider>
    </BrowserRouter>
  );

  // Wrap with Okta Security if enabled and oktaAuth is configured
  if (isOktaEnabled && oktaAuth) {
    const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
      window.location.replace(originalUri);
    };

    return (
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        {appContent}
      </Security>
    );
  }

  return appContent;
}

export default App;

