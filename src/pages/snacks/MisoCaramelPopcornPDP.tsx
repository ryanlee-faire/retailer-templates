import React from "react";
import ProductDetailPageWithAI from "../../components/ProductDetailPageWithAI";
import { getProductDataFromFolder } from "../../utils/productPages";

export default function MisoCaramelPopcornPDP() {
  const product = getProductDataFromFolder("Popcorn, Miso Caramel");
  return <ProductDetailPageWithAI product={product} />;
}

