import React, { useRef, useEffect } from 'react';
import { useCompass } from '../../contexts/CompassContext';
import { compassProducts, filterProducts } from '../../data/compassProducts';
import CompassMessage from './CompassMessage';
import CompassInput from './CompassInput';

export default function CompassChat() {
  const { state, addMessage, addProductToSelection, removeProductFromSelection } = useCompass();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleSendMessage = (content: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content,
    });

    // Simulate "thinking" delay
    setTimeout(() => {
      handleAssistantResponse(content.toLowerCase());
    }, 800);
  };

  const handleAssistantResponse = (userInput: string) => {
    // Simple scripted conversation flow for the hotel scenario
    
    // Scenario 1: Initial hotel/NYC request
    if (
      (userInput.includes('hotel') || userInput.includes('premium')) &&
      (userInput.includes('nyc') || userInput.includes('new york') || userInput.includes('local'))
    ) {
      const premiumProducts = filterProducts(compassProducts, {
        tags: ['nyc-local', 'premium'],
      }).slice(0, 8); // Show first 8 products

      addMessage({
        role: 'assistant',
        content: "I found premium NYC-local products perfect for hotel amenities. These are handpicked from local artisans and premium brands in the New York area.",
        interpretation: "Sourcing NYC-local brands tagged as 'premium' with hotel-appropriate packaging",
        products: premiumProducts,
        chips: ['Add beverages', 'Show bath products only', 'Filter by tray fit'],
      });
      return;
    }

    // Scenario 2: Add beverages
    if (userInput.includes('beverage') || userInput.includes('drink') || userInput.includes('coffee') || userInput.includes('tea')) {
      const beverages = filterProducts(compassProducts, {
        categories: ['beverage'],
        tags: ['nyc-local', 'premium'],
      });

      addMessage({
        role: 'assistant',
        content: "Here are premium NYC-local beverages that would complement your hotel tray. From Brooklyn cold brew to Hudson Valley teas.",
        interpretation: "Added beverages from local NYC roasters and tea companies",
        products: beverages,
        chips: ['Show snacks too', 'Check brand minimums', 'Filter by tray size'],
      });
      return;
    }

    // Scenario 3: Tray size constraint
    if (userInput.includes('tray') || userInput.includes('fit') || userInput.includes('12') || userInput.includes('24')) {
      const compactProducts = compassProducts.filter(p => 
        p.weight <= 1.5 && 
        p.dimensions.width <= 6 && 
        p.dimensions.height <= 8 &&
        p.tags.includes('nyc-local')
      ).slice(0, 8);

      addMessage({
        role: 'assistant',
        content: "I've filtered for products that fit a 12x24-inch tray. These items are under 1.5 lbs and have compact dimensions perfect for your welcome amenity.",
        interpretation: "Filtering for items ≤1.5 lbs, width ≤6\", height ≤8\" that fit 12x24\" tray layout",
        products: compactProducts,
        chips: ['Show tray visualization', 'Check brand minimums', 'Add to cart'],
      });
      return;
    }

    // Scenario 4: Bath/soap products
    if (userInput.includes('soap') || userInput.includes('bath') || userInput.includes('lotion') || userInput.includes('wellness')) {
      const bathProducts = filterProducts(compassProducts, {
        categories: ['soap'],
        tags: ['nyc-local', 'premium'],
      });

      addMessage({
        role: 'assistant',
        content: "Here are luxury bath and body products from NYC-area artisans. Perfect for a premium hotel experience.",
        interpretation: "Showing soaps and bath products from Hudson Valley and Brooklyn makers",
        products: bathProducts,
        chips: ['Add snacks', 'Show all categories', 'Check minimums'],
      });
      return;
    }

    // Scenario 5: Brand minimums
    if (userInput.includes('minimum') || userInput.includes('order') || userInput.includes('requirement')) {
      const mixedProducts = compassProducts.slice(0, 8);
      
      addMessage({
        role: 'assistant',
        content: "I've grouped products by brand to help you meet minimums. Most NYC artisan brands have $150-$250 minimums, which you can reach with 2-3 items per brand.",
        interpretation: "Organizing by brand minimum requirements: Brooklyn Bites ($200), Hudson Valley Soap Co. ($200), Manhattan Candle Co. ($200)",
        products: mixedProducts,
        chips: ['Suggest products to meet minimums', 'View by brand', 'Add to cart'],
      });
      return;
    }

    // Scenario 6: Snacks
    if (userInput.includes('snack') || userInput.includes('food') || userInput.includes('eat')) {
      const snacks = filterProducts(compassProducts, {
        categories: ['snack'],
        tags: ['nyc-local', 'premium'],
      });

      addMessage({
        role: 'assistant',
        content: "These are artisanal snacks from Brooklyn, Manhattan, and Hudson Valley producers. Perfect for hotel welcome trays.",
        interpretation: "Showing gourmet snacks from NYC-area makers, all shelf-stable and gift-ready",
        products: snacks,
        chips: ['Add beverages', 'Show all products', 'Filter by price'],
      });
      return;
    }

    // Default: Show curated selection
    const defaultProducts = compassProducts.slice(0, 8);
    addMessage({
      role: 'assistant',
      content: "Here's a curated selection of premium NYC-local products. Let me know what you're looking for and I can refine these results.",
      interpretation: "Showing a mix of local NYC products across snacks, beverages, bath products, and accessories",
      products: defaultProducts,
      chips: ['Filter by category', 'Show tray-fit items', 'Check brand minimums'],
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
        {/* Centered welcome content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333333"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8L12 12L8 16L12 12L16 8Z" fill="#333333" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-[#333333] mb-3">
              👋 Welcome to Compass
            </h3>
            
            <p className="text-sm text-[#757575] mb-6">
              I can help you find multiple product types that work together—all in one search.
            </p>

            {/* How it works */}
            <div className="bg-[#f5f5f5] rounded-lg p-4 mb-6 text-left">
              <p className="text-xs font-semibold text-[#333333] mb-3">💡 How it works:</p>
              <div className="space-y-2 text-xs text-[#757575]">
                <div className="flex gap-2">
                  <span className="font-semibold text-[#333333]">1.</span>
                  <span>Tell me what you need (like "NYC snacks for hotels")</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-[#333333]">2.</span>
                  <span>I'll curate products that fit your needs</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-[#333333]">3.</span>
                  <span>Review & add to cart</span>
                </div>
              </div>
            </div>

            {/* Example buttons */}
            <div className="space-y-2 text-left mb-6">
              <p className="text-xs font-medium text-[#333333] mb-2">
                Try these examples:
              </p>
              
              <button
                onClick={() => handleSendMessage("I'm a hotel operator looking for local NYC products for premium welcome trays")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#333333]">
                  Local NYC products for hotel welcome trays
                </p>
              </button>
              
              <button
                onClick={() => handleSendMessage("Show me premium artisanal snacks and beverages")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#333333]">
                  Premium artisanal snacks and beverages
                </p>
              </button>
            </div>

            <p className="text-xs text-[#757575] mb-3">
              Or describe what you need below:
            </p>
          </div>
        </div>

        {/* Input at bottom */}
        <CompassInput onSend={handleSendMessage} />
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
            selectedProductIds={state.selectedProducts.map(p => p.id)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input at bottom */}
      <CompassInput onSend={handleSendMessage} />
    </div>
  );
}

