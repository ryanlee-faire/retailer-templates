import React from "react";
import ProductDetailPageWithAI from "../../components/ProductDetailPageWithAI";
import { getProductDataFromFolder } from "../../utils/productPages";

export default function SourdoughPretzelsPDP() {
  const product = getProductDataFromFolder("Handmade Sourdough Pretzels, Salted - 2.75 oz Bags");
  return <ProductDetailPageWithAI product={product} />;
}

