import React, { useState, KeyboardEvent } from 'react';

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
    <div className="border-t border-[#dfe0e1] bg-white p-4">
      <div className="flex items-start gap-2">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 border border-[#757575] rounded-lg resize-none focus:outline-none focus:border-[#333333] text-sm text-[#333333] placeholder:text-[#757575]"
            style={{
              maxHeight: '120px',
              minHeight: '44px',
            }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#333333] text-white hover:bg-[#555555] disabled:bg-[#dfe0e1] disabled:cursor-not-allowed transition-colors flex-shrink-0"
          aria-label="Send message"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

