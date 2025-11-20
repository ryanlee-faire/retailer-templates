import React, { useRef, useEffect, useState } from 'react';
import { useCompass } from '../../contexts/CompassContext';
import { compassProducts, filterProducts } from '../../data/compassProducts';
import {
  parseRefinementRequest,
  generateConfirmationMessage,
  applyRefinementActions,
  FilterState,
} from '../../utils/conversationPatternMatcher';
import CompassMessage from './CompassMessage';
import CompassInput from './CompassInput';

export default function CompassChat() {
  const { state, addMessage, updateMessage, addProductToSelection, removeProductFromSelection, clearInitialQuery } = useCompass();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const thinkingMessageIdRef = useRef<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    categories: { Snacks: 3, Beverages: 3, 'Bath Products': 3 },
    includeTags: ['nyc-local', 'premium'],
    excludeTags: [],
  });

  // Removed auto-scroll to avoid jarring experience when opening Compass

  // Auto-submit query when opened from search
  useEffect(() => {
    if (state.entryPoint === 'search' &&
        state.initialQuery &&
        state.messages.length === 0) {
      // Auto-submit the query
      handleSendMessage(state.initialQuery);
      // Clear the initial query after submitting
      clearInitialQuery();
    }
  }, [state.entryPoint, state.initialQuery, state.messages.length]);

  const handleSendMessage = (content: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content,
    });

    // Small delay then show thinking indicator
    setTimeout(() => {
      setIsThinking(true);
    }, 300);

    // Simulate "thinking" delay before response
    setTimeout(() => {
      setIsThinking(false);
      handleAssistantResponse(content.toLowerCase());
    }, 1500);
  };

  const handleAssistantResponse = (userInput: string) => {
    // Check if this is a refinement request (conversation already started)
    const isRefinementRequest = state.messages.length > 0;

    if (isRefinementRequest) {
      // Parse refinement patterns
      const actions = parseRefinementRequest(userInput);

      // If it's a refinement action, apply filters and show updated results
      if (actions.length > 0 && actions[0].type !== 'unknown') {
        const newFilters = applyRefinementActions(actions, currentFilters);
        setCurrentFilters(newFilters);

        // Generate confirmation message
        const confirmation = generateConfirmationMessage(actions);

        // Add confirmation message
        addMessage({
          role: 'assistant',
          content: confirmation,
        });

        // Show updated results after confirmation
        setTimeout(() => {
          showFilteredResults(newFilters);
        }, 800);

        return;
      }
    }

    // Show "thinking" state first with initial progress
    const thinkingMessage = {
      role: 'assistant' as const,
      content: 'Working...',
      isThinking: true,
      thinkingStatus: `Searching for products that fit "${userInput}" across multiple categories`,
      categorySearchProgress: [],
    };
    const addedMessage = addMessage(thinkingMessage);
    thinkingMessageIdRef.current = addedMessage.id;

    // Animate through categories progressively - ONE AT A TIME
    const categories = ['Snacks', 'Beverages', 'Bath Products', 'Accessories'];
    const counts = [420, 267, 134, 189]; // Simulated search result counts

    categories.forEach((category, index) => {
      // First, show the category appearing with searching state
      setTimeout(() => {
        if (thinkingMessageIdRef.current) {
          // Build progress array showing only categories up to current index
          const progress = categories.slice(0, index + 1).map((cat, i) => ({
            category: cat,
            count: i < index ? counts[i] : undefined, // Previous categories have counts
            isSearching: i === index, // Current category is searching
          }));

          updateMessage(thinkingMessageIdRef.current, {
            categorySearchProgress: progress,
          });
        }

        // After a short delay, show the count for this category
        setTimeout(() => {
          if (thinkingMessageIdRef.current) {
            // Update to show the count
            const progress = categories.slice(0, index + 1).map((cat, i) => ({
              category: cat,
              count: counts[i], // Now all visible categories have counts
              isSearching: false,
            }));

            updateMessage(thinkingMessageIdRef.current, {
              categorySearchProgress: progress,
            });
          }
        }, 400);
      }, index * 700);
    });

    // After all categories are searched, collapse the thinking message and show results
    setTimeout(() => {
      // Mark thinking message as complete with compact summary
      if (thinkingMessageIdRef.current) {
        const totalProducts = counts.reduce((sum, count) => sum + count, 0);
        updateMessage(thinkingMessageIdRef.current, {
          isThinking: false,
          isThinkingComplete: true,
          totalProductsReviewed: totalProducts,
        });
      }

      // Get products by category using current filters
      const snacks = filterProducts(compassProducts, {
        categories: ['snack'],
        tags: currentFilters.includeTags,
      }).slice(0, currentFilters.categories['Snacks'] || 3);

      const beverages = filterProducts(compassProducts, {
        categories: ['beverage'],
        tags: currentFilters.includeTags,
      }).slice(0, currentFilters.categories['Beverages'] || 3);

      const soaps = filterProducts(compassProducts, {
        categories: ['soap'],
        tags: currentFilters.includeTags,
      }).slice(0, currentFilters.categories['Bath Products'] || 3);

      addMessage({
        role: 'assistant',
        content: `Based on your search, I've found a handful of items that might be a great fit. Feel free to take a look or refine your search by telling me more about what you had in mind.`,
        productsByCategory: [
          { category: 'Food Items', products: snacks },
          { category: 'Beverages', products: beverages },
          { category: 'Bath Products', products: soaps },
        ],
      });
    }, categories.length * 700 + 800); // Wait for all animations (700ms per category + 400ms for last count + buffer)

    // Add follow-up chips after products have been revealed
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: "",
        chips: ['Show more snacks', 'No plastic', 'Local brands only'],
      });
    }, categories.length * 700 + 3300); // Wait for animations + products to appear
  };

  const showFilteredResults = (filters: FilterState) => {
    // Get filtered products by category
    const snacks = filterProducts(compassProducts, {
      categories: ['snack'],
      tags: filters.includeTags,
    })
      .filter((p) => !filters.excludeTags.some((tag) => p.tags.includes(tag)))
      .slice(0, filters.categories['Snacks'] || 3);

    const beverages = filterProducts(compassProducts, {
      categories: ['beverage'],
      tags: filters.includeTags,
    })
      .filter((p) => !filters.excludeTags.some((tag) => p.tags.includes(tag)))
      .slice(0, filters.categories['Beverages'] || 3);

    const soaps = filterProducts(compassProducts, {
      categories: ['soap'],
      tags: filters.includeTags,
    })
      .filter((p) => !filters.excludeTags.some((tag) => p.tags.includes(tag)))
      .slice(0, filters.categories['Bath Products'] || 3);

    const results = [];
    if (snacks.length > 0) results.push({ category: 'Food Items', products: snacks });
    if (beverages.length > 0) results.push({ category: 'Beverages', products: beverages });
    if (soaps.length > 0) results.push({ category: 'Bath Products', products: soaps });

    addMessage({
      role: 'assistant',
      content: `Here are your updated results.`,
      productsByCategory: results,
    });
  };

  const handleProductSelect = (productId: string) => {
    const product = compassProducts.find(p => p.id === productId);
    if (!product) return;

    const isAlreadySelected = state.selectedProducts.some(p => p.id === productId);
    
    if (isAlreadySelected) {
      removeProductFromSelection(productId);
    } else {
      addProductToSelection(product);
    }
  };

  // Onboarding state (no messages yet)
  if (state.messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        {/* Left-aligned welcome content */}
        <div className="flex-1 flex flex-col justify-end px-8 pb-6">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 text-left flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8L12 12L8 16L12 12L16 8Z" fill="#333333" />
              </svg>
              Welcome to Compass
            </h3>
            
            <p className="text-sm text-[#757575] mb-6 text-left">
              I can help you find multiple products that work together—all in one search.
            </p>

            <p className="text-sm text-[#333333] mb-4 text-left">
              For example, you can say:
            </p>

            {/* Example buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSendMessage("I'm looking for wellness & spa items")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#757575] mb-2">
                  "I'm looking for wellness & spa items" — then Compass will search across:
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">bath products</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">candles</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">hand towels</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSendMessage("I'm looking for food & entertaining")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#757575] mb-2">
                  "I'm looking for food & entertaining" — then Compass will search across:
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">snacks</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">beverages</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">napkins</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSendMessage("I'm looking for home & living items")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#757575] mb-2">
                  "I'm looking for home & living items" — then Compass will search across:
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">home decor</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">throw pillows</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">accessories</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Input at bottom */}
        <CompassInput onSend={handleSendMessage} placeholder="What are you looking for?" />
      </div>
    );
  }

  // Conversation view (with messages)
  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6">
        {state.messages.map((message) => (
          <CompassMessage
            key={message.id}
            message={message}
            onProductSelect={handleProductSelect}
            onChipClick={handleSendMessage}
            selectedProductIds={state.selectedProducts.map(p => p.id)}
          />
        ))}
        
        {/* Thinking indicator */}
        {isThinking && (
          <div className="flex mb-6 px-6">
            <div className="max-w-[85%] bg-[#f5f5f5] text-[#333333] px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#757575] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-[#757575] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-[#757575] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-sm text-[#757575]">Compass is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input at bottom */}
      <CompassInput onSend={handleSendMessage} disabled={isThinking} />
    </div>
  );
}

