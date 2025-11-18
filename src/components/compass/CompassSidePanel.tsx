import React from 'react';
import { useCompass } from '../../contexts/CompassContext';
import CompassChat from './CompassChat';
import CompassCartSummary from './CompassCartSummary';

export default function CompassSidePanel() {
  const { state, closePanel } = useCompass();

  return (
    <>
      {/* Side Panel */}
      <div
        className="fixed top-0 right-0 h-full bg-white z-[500] flex flex-col border-l border-[#dfe0e1]"
        style={{
          width: '480px',
          maxWidth: '100vw',
          transform: state.isPanelOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: state.isPanelOpen ? 'auto' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            {/* Compass icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#333333"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M16 8L12 12L8 16L12 12L16 8Z" 
                fill="#333333" 
                stroke="#333333"
                strokeWidth="1"
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
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

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto">
          <CompassChat />
        </div>

        {/* Cart Summary - sticky above input */}
        <CompassCartSummary />
      </div>

      {/* Mobile: Full screen on small devices */}
      <style>{`
        @media (max-width: 767px) {
          .fixed.right-0.h-full.bg-white {
            width: 100vw !important;
          }
          .compass-content-wrapper {
            margin-right: 0 !important;
          }
        }
      `}</style>
    </>
  );
}

