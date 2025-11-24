import React from "react";
import ProductDetailPageWithAI from "../../components/ProductDetailPageWithAI";
import { getProductDataFromFolder } from "../../utils/productPages";

export default function BjornQornPDP() {
  const product = getProductDataFromFolder("3oz Classic BjornQorn");
  return <ProductDetailPageWithAI product={product} />;
}

