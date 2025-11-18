import React from 'react';
import { Message, CompassProduct } from '../../contexts/CompassContext';
import { useCompass } from '../../contexts/CompassContext';
import CompassProductCard from './CompassProductCard';

interface CompassMessageProps {
  message: Message;
  onProductSelect?: (productId: string) => void;
  selectedProductIds?: string[];
}

export default function CompassMessage({
  message,
  onProductSelect,
  selectedProductIds = [],
}: CompassMessageProps) {
  const { addToCart, state } = useCompass();
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const handleAddToCart = (product: CompassProduct) => {
    addToCart(product, 1);
  };

  const isProductInCart = (productId: string) => {
    return state.cartItems.some(item => item.product.id === productId);
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 px-6">
        <div className="max-w-[80%] bg-[#333333] text-white px-4 py-3 rounded-2xl rounded-tr-sm">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  if (isAssistant) {
    return (
      <div className="flex flex-col mb-6 px-6">
        {/* Assistant message bubble */}
        <div className="max-w-[85%] bg-[#f5f5f5] text-[#333333] px-4 py-3 rounded-2xl rounded-tl-sm">
          <p className="text-sm whitespace-pre-line">{message.content}</p>
        </div>

        {/* System interpretation (if present) */}
        {message.interpretation && (
          <div className="mt-2 px-4">
            <p className="text-xs text-[#757575] italic">
              {message.interpretation}
            </p>
          </div>
        )}

        {/* Product grid by category (if present) */}
        {message.productsByCategory && message.productsByCategory.length > 0 && (
          <div className="mt-4 space-y-6">
            {message.productsByCategory.map((categoryGroup, idx) => (
              <div 
                key={idx}
                className="animate-fadeInUp"
                style={{ 
                  animationDelay: `${idx * 400}ms`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                <h4 className="text-sm font-semibold text-[#333333] mb-3 px-1">
                  {categoryGroup.category}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {categoryGroup.products.map((product) => (
                    <CompassProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => onProductSelect?.(p.id)}
                      onAddToCart={handleAddToCart}
                      isSelected={selectedProductIds.includes(product.id)}
                      isInCart={isProductInCart(product.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product grid (if present - for backward compatibility) */}
        {message.products && message.products.length > 0 && !message.productsByCategory && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {message.products.map((product) => (
              <CompassProductCard
                key={product.id}
                product={product}
                onSelect={(p) => onProductSelect?.(p.id)}
                onAddToCart={handleAddToCart}
                isSelected={selectedProductIds.includes(product.id)}
                isInCart={isProductInCart(product.id)}
              />
            ))}
          </div>
        )}

        {/* Suggestion chips (if present) */}
        {message.chips && message.chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {message.chips.map((chip, index) => (
              <button
                key={index}
                className="px-4 py-2 text-sm text-[#333333] bg-white border border-[#dfe0e1] rounded-full hover:bg-[#f5f5f5] hover:border-[#333333] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // System message (if needed in the future)
  return (
    <div className="flex justify-center mb-4 px-6">
      <div className="max-w-[80%] bg-[#f5f5f5] text-[#757575] px-4 py-2 rounded-lg text-xs">
        {message.content}
      </div>
    </div>
  );
}

