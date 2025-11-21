import React from 'react';
import { useCompass } from '../../contexts/CompassContext';
import CompassChat from './CompassChat';

// Compass Icon component
function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      width="25"
      height="25"
      viewBox="0 0 28 25"
      aria-labelledby="titleAccess-compass"
      role="img"
      style={{ color: "#333333", fontSize: "25px" }}
    >
      <path
        d="M15.5 9.5L15.9642 9.6857L16.3975 8.60247L15.3143 9.03576L15.5 9.5ZM3 14.5L2.8143 14.0358L2.93798 14.9961L3 14.5ZM9.66667 15.3333L10.1628 15.2713L10.1146 14.8854L9.72868 14.8372L9.66667 15.3333ZM10.5 22L10.0039 22.062L10.9642 22.1857L10.5 22ZM22 0.5C22 0.223858 21.7761 0 21.5 0C21.2239 0 21 0.223858 21 0.5H21.5H22ZM25.5 5C25.7761 5 26 4.77614 26 4.5C26 4.22386 25.7761 4 25.5 4V4.5V5ZM21.5 8.5H21C21 8.77172 21.217 8.9937 21.4886 8.99987C21.7603 9.00604 21.9871 8.79414 21.9995 8.5227L21.5 8.5ZM17.5 4C17.2239 4 17 4.22386 17 4.5C17 4.77614 17.2239 5 17.5 5V4.5V4ZM26 10.5C26 10.2239 25.7761 10 25.5 10C25.2239 10 25 10.2239 25 10.5H25.5H26ZM27.5 13C27.7761 13 28 12.7761 28 12.5C28 12.2239 27.7761 12 27.5 12V12.5V13ZM25.5 14.5H25C25 14.7717 25.217 14.9937 25.4886 14.9999C25.7603 15.006 25.9871 14.7941 25.9995 14.5227L25.5 14.5ZM23.5 12C23.2239 12 23 12.2239 23 12.5C23 12.7761 23.2239 13 23.5 13V12.5V12ZM20.5 14.5H20C20 19.7467 15.7467 24 10.5 24V24.5V25C16.299 25 21 20.299 21 14.5H20.5ZM10.5 24.5V24C5.25329 24 1 19.7467 1 14.5H0.5H0C0 20.299 4.70101 25 10.5 25V24.5ZM0.5 14.5H1C1 9.25329 5.25329 5 10.5 5V4.5V4C4.70101 4 0 8.70101 0 14.5H0.5ZM10.5 4.5V5C15.7467 5 20 9.25329 20 14.5H20.5H21C21 8.70101 16.299 4 10.5 4V4.5ZM15.5 9.5L15.3143 9.03576L2.8143 14.0358L3 14.5L3.1857 14.9642L15.6857 9.96424L15.5 9.5ZM3 14.5L2.93798 14.9961L9.60465 15.8295L9.66667 15.3333L9.72868 14.8372L3.06202 14.0039L3 14.5ZM9.66667 15.3333L9.17053 15.3954L10.0039 22.062L10.5 22L10.9961 21.938L10.1628 15.2713L9.66667 15.3333ZM10.5 22L10.9642 22.1857L15.9642 9.6857L15.5 9.5L15.0358 9.3143L10.0358 21.8143L10.5 22ZM21.5 0.5H21C21 1.85977 21.3081 3.00935 22.0799 3.8162C22.8557 4.62733 24.0113 5 25.5 5V4.5V4C24.1651 4 23.3208 3.66679 22.8025 3.12498C22.2802 2.57889 22 1.72846 22 0.5H21.5ZM25.5 4.5V4C24.1156 4 22.9989 4.37954 22.2161 5.17976C21.4388 5.97438 21.0626 7.1107 21.0005 8.4773L21.5 8.5L21.9995 8.5227C22.055 7.30106 22.3848 6.43739 22.9309 5.87906C23.4716 5.32634 24.2961 5 25.5 5V4.5ZM21.5 8.5H22C22 7.19357 21.6894 6.0496 20.9238 5.23182C20.1525 4.40789 18.9995 4 17.5 4V4.5V5C18.824 5 19.671 5.35682 20.1938 5.91524C20.7223 6.47981 21 7.33584 21 8.5H21.5ZM17.5 4.5V5C18.8598 5 20.0093 4.69192 20.8162 3.92014C21.6273 3.14428 22 1.98867 22 0.5H21.5H21C21 1.83486 20.6668 2.67925 20.125 3.1975C19.5789 3.71985 18.7285 4 17.5 4V4.5ZM25.5 10.5H25C25 11.2127 25.161 11.8623 25.6093 12.3309C26.0616 12.8038 26.7172 13 27.5 13V12.5V12C26.871 12 26.5266 11.8433 26.3319 11.6397C26.1331 11.4318 26 11.0814 26 10.5H25.5ZM27.5 12.5V12C26.7627 12 26.1313 12.2031 25.6793 12.6651C25.2329 13.1214 25.0332 13.7578 25.0005 14.4773L25.5 14.5L25.9995 14.5227C26.0256 13.9481 26.1789 13.5844 26.3942 13.3644C26.604 13.1499 26.9432 13 27.5 13V12.5ZM25.5 14.5H26C26 13.8112 25.8365 13.1672 25.3944 12.6951C24.9466 12.2167 24.2937 12 23.5 12V12.5V13C24.1181 13 24.4652 13.1656 24.6644 13.3785C24.8694 13.5975 25 13.9535 25 14.5H25.5ZM23.5 12.5V13C24.2127 13 24.8623 12.839 25.3309 12.3907C25.8038 11.9384 26 11.2828 26 10.5H25.5H25C25 11.129 24.8433 11.4734 24.6397 11.6681C24.4318 11.8669 24.0814 12 23.5 12V12.5Z"
        fill="#333333"
      />
      <title id="titleAccess-compass">Compass</title>
    </svg>
  );
}

export default function CompassSidePanel() {
  const { state, closePanel, clearMessages } = useCompass();
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

  return (
    <>
      {/* Side Panel */}
      <div
        data-compass-panel
        className="fixed top-0 right-0 h-full z-[500] flex flex-col border-l border-[#dfe0e1]"
        style={{
          width: '385px',
          maxWidth: '100vw',
          backgroundColor: '#f7f7f7',
          transform: state.isPanelOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: state.isPanelOpen ? 'auto' : 'none',
          overscrollBehavior: 'contain',
        }}
      >
        {/* Header */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <CompassIcon className="w-6 h-6" />
              <h2 className="text-lg font-semibold text-[#333333]" style={{ lineHeight: '1' }}>Compass</h2>
            </div>
            
            <div className="flex items-center" style={{ gap: '2px' }}>
              {/* New conversation button (first) */}
              <button
                onClick={clearMessages}
                className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-colors"
                aria-label="New conversation"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333333"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </button>
              
              {/* History icon dropdown (second) */}
              <div className="relative">
                <button
                  onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
                  className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Conversation history"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#333333"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
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
              
              {/* Close button (third) */}
              <button
                onClick={closePanel}
                className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-colors"
                aria-label="Close Compass"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333333"
                  strokeWidth="1.25"
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
        <div className="flex-1 overflow-y-auto relative">
          {/* Fade-up gradient at top */}
          <div 
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: '20px',
              background: 'linear-gradient(to bottom, rgba(247, 247, 247, 0.8) 0%, rgba(247, 247, 247, 0) 100%)',
            }}
          />
          <CompassChat />
        </div>
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
