import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import RetailerLayout from "../components/RetailerLayout";
import BrandTile from "../components/shared/BrandTile";
import { compassProducts } from "../data/compassProducts";
import { useCompass } from "../contexts/CompassContext";

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, setCurrentProduct } = useCompass();
  const fromCompass = searchParams.get('from') === 'compass';

  // Handle "Paired Products" and other categories with proper memoization
  const filteredProducts = React.useMemo(() => {
    const isPairedProducts = categoryName === 'Paired Products';
    
    if (isPairedProducts) {
      return state.pairedProducts || [];
    }
    
    // Map category names to product categories
    const getCategoryFilter = (name: string) => {
      const normalized = name?.toLowerCase() || '';
      if (normalized.includes('food') || normalized.includes('snack')) return 'snack';
      if (normalized.includes('beverage') || normalized.includes('drink')) return 'beverage';
      if (normalized.includes('bath') || normalized.includes('soap')) return 'soap';
      if (normalized.includes('accessor')) return 'accessory';
      return null;
    };
    
    const categoryFilter = getCategoryFilter(categoryName || '');
    return categoryFilter
      ? compassProducts.filter(p => p.category === categoryFilter)
      : compassProducts;
  }, [categoryName, state.pairedProducts]);

  // Mock product data with full details
  const displayProducts = filteredProducts.map(product => ({
    ...product, // Keep full product object for navigation
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

  const handleProductClick = (product: typeof filteredProducts[0]) => {
    // Set product in Compass context for PDP
    setCurrentProduct(product);
    // Navigate to PDP
    navigate('/pdp');
  };

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
              key={product.id || index}
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
              onClick={() => handleProductClick(filteredProducts[index])}
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

