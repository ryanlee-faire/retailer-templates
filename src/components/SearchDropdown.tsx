import React, { useImperativeHandle, forwardRef } from 'react';
import { useCompass } from '../contexts/CompassContext';
import { isConversationalQuery } from '../utils/searchIntentDetection';

interface SearchDropdownProps {
  searchQuery: string;
  onClose: () => void;
}

export interface SearchDropdownHandle {
  selectHighlighted: () => void;
}

const SearchDropdown = forwardRef<SearchDropdownHandle, SearchDropdownProps>(
  ({ searchQuery, onClose }, ref) => {
    const { openPanel } = useCompass();
    const isCompassQuery = isConversationalQuery(searchQuery);
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);

    const handleCompassSearch = () => {
      // Open compass panel with 'search' entry point and pass the query
      openPanel('search', searchQuery);

      // Close the search dropdown
      onClose();
    };

    // Hotel operator focused suggestions
    const getAutocompleteSuggestions = (query: string) => {
      // Don't show autocomplete when empty - we show example phrases instead
      if (!query.trim()) {
        return [];
      }

      // Return contextual suggestions based on what they've fully typed
      const lowerQuery = query.toLowerCase();

      // Check for complete words using word boundaries
      if (lowerQuery.includes('assortment')) {
        return [
          'Assortment of local NYC snacks for hotels',
          'Assortment of premium bath products',
          'Assortment of artisanal chocolates and treats',
          'Assortment of NYC branded items',
        ];
      }

      if (lowerQuery.includes('hotel')) {
        return [
          'Hotel welcome tray items',
          'Hotel amenities - local NYC brands',
          'Hotel gift baskets - premium options',
          'Hotel bath products - artisanal',
        ];
      }

      if (lowerQuery.includes('nyc') || lowerQuery.includes('new york') || lowerQuery.includes('local')) {
        return [
          'NYC local artisan products',
          'New York themed gift items',
          'Local Brooklyn snacks and treats',
          'NYC handmade bath products',
        ];
      }

      if (lowerQuery.includes('welcome') || lowerQuery.includes('tray') || lowerQuery.includes('gift')) {
        return [
          'Welcome tray assortment for premium hotels',
          'Gift basket items under 2 lbs',
          'Tray-sized artisanal products',
          'Welcome amenity packages',
        ];
      }

      // While typing, show no suggestions until they complete a meaningful word
      return [];
    };

    // Get all available options for keyboard navigation
    const getNavigableItems = () => {
      const items: Array<{ type: 'autocomplete' | 'search' | 'compass'; label: string; action: () => void }> = [];
      
      if (searchQuery.trim()) {
        const autocompleteSuggestions = getAutocompleteSuggestions(searchQuery);
        
        // Add autocomplete suggestions
        autocompleteSuggestions.forEach(suggestion => {
          items.push({ type: 'autocomplete', label: suggestion, action: () => {} });
        });
        
        // Add generic search option if not compass query
        if (!isCompassQuery) {
          items.push({ type: 'search', label: `Search for "${searchQuery}"`, action: () => {} });
        }
        
        // Add compass option if it's a compass query
        if (isCompassQuery) {
          items.push({ type: 'compass', label: `Ask Compass: "${searchQuery}"`, action: handleCompassSearch });
        }
      }
      
      return items;
    };

    const navigableItems = getNavigableItems();

    // Handle keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < navigableItems.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigableItems.length]);

    // Reset highlighted index when search query changes
    // If Compass is available, default to highlighting it
    React.useEffect(() => {
      if (isCompassQuery && navigableItems.length > 0) {
        // Compass is always the last item
        setHighlightedIndex(navigableItems.length - 1);
      } else {
        setHighlightedIndex(0);
      }
    }, [searchQuery, isCompassQuery, navigableItems.length]);

    // Expose method to parent for Enter key handling
    useImperativeHandle(ref, () => ({
      selectHighlighted: () => {
        const item = navigableItems[highlightedIndex];
        if (item) {
          item.action();
        }
      },
    }));

  const autocompleteSuggestions = getAutocompleteSuggestions(searchQuery);

  const examplePhrases = [
    'Home decor with no import duties',
    'Mother\'s Day gifts under $100',
    'I need candles under $20',
    'Artisanal chocolates made in the USA',
  ];

  const recentSearches = [
    'rakka chocolate',
    'games',
    'dried oranges',
    'cocktail shaker',
    'marg glass',
    'cocktail drink',
    'game night',
    'dinner set',
    'utensils',
    'glassware',
  ];

  const trendingSearches = [
    'Energy drink',
    'Perfume and colognes',
    'Liquidation pallets',
    'Hen on nest',
    'Advent calendar',
    'Uv dtf wraps',
    'Wax warmer',
  ];

    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-[#dfe0e1] z-50">
        <div className="py-2">
        {/* Try searching with real phrases - show when empty */}
        {!searchQuery.trim() && (
          <div className="mb-3">
            <h3 className="text-sm font-medium text-[#333333] px-4 py-2">
              Try searching with real phrases
            </h3>
            <div>
              {examplePhrases.map((phrase, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Could populate the search or trigger Compass
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-[#f5f5f5] transition-colors"
                >
                  <svg className="w-4 h-4 text-[#757575] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="text-sm text-[#333333]">{phrase}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* When typing - show autocomplete suggestions OR generic search option */}
        {searchQuery.trim() && (
          <div>
            {/* Autocomplete Suggestions - show when matches found */}
            {autocompleteSuggestions.length > 0 && (
              <>
                {autocompleteSuggestions.map((suggestion, index) => {
                  const isHighlighted = highlightedIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        // Could trigger a regular search or update the input
                      }}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2.5 transition-colors ${
                        isHighlighted ? 'bg-[#e5e5e5]' : 'hover:bg-[#f5f5f5]'
                      }`}
                    >
                      <svg className="w-4 h-4 text-[#757575] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                      <span className="text-sm text-[#333333] flex-1">{suggestion}</span>
                      {isHighlighted && (
                        <span className="text-xs text-[#757575] font-medium px-2 py-1 bg-white rounded border border-[#dfe0e1]">ENTER</span>
                      )}
                    </button>
                  );
                })}
              </>
            )}

            {/* Generic search option - only show when NOT a compass query */}
            {!isCompassQuery && (
              <button
                onClick={() => {
                  // Could trigger a regular search
                }}
                className={`flex items-center gap-3 w-full text-left px-4 py-2.5 transition-colors ${
                  highlightedIndex === autocompleteSuggestions.length ? 'bg-[#e5e5e5]' : 'hover:bg-[#f5f5f5]'
                }`}
              >
                <svg className="w-4 h-4 text-[#757575] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span className="text-sm text-[#333333] flex-1">Search for "{searchQuery}"</span>
                {highlightedIndex === autocompleteSuggestions.length && (
                  <span className="text-xs text-[#757575] font-medium px-2 py-1 bg-white rounded border border-[#dfe0e1]">ENTER</span>
                )}
              </button>
            )}

            {/* Compass option - show at bottom when conversational query */}
            {isCompassQuery && (
              <button
                onClick={handleCompassSearch}
                className={`relative flex items-center gap-3 w-full text-left px-4 py-2.5 transition-colors overflow-hidden group ${
                  highlightedIndex === autocompleteSuggestions.length
                    ? 'bg-[#e5e5e5]'
                    : 'hover:bg-[#f5f5f5]'
                }`}
              >
                <svg
                  className="w-[20px] h-[20px] flex-shrink-0 relative z-10"
                  width="20"
                  height="20"
                  viewBox="0 0 28 25"
                  fill="none"
                >
                  <path
                    d="M15.5 9.5L15.9642 9.6857L16.3975 8.60247L15.3143 9.03576L15.5 9.5ZM3 14.5L2.8143 14.0358L2.93798 14.9961L3 14.5ZM9.66667 15.3333L10.1628 15.2713L10.1146 14.8854L9.72868 14.8372L9.66667 15.3333ZM10.5 22L10.0039 22.062L10.9642 22.1857L10.5 22ZM22 0.5C22 0.223858 21.7761 0 21.5 0C21.2239 0 21 0.223858 21 0.5H21.5H22ZM25.5 5C25.7761 5 26 4.77614 26 4.5C26 4.22386 25.7761 4 25.5 4V4.5V5ZM21.5 8.5H21C21 8.77172 21.217 8.9937 21.4886 8.99987C21.7603 9.00604 21.9871 8.79414 21.9995 8.5227L21.5 8.5ZM17.5 4C17.2239 4 17 4.22386 17 4.5C17 4.77614 17.2239 5 17.5 5V4.5V4ZM26 10.5C26 10.2239 25.7761 10 25.5 10C25.2239 10 25 10.2239 25 10.5H25.5H26ZM27.5 13C27.7761 13 28 12.7761 28 12.5C28 12.2239 27.7761 12 27.5 12V12.5V13ZM25.5 14.5H25C25 14.7717 25.217 14.9937 25.4886 14.9999C25.7603 15.006 25.9871 14.7941 25.9995 14.5227L25.5 14.5ZM23.5 12C23.2239 12 23 12.2239 23 12.5C23 12.7761 23.2239 13 23.5 13V12.5V12ZM20.5 14.5H20C20 19.7467 15.7467 24 10.5 24V24.5V25C16.299 25 21 20.299 21 14.5H20.5ZM10.5 24.5V24C5.25329 24 1 19.7467 1 14.5H0.5H0C0 20.299 4.70101 25 10.5 25V24.5ZM0.5 14.5H1C1 9.25329 5.25329 5 10.5 5V4.5V4C4.70101 4 0 8.70101 0 14.5H0.5ZM10.5 4.5V5C15.7467 5 20 9.25329 20 14.5H20.5H21C21 8.70101 16.299 4 10.5 4V4.5ZM15.5 9.5L15.3143 9.03576L2.8143 14.0358L3 14.5L3.1857 14.9642L15.6857 9.96424L15.5 9.5ZM3 14.5L2.93798 14.9961L9.60465 15.8295L9.66667 15.3333L9.72868 14.8372L3.06202 14.0039L3 14.5ZM9.66667 15.3333L9.17053 15.3954L10.0039 22.062L10.5 22L10.9961 21.938L10.1628 15.2713L9.66667 15.3333ZM10.5 22L10.9642 22.1857L15.9642 9.6857L15.5 9.5L15.0358 9.3143L10.0358 21.8143L10.5 22ZM21.5 0.5H21C21 1.85977 21.3081 3.00935 22.0799 3.8162C22.8557 4.62733 24.0113 5 25.5 5V4.5V4C24.1651 4 23.3208 3.66679 22.8025 3.12498C22.2802 2.57889 22 1.72846 22 0.5H21.5ZM25.5 4.5V4C24.1156 4 22.9989 4.37954 22.2161 5.17976C21.4388 5.97438 21.0626 7.1107 21.0005 8.4773L21.5 8.5L21.9995 8.5227C22.055 7.30106 22.3848 6.43739 22.9309 5.87906C23.4716 5.32634 24.2961 5 25.5 5V4.5ZM21.5 8.5H22C22 7.19357 21.6894 6.0496 20.9238 5.23182C20.1525 4.40789 18.9995 4 17.5 4V4.5V5C18.824 5 19.671 5.35682 20.1938 5.91524C20.7223 6.47981 21 7.33584 21 8.5H21.5ZM17.5 4.5V5C18.8598 5 20.0093 4.69192 20.8162 3.92014C21.6273 3.14428 22 1.98867 22 0.5H21.5H21C21 1.83486 20.6668 2.67925 20.125 3.1975C19.5789 3.71985 18.7285 4 17.5 4V4.5ZM25.5 10.5H25C25 11.2127 25.161 11.8623 25.6093 12.3309C26.0616 12.8038 26.7172 13 27.5 13V12.5V12C26.871 12 26.5266 11.8433 26.3319 11.6397C26.1331 11.4318 26 11.0814 26 10.5H25.5ZM27.5 12.5V12C26.7627 12 26.1313 12.2031 25.6793 12.6651C25.2329 13.1214 25.0332 13.7578 25.0005 14.4773L25.5 14.5L25.9995 14.5227C26.0256 13.9481 26.1789 13.5844 26.3942 13.3644C26.604 13.1499 26.9432 13 27.5 13V12.5ZM25.5 14.5H26C26 13.8112 25.8365 13.1672 25.3944 12.6951C24.9466 12.2167 24.2937 12 23.5 12V12.5V13C24.1181 13 24.4652 13.1656 24.6644 13.3785C24.8694 13.5975 25 13.9535 25 14.5H25.5ZM23.5 12.5V13C24.2127 13 24.8623 12.839 25.3309 12.3907C25.8038 11.9384 26 11.2828 26 10.5H25.5H25C25 11.129 24.8433 11.4734 24.6397 11.6681C24.4318 11.8669 24.0814 12 23.5 12V12.5Z"
                    fill="#333333"
                  />
                </svg>

                <span className="text-sm flex-1 relative z-10 bg-gradient-to-r from-[#757575] via-[#000000] to-[#757575] bg-[length:200%_100%] animate-text-shimmer bg-clip-text text-transparent">
                  Ask Compass: "{searchQuery}"
                </span>
                {highlightedIndex === autocompleteSuggestions.length && (
                  <span className="text-xs text-[#757575] font-medium px-2 py-1 bg-white rounded border border-[#dfe0e1] relative z-10">ENTER</span>
                )}
              </button>
            )}
          </div>
        )}

        {/* Recent Searches - only show when search is empty */}
        {!searchQuery.trim() && recentSearches.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-medium text-[#333333] px-4 py-2">
              Recent searches
            </h3>
            <div className="flex flex-wrap gap-2 px-4">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f5] rounded-full text-xs text-[#333333] hover:bg-[#e5e5e5] transition-colors"
                >
                  <span>{search}</span>
                  <svg className="w-3 h-3 text-[#757575]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        {!searchQuery.trim() && (
          <div className="mb-3">
            <h3 className="text-sm font-medium text-[#333333] px-4 py-2">
              Trending searches
            </h3>
            <div className="flex flex-wrap gap-2 px-4">
              {trendingSearches.map((trend, index) => (
                <button
                  key={index}
                  className="px-3 py-1.5 bg-[#f5f5f5] rounded-full text-xs text-[#333333] hover:bg-[#e5e5e5] transition-colors"
                >
                  {trend}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});


SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;
