import React from 'react';
import { CartItem } from '../../contexts/CompassContext';

interface CompassCartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  brandProgress: {
    current: number;
    minimum: number;
    remaining: number;
    progress: number;
    isMet: boolean;
  };
}

export default function CompassCartItem({
  item,
  onUpdateQuantity,
  onRemove,
  brandProgress,
}: CompassCartItemProps) {
  const { product, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    } else {
      onRemove(product.id);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="py-3 border-b border-[#f5f5f5] last:border-b-0">
      {/* Item row */}
      <div className="flex items-center gap-3">
        {/* Product thumbnail */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-12 h-12 object-cover rounded"
        />

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#333333] truncate">{product.name}</p>
          <p className="text-xs text-[#757575] truncate">{product.brandName}</p>
        </div>

        {/* Quantity stepper */}
        <div className="flex items-center gap-2 bg-[#f5f5f5] rounded px-2 py-1">
          <button
            onClick={handleDecrease}
            className="text-[#333333] hover:text-[#757575] w-5 h-5 flex items-center justify-center"
            aria-label="Decrease quantity"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-sm font-medium text-[#333333] w-4 text-center">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="text-[#333333] hover:text-[#757575] w-5 h-5 flex items-center justify-center"
            aria-label="Increase quantity"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Price */}
        <div className="text-sm font-medium text-[#333333] w-16 text-right">
          ${(product.price * quantity).toFixed(2)}
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(product.id)}
          className="text-[#757575] hover:text-[#333333] w-5 h-5 flex items-center justify-center flex-shrink-0"
          aria-label="Remove from cart"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Brand minimum progress - directly under item */}
      <div className="mt-2 ml-[60px]">
        <div className="mb-1">
          <span className="text-xs text-[#757575]">
            ${Math.round(brandProgress.current)} of ${Math.round(brandProgress.minimum)} minimum met
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#f5f5f5] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              brandProgress.isMet ? 'bg-green-500' : 'bg-[#757575]'
            }`}
            style={{ width: `${brandProgress.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

