import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCompass } from '../../contexts/CompassContext';

interface CompassInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function CompassInput({
  onSend,
  placeholder = "Ask Compass anything...",
  disabled = false,
}: CompassInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();
  const { state, setCurrentProduct } = useCompass();
  
  // Only show product context when on PDP
  const isOnPDP = location.pathname === '/pdp';
  const currentProduct = isOnPDP ? state.currentProduct : undefined;

  // Auto-resize textarea to grow with content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight - let it grow naturally
      // Cap at reasonable max (around 5-6 lines)
      const maxHeight = 120; // pixels
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      // Only show scrollbar if content exceeds maxHeight
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [value]);

  const handleRemoveContext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // Just clear the product context
    setCurrentProduct(undefined);
  };

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white px-4 py-3 relative">
      {/* Subtle fade overlaying the chat content above */}
      <div 
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          top: '-24px',
          height: '24px',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
        }}
      />
      {/* Single bordered container with everything inside */}
      <div className="relative border border-[#757575] rounded-lg focus-within:border-[#333333] transition-colors overflow-hidden" style={{ minHeight: '56px' }}>
        <div className="p-3 pr-14 flex flex-col min-h-[56px]">
          {/* Context pill - show only product context when on PDP */}
          {currentProduct && (
            <div className="mb-2 inline-flex items-center gap-2 bg-[#f5f5f5] border border-[#dfe0e1] rounded px-2 py-1.5 w-fit">
              {/* Product image thumbnail */}
              <img 
                src={currentProduct.imageUrl} 
                alt={currentProduct.name}
                className="w-6 h-6 object-cover rounded flex-shrink-0"
              />
              <span className="text-xs text-[#333333] whitespace-nowrap">
                {currentProduct.name}
              </span>
              <button
                onClick={handleRemoveContext}
                className="flex items-center justify-center hover:bg-[#e5e5e5] rounded-full p-0.5 transition-colors flex-shrink-0"
                aria-label="Remove context"
              >
                <svg className="w-3 h-3 text-[#757575]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
          
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentProduct ? "Ask about this product..." : placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none focus:outline-none text-sm text-[#333333] placeholder:text-[#757575] bg-transparent border-0 p-0 overflow-hidden"
            style={{
              minHeight: '20px',
              maxHeight: '120px',
              lineHeight: '20px',
              height: '20px',
            }}
          />
        </div>
        
        {/* Send button positioned inside the container on the right */}
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="absolute right-2 bottom-2 flex items-center justify-center w-7 h-7 rounded-lg bg-[#333333] text-white hover:bg-[#555555] disabled:bg-[#dfe0e1] disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
      <style>{`
        textarea::-webkit-scrollbar {
          width: 4px;
        }
        textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        textarea::-webkit-scrollbar-thumb {
          background: #dfe0e1;
          border-radius: 2px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background: #757575;
        }
      `}</style>
    </div>
  );
}

