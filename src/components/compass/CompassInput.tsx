import React, { useState, KeyboardEvent } from 'react';
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
  const { state, setCurrentProduct } = useCompass();
  const currentProduct = state.currentProduct;

  const handleRemoveContext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentProduct(undefined);
  };

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
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
      <div className="relative border border-[#757575] rounded-lg focus-within:border-[#333333] transition-colors" style={{ minHeight: currentProduct ? '130px' : '80px' }}>
        <div className="p-3 pr-14">
          {/* Context pill with image preview */}
          {currentProduct && (
            <div className="mb-2 inline-flex items-center gap-2 bg-[#f5f5f5] border border-[#dfe0e1] rounded px-2 py-1.5">
              {/* Product image thumbnail */}
              <img 
                src={currentProduct.imageUrl} 
                alt={currentProduct.name}
                className="w-6 h-6 object-cover rounded"
              />
              <span className="text-xs text-[#333333] truncate max-w-[180px]">
                {currentProduct.name}
              </span>
              <button
                onClick={handleRemoveContext}
                className="ml-1 flex items-center justify-center hover:bg-[#e5e5e5] rounded-full p-0.5 transition-colors"
                aria-label="Remove context"
              >
                <svg className="w-3 h-3 text-[#757575]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
          
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentProduct ? "Ask about this product..." : placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none focus:outline-none text-sm text-[#333333] placeholder:text-[#757575] bg-transparent border-0 p-0"
            style={{
              maxHeight: '120px',
              minHeight: '20px',
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
    </div>
  );
}

