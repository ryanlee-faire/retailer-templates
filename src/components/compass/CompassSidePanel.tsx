import React from 'react';
import { useCompass } from '../../contexts/CompassContext';
import CompassChat from './CompassChat';
import CompassCartSummary from './CompassCartSummary';

export default function CompassSidePanel() {
  const { state, closePanel, clearMessages } = useCompass();
  const [isPanelFocused, setIsPanelFocused] = React.useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = React.useState(false);

  // Auto-generate conversation title from first user message
  const getConversationTitle = () => {
    const firstUserMessage = state.messages.find(m => m.role === 'user');
    if (firstUserMessage) {
      // Truncate to 20 characters
      const content = firstUserMessage.content;
      if (content.length > 20) {
        return content.substring(0, 20) + '...';
      }
      return content;
    }
    return 'New Compass chat';
  };

  const conversationTitle = getConversationTitle();

  // Mock conversation history (non-functional, just for visual)
  const mockHistory = [
    'NYC hotel room gifts for guests',
    'Wellness & spa items for boutique',
    'Food & entertaining products',
    'Home & living items',
  ];

  // Lock/unlock body scroll based on panel focus
  React.useEffect(() => {
    if (state.isPanelOpen && isPanelFocused) {
      // Panel is focused - prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Panel not focused or closed - allow body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isPanelOpen, isPanelFocused]);

  // Detect clicks outside panel to unfocus it
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const panel = document.querySelector('[data-compass-panel]');
      if (panel && !panel.contains(target)) {
        setIsPanelFocused(false);
      }
    };

    if (state.isPanelOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [state.isPanelOpen]);

  return (
    <>
      {/* Side Panel */}
      <div
        data-compass-panel
        className="fixed top-0 right-0 h-full bg-white z-[500] flex flex-col border-l border-[#dfe0e1]"
        style={{
          width: '385px',
          maxWidth: '100vw',
          transform: state.isPanelOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: state.isPanelOpen ? 'auto' : 'none',
          overscrollBehavior: 'contain',
        }}
        onClick={() => setIsPanelFocused(true)}
      >
        {/* Header */}
        <div className="flex flex-col border-b border-[#dfe0e1]">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-[#333333] leading-none">Compass</h2>
            
            <div className="flex items-center gap-1 leading-none">
              {/* Conversation title dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
                  className="flex items-center gap-1 text-xs text-[#757575] hover:text-[#333333] transition-colors leading-none px-2 py-1.5 rounded hover:bg-gray-100"
                >
                  <span className="truncate leading-none">{conversationTitle}</span>
                  <svg
                    className={`w-3 h-3 text-[#757575] flex-shrink-0 transition-transform ${showHistoryDropdown ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* History dropdown (non-functional mockup) */}
                {showHistoryDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-[#dfe0e1] rounded shadow-lg z-10" style={{ minWidth: '280px' }}>
                    <div className="py-2">
                      <p className="px-3 py-1 text-xs text-[#757575] font-medium">Recent searches</p>
                      {mockHistory.map((title, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 text-sm text-[#333333] hover:bg-[#f5f5f5] transition-colors"
                          onClick={() => setShowHistoryDropdown(false)}
                        >
                          {title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* New conversation button */}
              <button
                onClick={clearMessages}
                className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                aria-label="New conversation"
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </button>
              
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
          </div>
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
