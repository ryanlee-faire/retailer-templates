import React from "react";
import ProductDetailPageWithAI from "../../components/ProductDetailPageWithAI";
import { getProductDataFromFolder } from "../../utils/productPages";

export default function VanillaBeanMarshmallowsPDP() {
  const product = getProductDataFromFolder("Vanilla Bean Marshmallows");
  return <ProductDetailPageWithAI product={product} />;
}

