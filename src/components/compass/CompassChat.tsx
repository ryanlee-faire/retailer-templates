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
                width="22"
                height="22"
                viewBox="0 0 28 25"
                fill="none"
              >
                <path
                  d="M15.5 9.5L15.9642 9.6857L16.3975 8.60247L15.3143 9.03576L15.5 9.5ZM3 14.5L2.8143 14.0358L2.93798 14.9961L3 14.5ZM9.66667 15.3333L10.1628 15.2713L10.1146 14.8854L9.72868 14.8372L9.66667 15.3333ZM10.5 22L10.0039 22.062L10.9642 22.1857L10.5 22ZM22 0.5C22 0.223858 21.7761 0 21.5 0C21.2239 0 21 0.223858 21 0.5H21.5H22ZM25.5 5C25.7761 5 26 4.77614 26 4.5C26 4.22386 25.7761 4 25.5 4V4.5V5ZM21.5 8.5H21C21 8.77172 21.217 8.9937 21.4886 8.99987C21.7603 9.00604 21.9871 8.79414 21.9995 8.5227L21.5 8.5ZM17.5 4C17.2239 4 17 4.22386 17 4.5C17 4.77614 17.2239 5 17.5 5V4.5V4ZM26 10.5C26 10.2239 25.7761 10 25.5 10C25.2239 10 25 10.2239 25 10.5H25.5H26ZM27.5 13C27.7761 13 28 12.7761 28 12.5C28 12.2239 27.7761 12 27.5 12V12.5V13ZM25.5 14.5H25C25 14.7717 25.217 14.9937 25.4886 14.9999C25.7603 15.006 25.9871 14.7941 25.9995 14.5227L25.5 14.5ZM23.5 12C23.2239 12 23 12.2239 23 12.5C23 12.7761 23.2239 13 23.5 13V12.5V12ZM20.5 14.5H20C20 19.7467 15.7467 24 10.5 24V24.5V25C16.299 25 21 20.299 21 14.5H20.5ZM10.5 24.5V24C5.25329 24 1 19.7467 1 14.5H0.5H0C0 20.299 4.70101 25 10.5 25V24.5ZM0.5 14.5H1C1 9.25329 5.25329 5 10.5 5V4.5V4C4.70101 4 0 8.70101 0 14.5H0.5ZM10.5 4.5V5C15.7467 5 20 9.25329 20 14.5H20.5H21C21 8.70101 16.299 4 10.5 4V4.5ZM15.5 9.5L15.3143 9.03576L2.8143 14.0358L3 14.5L3.1857 14.9642L15.6857 9.96424L15.5 9.5ZM3 14.5L2.93798 14.9961L9.60465 15.8295L9.66667 15.3333L9.72868 14.8372L3.06202 14.0039L3 14.5ZM9.66667 15.3333L9.17053 15.3954L10.0039 22.062L10.5 22L10.9961 21.938L10.1628 15.2713L9.66667 15.3333ZM10.5 22L10.9642 22.1857L15.9642 9.6857L15.5 9.5L15.0358 9.3143L10.0358 21.8143L10.5 22ZM21.5 0.5H21C21 1.85977 21.3081 3.00935 22.0799 3.8162C22.8557 4.62733 24.0113 5 25.5 5V4.5V4C24.1651 4 23.3208 3.66679 22.8025 3.12498C22.2802 2.57889 22 1.72846 22 0.5H21.5ZM25.5 4.5V4C24.1156 4 22.9989 4.37954 22.2161 5.17976C21.4388 5.97438 21.0626 7.1107 21.0005 8.4773L21.5 8.5L21.9995 8.5227C22.055 7.30106 22.3848 6.43739 22.9309 5.87906C23.4716 5.32634 24.2961 5 25.5 5V4.5ZM21.5 8.5H22C22 7.19357 21.6894 6.0496 20.9238 5.23182C20.1525 4.40789 18.9995 4 17.5 4V4.5V5C18.824 5 19.671 5.35682 20.1938 5.91524C20.7223 6.47981 21 7.33584 21 8.5H21.5ZM17.5 4.5V5C18.8598 5 20.0093 4.69192 20.8162 3.92014C21.6273 3.14428 22 1.98867 22 0.5H21.5H21C21 1.83486 20.6668 2.67925 20.125 3.1975C19.5789 3.71985 18.7285 4 17.5 4V4.5ZM25.5 10.5H25C25 11.2127 25.161 11.8623 25.6093 12.3309C26.0616 12.8038 26.7172 13 27.5 13V12.5V12C26.871 12 26.5266 11.8433 26.3319 11.6397C26.1331 11.4318 26 11.0814 26 10.5H25.5ZM27.5 12.5V12C26.7627 12 26.1313 12.2031 25.6793 12.6651C25.2329 13.1214 25.0332 13.7578 25.0005 14.4773L25.5 14.5L25.9995 14.5227C26.0256 13.9481 26.1789 13.5844 26.3942 13.3644C26.604 13.1499 26.9432 13 27.5 13V12.5ZM25.5 14.5H26C26 13.8112 25.8365 13.1672 25.3944 12.6951C24.9466 12.2167 24.2937 12 23.5 12V12.5V13C24.1181 13 24.4652 13.1656 24.6644 13.3785C24.8694 13.5975 25 13.9535 25 14.5H25.5ZM23.5 12.5V13C24.2127 13 24.8623 12.839 25.3309 12.3907C25.8038 11.9384 26 11.2828 26 10.5H25.5H25C25 11.129 24.8433 11.4734 24.6397 11.6681C24.4318 11.8669 24.0814 12 23.5 12V12.5Z"
                  fill="#333333"
                />
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

