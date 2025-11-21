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
  selectedProductIds,
}: {
  categoryGroup: { category: string; products: CompassProduct[] };
  idx: number;
  onProductSelect?: (productId: string) => void;
  selectedProductIds: string[];
}) {
  const navigate = useNavigate();
  const { setPairedProducts } = useCompass();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleSeeAll = () => {
    // If this is "Paired Products", ensure the products are stored in context
    if (categoryGroup.category === 'Paired Products' && categoryGroup.products.length > 0) {
      setPairedProducts(categoryGroup.products);
    }
    
    // Navigate to category page without closing Compass panel
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
      className={`animate-fadeInUp relative pb-4 ${idx > 0 ? 'pt-4 border-t border-[#dfe0e1]' : ''}`}
      style={{
        animationDelay: `${idx * 400}ms`,
        opacity: 0,
        animationFillMode: 'forwards'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-[#333333]">
            {categoryGroup.category}
          </h4>
          {/* See all link */}
          <button
            type="button"
            onClick={handleSeeAll}
            className="text-xs text-[#333333] hover:text-[#757575] hover:underline transition-colors"
          >
            See all
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-6 h-6 rounded-full border border-[#dfe0e1] bg-white flex items-center justify-center transition-colors hover:bg-[#333333] hover:text-white hover:border-[#333333] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#333333] disabled:hover:border-[#dfe0e1]"
            aria-label="Scroll left"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m17 2-9.767 9.455A.77.77 0 0 0 7 12a.75.75 0 0 0 .233.545L17 22" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-6 h-6 rounded-full border border-[#dfe0e1] bg-white flex items-center justify-center transition-colors hover:bg-[#333333] hover:text-white hover:border-[#333333] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#333333] disabled:hover:border-[#dfe0e1]"
            aria-label="Scroll right"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m7 2 9.767 9.455A.77.77 0 0 1 17 12a.75.75 0 0 1-.233.545L7 22" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative -mr-6">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto pb-2 pr-6"
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
                width: '110px',
                scrollSnapAlign: 'start',
              }}
            >
              <CompassProductCard
                product={product}
                onSelect={(p) => onProductSelect?.(p.id)}
                isSelected={selectedProductIds.includes(product.id)}
              />
            </div>
          ))}
        </div>
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
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 px-6">
        <div className="max-w-[80%] bg-[#333333] text-white px-4 py-3 rounded-2xl rounded-tr-sm">
          {/* Show product context if available */}
          {message.productContext && (
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20">
              <img 
                src={message.productContext.imageUrl} 
                alt={message.productContext.name}
                className="w-6 h-6 object-cover rounded"
              />
              <span className="text-xs text-white/90 truncate">
                {message.productContext.name}
              </span>
            </div>
          )}
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  if (isAssistant) {
    // Thinking/Working state
    if (message.isThinking) {
      return (
        <div className="flex flex-col mb-6 px-6">
          {/* Working container */}
          <div className="max-w-[85%] text-[#333333] px-4 py-3 rounded border border-[#dfe0e1]">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
              </svg>
              <p className="text-sm">{message.content}</p>
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
                            className="w-3 h-3"
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

    // Thinking complete - compact summary
    if (message.isThinkingComplete) {
      const categoryCount = message.categorySearchProgress?.length || 4;
      const productCount = message.totalProductsReviewed || 800;
      const isSingleCategory = message.isCategorySpecific;
      const categoryName = message.specificCategoryName;
      
      // Format product count (e.g., 1010 -> "1k+", 500 -> "500+")
      const formatProductCount = (count: number) => {
        if (count >= 1000) {
          const k = Math.floor(count / 1000);
          return `${k}k+`;
        }
        return `${count}+`;
      };
      
      return (
        <div className="flex flex-col mb-4 px-6">
          {/* Compact summary - plain text with chevron */}
          <div className="inline-flex items-center gap-1 text-sm text-[#757575]">
            <span>
              {isSingleCategory && categoryName
                ? `Reviewed ${formatProductCount(productCount)} products in ${categoryName}`
                : `Reviewed ${categoryCount} categories, ${formatProductCount(productCount)} products`
              }
            </span>
            <svg className="w-3.5 h-3.5 text-[#757575] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col mb-6 px-6" style={{ width: '100%' }}>
        {/* Assistant message bubble (only show if there's content) */}
        {message.content && (
          <div className="bg-[#f5f5f5] text-[#333333] px-4 py-3 rounded-2xl rounded-tl-sm border border-[#dfe0e1]" style={{ width: '100%' }}>
            <p className="text-sm whitespace-pre-line">{message.content}</p>
            
            {/* Suggestion chips inside the bubble (if present) */}
            {message.chips && message.chips.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.chips.map((chip, index) => (
                  <button
                    key={index}
                    onClick={() => onChipClick?.(chip)}
                    className="px-3 py-1.5 text-xs text-[#333333] bg-[#f5f5f5] border border-[#dfe0e1] rounded-full hover:bg-white hover:border-[#333333] transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
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
          <div className="mt-4" style={{ width: '100%' }}>
            {message.productsByCategory.map((categoryGroup, idx) => <CategoryScrollRow key={`cat-${categoryGroup.category}-${idx}`} categoryGroup={categoryGroup} idx={idx} onProductSelect={onProductSelect} selectedProductIds={selectedProductIds} />)}
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
                isSelected={selectedProductIds.includes(product.id)}
              />
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

