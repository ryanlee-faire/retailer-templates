import React, { useState } from 'react';
import { useCompass } from '../../contexts/CompassContext';

interface CompassDrawerProps {
  position?: 'left' | 'right';
}

export default function CompassDrawer({ position = 'right' }: CompassDrawerProps) {
  const { state, closePanel } = useCompass();
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Handle sending the message
      console.log('Sending:', inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!state.isPanelOpen) {
    return null;
  }

  const borderClass = position === 'left' ? 'border-r' : 'border-l';

  return (
    <div className={`h-full bg-white flex flex-col ${borderClass} border-[#dfe0e1]`} style={{ height: "100vh" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#dfe0e1]">
        <div className="flex items-center gap-2">
          {/* Compass icon */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9.5" stroke="#333333"/>
            <path d="M10.2563 15.5144L9.66315 10.7711L9.61482 10.3858L9.22881 10.3367L4.48691 9.74357L14.1026 5.8966L10.2563 15.5144Z" stroke="#333333"/>
          </svg>
          <h2 className="text-lg font-semibold text-[#333333]">Compass</h2>
        </div>
        
        {/* Close button */}
        <button
          onClick={closePanel}
          className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
          aria-label="Close Compass"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Brand Summary */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-[#333333] mb-2">Brand summary</h3>
          <p className="text-sm text-[#333333] leading-relaxed">
            Given your design background and recent home improvement projects, you'd likely appreciate Areaware's balance of artistic expression and practical functionality.
          </p>
        </div>

        {/* Personalized Collections */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-[#333333] mb-3">Personalized collections</h3>
          <div className="space-y-3">
            <div className="h-24 border border-[#dfe0e1] rounded bg-white flex items-center justify-center">
              <span className="text-sm text-[#757575]">Collection 01</span>
            </div>
            <div className="h-24 border border-[#dfe0e1] rounded bg-white flex items-center justify-center">
              <span className="text-sm text-[#757575]">Collection 02</span>
            </div>
            <div className="h-24 border border-[#dfe0e1] rounded bg-white flex items-center justify-center">
              <span className="text-sm text-[#757575]">Collection 03</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area - Sticky at bottom */}
      <div className="border-t border-[#dfe0e1] bg-white p-6">
        {/* Text Input */}
        <div className="relative mb-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write anything here."
            rows={4}
            className="w-full px-4 py-3 border border-[#dfe0e1] rounded-lg resize-none focus:outline-none focus:border-[#333333] text-sm text-[#333333] placeholder:text-[#757575]"
            style={{
              minHeight: '120px',
            }}
          />
          {/* Plus icon on left */}
          <div className="absolute left-4 top-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-[#757575]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          {/* Upward arrow icon on right */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="absolute right-4 bottom-3 flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <svg
              className="w-5 h-5 text-[#333333]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8l-6-6-6 6M12 2v20" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

