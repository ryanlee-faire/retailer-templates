import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message, CompassProduct } from '../../contexts/CompassContext';
import { useCompass } from '../../contexts/CompassContext';
import CompassProductCard from './CompassProductCard';

interface CompassMessageProps {
  message: Message;
  onProductSelect?: (productId: string) => void;
  onChipClick?: (chipText: string) => void;
  selectedProductIds?: string[];
}

// Category scroll row component with navigation
function CategoryScrollRow({
  categoryGroup,
  idx,
  onProductSelect,
  handleAddToCart,
  selectedProductIds,
  isProductInCart,
}: {
  categoryGroup: { category: string; products: CompassProduct[] };
  idx: number;
  onProductSelect?: (productId: string) => void;
  handleAddToCart: (product: CompassProduct) => void;
  selectedProductIds: string[];
  isProductInCart: (productId: string) => boolean;
}) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleSeeAll = () => {
    // Navigate to category page without closing Compass panel
    const categorySlug = categoryGroup.category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${encodeURIComponent(categoryGroup.category)}?from=compass`);
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300; // Scroll about 2 cards
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="animate-fadeInUp relative group"
      style={{
        animationDelay: `${idx * 400}ms`,
        opacity: 0,
        animationFillMode: 'forwards'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#333333]">
          {categoryGroup.category}
        </h4>
        <button
          onClick={handleSeeAll}
          className="text-xs text-[#333333] hover:text-[#757575] hover:underline transition-colors"
        >
          See all
        </button>
      </div>

      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          style={{ marginTop: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m17 2-9.767 9.455A.77.77 0 0 0 7 12a.75.75 0 0 0 .233.545L17 22" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          style={{ marginTop: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m7 2 9.767 9.455A.77.77 0 0 1 17 12a.75.75 0 0 1-.233.545L7 22" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
        }}
      >
        {categoryGroup.products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0"
            style={{
              width: '140px',
              scrollSnapAlign: 'start',
            }}
          >
            <CompassProductCard
              product={product}
              onSelect={(p) => onProductSelect?.(p.id)}
              onAddToCart={handleAddToCart}
              isSelected={selectedProductIds.includes(product.id)}
              isInCart={isProductInCart(product.id)}
            />
          </div>
        ))}
      </div>
      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default function CompassMessage({
  message,
  onProductSelect,
  onChipClick,
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
    // Thinking complete - compact summary
    if (message.isThinkingComplete) {
      const categoryCount = message.categorySearchProgress?.length || 4;
      const productCount = message.totalProductsReviewed || 800;
      
      return (
        <div className="flex flex-col mb-4 px-6">
          {/* Compact summary pill */}
          <div className="inline-flex items-center gap-2 bg-[#f5f5f5] text-[#757575] px-4 py-2 rounded-full text-xs border border-[#dfe0e1]">
            <svg className="w-3.5 h-3.5 text-[#757575]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium text-[#333333]">
              Reviewed across {categoryCount} categories and {productCount}+ products
            </span>
          </div>
        </div>
      );
    }

    // Thinking state - special rendering
    if (message.isThinking) {
      return (
        <div className="flex flex-col mb-6 px-6">
          {/* Thinking message bubble */}
          <div className="max-w-[85%] bg-[#f5f5f5] text-[#333333] px-4 py-3 rounded-2xl rounded-tl-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
              </svg>
              <p className="text-sm font-medium">{message.content}</p>
            </div>
            {message.thinkingStatus && (
              <p className="text-sm text-[#757575] mb-3">{message.thinkingStatus}</p>
            )}
            {message.categorySearchProgress && message.categorySearchProgress.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-[#757575] mb-2">Searching</p>
                <div className="flex flex-col gap-1">
                  {message.categorySearchProgress.map((progress, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-[#333333]">
                      <svg
                        className={`w-3 h-3 ${progress.isSearching ? 'animate-spin' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                      <span className={progress.count !== undefined ? 'font-medium' : ''}>
                        {progress.category}
                        {progress.count !== undefined && (
                          <span className="text-[#757575] ml-1">({progress.count})</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col mb-6 px-6">
        {/* Assistant message bubble (only show if there's content) */}
        {message.content && (
          <div className="max-w-[85%] bg-[#f5f5f5] text-[#333333] px-4 py-3 rounded-2xl rounded-tl-sm">
            <p className="text-sm whitespace-pre-line">{message.content}</p>
          </div>
        )}

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
            {message.productsByCategory.map((categoryGroup, idx) => <CategoryScrollRow key={idx} categoryGroup={categoryGroup} idx={idx} onProductSelect={onProductSelect} handleAddToCart={handleAddToCart} selectedProductIds={selectedProductIds} isProductInCart={isProductInCart} />)}
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
                onClick={() => onChipClick?.(chip)}
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

