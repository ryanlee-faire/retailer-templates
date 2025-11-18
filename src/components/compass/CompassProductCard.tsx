import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CompassProduct, useCompass } from '../../contexts/CompassContext';

interface CompassProductCardProps {
  product: CompassProduct;
  onSelect?: (product: CompassProduct) => void;
  onAddToCart?: (product: CompassProduct) => void;
  isSelected?: boolean;
  isInCart?: boolean;
}

export default function CompassProductCard({
  product,
  onSelect,
  onAddToCart,
  isSelected = false,
  isInCart = false,
}: CompassProductCardProps) {
  const navigate = useNavigate();
  const { setCurrentProduct } = useCompass();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onAddToCart?.(product);
  };

  // Star icon component
  const StarIcon = () => (
    <svg
      className="w-3 h-3"
      viewBox="0 0 24 24"
      style={{ color: "#333333", fill: "#333333", fontSize: "12px" }}
    >
      <path
        d="m12.844 1.87 2.713 5.501a.94.94 0 0 0 .708.515l6.072.884a.94.94 0 0 1 .515 1.603l-4.396 4.286a.94.94 0 0 0-.269.831l1.037 6.055a.94.94 0 0 1-1.371.99l-5.416-2.848a.94.94 0 0 0-.874 0l-5.43 2.856a.94.94 0 0 1-1.37-.99L5.8 15.5a.94.94 0 0 0-.27-.832l-4.388-4.289a.939.939 0 0 1 .514-1.603l6.079-.89a.94.94 0 0 0 .708-.514l2.714-5.5a.941.941 0 0 1 1.687 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const handleClick = () => {
    // Store product data and navigate to PDP
    setCurrentProduct(product);
    navigate('/pdp');
  };

  return (
    <div
      className={`relative w-full cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-[#333333] rounded' : ''
      }`}
      onClick={handleClick}
    >
      {/* Image Container (slightly wider aspect ratio for space efficiency) */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3", borderRadius: "4px" }}
      >
        {/* Background Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 z-10 bg-white text-[#333333] rounded-full p-2 shadow-md hover:bg-[#333333] hover:text-white transition-colors"
          aria-label={isInCart ? "In cart" : "Add to cart"}
        >
          {isInCart ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Product Info - more compact than BrandTile */}
      <div className="relative -mt-4 flex flex-col items-start px-1 z-10">
        {product.brandAvatarUrl && (
          <div className="outline outline-2 outline-white rounded-full overflow-hidden bg-white">
            <img
              src={product.brandAvatarUrl}
              alt={`${product.brandName} avatar`}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}
        <div style={{ height: "2px", width: "0px" }} />
        <p className="text-xs font-medium text-[#333333] w-full truncate">{product.name}</p>
        <p className="text-xs text-[#757575] w-full truncate">{product.brandName}</p>
        
        {/* Price and rating in one compact row */}
        <div className="flex items-center justify-between w-full text-xs text-[#333333] mt-1">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          {product.rating !== undefined && (
            <div className="flex items-center gap-1">
              <StarIcon />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
        
        {/* Category tag */}
        <div className="mt-1">
          <span className="text-[10px] bg-[#f5f5f5] text-[#757575] px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}

