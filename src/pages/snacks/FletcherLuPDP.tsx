import React from "react";
import ProductDetailPageWithAI from "../../components/ProductDetailPageWithAI";
import { getProductDataFromFolder } from "../../utils/productPages";

export default function FletcherLuPDP() {
  const product = getProductDataFromFolder("Fletcher & Lu Seed Cracker");
  return <ProductDetailPageWithAI product={product} />;
}

