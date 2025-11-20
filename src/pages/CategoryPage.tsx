import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RetailerLayout from "../components/RetailerLayout";
import BrandTile from "../components/shared/BrandTile";
import { compassProducts } from "../data/compassProducts";

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();
  const fromCompass = searchParams.get('from') === 'compass';

  // Map category names to product categories
  const getCategoryFilter = (categoryName: string) => {
    const normalized = categoryName?.toLowerCase() || '';
    if (normalized.includes('food') || normalized.includes('snack')) return 'snack';
    if (normalized.includes('beverage') || normalized.includes('drink')) return 'beverage';
    if (normalized.includes('bath') || normalized.includes('soap')) return 'soap';
    if (normalized.includes('accessor')) return 'accessory';
    return null;
  };

  const categoryFilter = getCategoryFilter(categoryName || '');
  const filteredProducts = categoryFilter
    ? compassProducts.filter(p => p.category === categoryFilter)
    : compassProducts;

  // Mock product data with full details
  const displayProducts = filteredProducts.map(product => ({
    imageUrl: product.imageUrl,
    brandName: product.brandName,
    productName: product.name,
    brandAvatarUrl: product.brandAvatarUrl,
    price: product.price,
    msrp: product.price * 1.5, // Mock MSRP
    rating: product.rating,
    minOrder: `$${product.brandMinimum} min`,
    freeShipping: product.freeShipping || false,
    topShop: false,
    isFavorited: false,
  }));

  return (
    <RetailerLayout languageSelector={false} cartCount={13}>
      <div className="mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px" }}>
        {/* Category header */}
        <div className="py-8">
          <h1
            className="text-[#333333]"
            style={{
              fontFamily: "Nantes, serif",
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "36px",
              letterSpacing: "-0.3px",
            }}
          >
            {categoryName}
          </h1>
          {fromCompass && (
            <p className="text-sm text-[#757575] mt-2">
              Showing all results from Compass
            </p>
          )}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-6 gap-4 mb-12">
          {displayProducts.map((product, index) => (
            <BrandTile
              key={index}
              imageUrl={product.imageUrl}
              brandName={product.brandName}
              productName={product.productName}
              price={product.price}
              msrp={product.msrp}
              brandAvatarUrl={product.brandAvatarUrl}
              rating={product.rating}
              minOrder={product.minOrder}
              freeShipping={product.freeShipping}
              topShop={product.topShop}
              onFavorite={() => console.log("Favorited:", product.brandName)}
              isFavorited={product.isFavorited}
              onClick={() => console.log("Clicked:", product.brandName)}
            />
          ))}
        </div>

        {/* Show message if no products found */}
        {displayProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-[#757575]">No products found in this category</p>
          </div>
        )}
      </div>
    </RetailerLayout>
  );
}

