import React, { useRef, useEffect, useState } from 'react';
import { useCompass } from '../../contexts/CompassContext';
import { compassProducts, filterProducts } from '../../data/compassProducts';
import CompassMessage from './CompassMessage';
import CompassInput from './CompassInput';

export default function CompassChat() {
  const { state, addMessage, addProductToSelection, removeProductFromSelection } = useCompass();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    // Delay scroll slightly to allow content to render
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [state.messages.length]);

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
    // For prototype: Always show categorized hotel products response
    
    // Get products by category
    const snacks = filterProducts(compassProducts, {
      categories: ['snack'],
      tags: ['nyc-local', 'premium'],
    }).slice(0, 3);

    const beverages = filterProducts(compassProducts, {
      categories: ['beverage'],
      tags: ['nyc-local', 'premium'],
    }).slice(0, 3);

    const soaps = filterProducts(compassProducts, {
      categories: ['soap'],
      tags: ['nyc-local', 'premium'],
    }).slice(0, 3);

    addMessage({
      role: 'assistant',
      content: "I found a curated selection of NYC-local products perfect for your hotel rooms. I've organized them by category—food items, beverages, and bath products.",
      interpretation: "Sourcing NYC-local brands across food, beverages, and soaps with premium packaging suitable for in-room amenities",
      productsByCategory: [
        { category: 'Food Items', products: snacks },
        { category: 'Beverages', products: beverages },
        { category: 'Bath Products', products: soaps },
      ],
    });

    // Add follow-up message after products have been revealed (after all 3 categories animate in)
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: "What do you think? Is there anything you'd like me to adjust?",
        chips: ['Adjust selection', 'Check brand minimums', 'Filter by tray size'],
      });
    }, 2000); // Wait for all categories to appear (3 categories * 400ms + buffer)
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
            
            <p className="text-sm text-[#757575] mb-8 text-left">
              I can help you find multiple products that work together—all in one search.
            </p>

            {/* Example buttons */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-[#333333] mb-3">
                What would you like to look for first?
              </p>
              
              <button
                onClick={() => handleSendMessage("Find me snacks, beverages, and napkins")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-xs text-[#757575] mb-2">Food & entertaining:</p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">snacks</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">beverages</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">napkins</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSendMessage("Show me bath products, candles, and hand towels")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-xs text-[#757575] mb-2">Wellness & spa:</p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">bath products</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">candles</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">hand towels</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSendMessage("I need home decor, throw pillows, and small accessories")}
                className="w-full text-left px-4 py-3 bg-white border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-xs text-[#757575] mb-2">Home & living:</p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">home decor</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">throw pillows</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 bg-[#f5f5f5] text-[#333333] rounded">accessories</span>
                </div>
              </button>
            </div>

            <p className="text-xs text-[#757575] mb-3 text-left">
              Or describe what you need:
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

