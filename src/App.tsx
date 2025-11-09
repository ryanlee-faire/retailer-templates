import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import TemplatePage from "./pages/TemplatePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import GridOverlay from "./components/GridOverlay";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GridOverlay />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/template" element={<TemplatePage />} />
          <Route path="/pdp" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<div>Checkout page coming soon</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

