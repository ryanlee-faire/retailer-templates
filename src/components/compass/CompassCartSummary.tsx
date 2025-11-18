import React, { useState } from 'react';
import { useCompass } from '../../contexts/CompassContext';
import CompassCartItem from './CompassCartItem';

export default function CompassCartSummary() {
  const { state, updateCartQuantity, removeFromCart, getCartTotal, getCartItemsByBrand } = useCompass();
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if cart is empty
  if (state.cartItems.length === 0) {
    return null;
  }

  const total = getCartTotal();
  const itemCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemsByBrand = getCartItemsByBrand();

  // Calculate brand minimum progress
  const getBrandProgress = (brandName: string) => {
    const brandItems = itemsByBrand[brandName] || [];
    const brandTotal = brandItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    // Get minimum from first product in brand (they should all have same minimum)
    const brandMinimum = brandItems[0]?.product.brandMinimum || 0;
    const remaining = Math.max(0, brandMinimum - brandTotal);
    const progress = brandMinimum > 0 ? (brandTotal / brandMinimum) * 100 : 100;
    
    return {
      current: brandTotal,
      minimum: brandMinimum,
      remaining,
      progress: Math.min(100, progress),
      isMet: brandTotal >= brandMinimum,
    };
  };

  // Check if at least one brand minimum is met
  const anyMinimumMet = Object.keys(itemsByBrand).some(brandName => {
    const progress = getBrandProgress(brandName);
    return progress.isMet;
  });

  return (
    <div className="border-t border-[#dfe0e1] bg-white">
      {/* Collapsed Summary */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 flex items-center justify-between hover:bg-[#f5f5f5] transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#333333]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-semibold text-[#333333]">
            Your Bundle ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="text-sm text-[#757575]">•</span>
          <span className="text-sm font-semibold text-[#333333]">
            ${total.toFixed(2)}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-[#757575] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Expanded Cart View */}
      {isExpanded && (
        <div className="px-6 pb-4">
          {/* Cart Items with brand minimums underneath each */}
          <div className="mb-4">
            {state.cartItems.map((item) => {
              const brandProgress = getBrandProgress(item.product.brandName);
              return (
                <CompassCartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={removeFromCart}
                  brandProgress={brandProgress}
                />
              );
            })}
          </div>

          {/* Subtotal */}
          <div className="border-t border-[#dfe0e1] pt-3 pb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#333333]">Subtotal</span>
            <span className="text-lg font-bold text-[#333333]">${total.toFixed(2)}</span>
          </div>

          {/* Add Bundle to Cart CTA - show when at least one minimum met */}
          {anyMinimumMet && (
            <button 
              className="w-full py-3 bg-[#333333] text-white rounded-lg hover:bg-[#555555] transition-colors font-semibold text-sm"
              onClick={() => {
                // For prototype: just show visual feedback
                alert('Bundle would be added to Faire cart!');
              }}
            >
              Add Bundle to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}

