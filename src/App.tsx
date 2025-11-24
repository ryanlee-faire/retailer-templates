import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Security } from "@okta/okta-react";
import IndexPage from "./pages/IndexPage";
import TemplatePage from "./pages/TemplatePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductDetailPageV2 from "./pages/ProductDetailPageV2";
import ProductDetailPageV2WithAI from "./pages/ProductDetailPageV2WithAI";
import ProductDetailPageV2WithAIInline from "./pages/ProductDetailPageV2WithAIInline";
import ProductDetailPageWithDrawer from "./pages/ProductDetailPageWithDrawer";
import BjornQornPDP from "./pages/snacks/BjornQornPDP";
import FletcherLuPDP from "./pages/snacks/FletcherLuPDP";
import SourdoughPretzelsPDP from "./pages/snacks/SourdoughPretzelsPDP";
import MomofukuPDP from "./pages/snacks/MomofukuPDP";
import MisoCaramelPopcornPDP from "./pages/snacks/MisoCaramelPopcornPDP";
import VanillaBeanMarshmallowsPDP from "./pages/snacks/VanillaBeanMarshmallowsPDP";
import ProductDetailPageWithDrawerLeft from "./pages/ProductDetailPageWithDrawerLeft";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ComponentShowcasePage from "./pages/ComponentShowcasePage";
import NewPage from "./pages/NewPage";
import BrandPage from "./pages/BrandPage";
import BrandPageV2 from "./pages/BrandPageV2";
import CompassFullSurfacePage from "./pages/CompassFullSurfacePage";
import CompassContainedHomePage from "./pages/CompassContainedHomePage";
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
  // Contained flow routes (isolated from existing Compass implementations)
  const isContainedFlow = location.pathname.startsWith('/compass-contained');
  const showCompassDrawer = location.pathname === '/pdp-with-drawer' || 
                            location.pathname === '/pdp-with-drawer-left' ||
                            location.pathname === '/pdp-v2-with-ai' ||
                            location.pathname.startsWith('/pdp/snacks/');
  // Show side panel for:
  // - Existing Compass routes: /template, /pdp, /category/*
  // - Contained flow routes: /compass-contained/*
  // But NOT for: drawer routes, full surface route
  const isExistingCompassRoute = location.pathname === '/template' || 
                                  location.pathname === '/pdp' || 
                                  location.pathname.startsWith('/category/');
  const showCompassSidePanel = (isExistingCompassRoute || isContainedFlow) && !showCompassDrawer;

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
          marginRight: shouldApplyMargin ? '480px' : '0',
          transition: 'margin-right 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Routes>
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/" element={<RouteWrapper><IndexPage /></RouteWrapper>} />
        <Route path="/template" element={<RouteWrapper><TemplatePage /></RouteWrapper>} />
        <Route path="/category/:categoryName" element={<RouteWrapper><CategoryPage /></RouteWrapper>} />
        <Route path="/new-page" element={<RouteWrapper><NewPage /></RouteWrapper>} />
        <Route path="/brand/:brandSlug" element={<RouteWrapper><BrandPage /></RouteWrapper>} />
        <Route path="/brand/:brandSlug/v2" element={<RouteWrapper><BrandPageV2 /></RouteWrapper>} />
        <Route path="/search-results" element={<RouteWrapper><SearchResultsPage /></RouteWrapper>} />
        <Route path="/compass-full-surface" element={<RouteWrapper><CompassFullSurfacePage /></RouteWrapper>} />
        {/* Contained Compass Flow - Isolated from existing implementations */}
        <Route path="/compass-contained/home" element={<RouteWrapper><CompassContainedHomePage /></RouteWrapper>} />
        <Route path="/pdp" element={<RouteWrapper><ProductDetailPage /></RouteWrapper>} />
        <Route path="/pdp-v2" element={<RouteWrapper><ProductDetailPageV2 /></RouteWrapper>} />
        <Route path="/pdp-v2-with-ai" element={<RouteWrapper><ProductDetailPageV2WithAI /></RouteWrapper>} />
        <Route path="/pdp-v2-with-ai-inline" element={<RouteWrapper><ProductDetailPageV2WithAIInline /></RouteWrapper>} />
        <Route path="/pdp-with-drawer" element={<RouteWrapper><ProductDetailPageWithDrawer /></RouteWrapper>} />
        {/* Snack Product PDPs */}
        <Route path="/pdp/bjornqorn" element={<RouteWrapper><BjornQornPDP /></RouteWrapper>} />
        <Route path="/pdp/fletcher-lu-seed-cracker" element={<RouteWrapper><FletcherLuPDP /></RouteWrapper>} />
        <Route path="/pdp/sourdough-pretzels" element={<RouteWrapper><SourdoughPretzelsPDP /></RouteWrapper>} />
        <Route path="/pdp/momofuku-chili-chocolate" element={<RouteWrapper><MomofukuPDP /></RouteWrapper>} />
        <Route path="/pdp/miso-caramel-popcorn" element={<RouteWrapper><MisoCaramelPopcornPDP /></RouteWrapper>} />
        <Route path="/pdp/vanilla-bean-marshmallows" element={<RouteWrapper><VanillaBeanMarshmallowsPDP /></RouteWrapper>} />
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

