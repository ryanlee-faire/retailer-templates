import React from "react";
import ProductDetailPageWithAI from "../../components/ProductDetailPageWithAI";
import { getProductDataFromFolder } from "../../utils/productPages";

export default function MomofukuPDP() {
  const product = getProductDataFromFolder("Momofuku Chili Chocolate Crunch - Limited Edition Batch");
  return <ProductDetailPageWithAI product={product} />;
}

