import React from 'react';
import { useCompass } from '../contexts/CompassContext';

interface SearchDropdownProps {
  searchQuery: string;
  onClose: () => void;
}

export default function SearchDropdown({ searchQuery, onClose }: SearchDropdownProps) {
  const { openPanel } = useCompass();

  const handleCompassSearch = () => {
    // Open compass panel with 'search' entry point
    openPanel('search');
    
    // Close the search dropdown
    onClose();
  };

  // Hotel operator focused suggestions
  const getAutocompleteSuggestions = (query: string) => {
    if (!query.trim()) {
      return [
        'Local NYC products for hotel amenities',
        'Premium welcome tray items',
        'Artisanal bath products for hotels',
        'Gourmet snacks for hotel gift baskets',
      ];
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

  const autocompleteSuggestions = getAutocompleteSuggestions(searchQuery);

  const recentSearches = [
    'premium bath amenities',
    'local NYC snacks',
    'Brooklyn artisan products',
    'hotel welcome tray',
    'artisanal chocolates',
    'organic soaps',
  ];

  const trendingSearches = [
    'NYC local brands',
    'Premium snacks',
    'Artisan soaps',
    'Coffee & tea',
    'Hotel amenities',
    'Gift baskets',
    'Wellness products',
  ];

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-[#dfe0e1] z-50">
      <div className="py-2">
        {/* Autocomplete Suggestions */}
        {autocompleteSuggestions.length > 0 && (
          <div className="mb-2">
            <div>
              {autocompleteSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Could trigger a regular search or update the input
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-[#f5f5f5] transition-colors"
                >
                  <svg className="w-4 h-4 text-[#757575] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="text-sm text-[#333333]">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-3 px-4">
            <h3 className="text-xs font-medium text-[#757575] mb-2">
              Recent searches
            </h3>
            <div className="flex flex-wrap gap-2">
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
        <div className="mb-3 px-4">
          <h3 className="text-xs font-medium text-[#757575] mb-2">
            Trending searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((trend, index) => (
              <button
                key={index}
                className="px-3 py-1.5 border border-[#dfe0e1] rounded-lg text-xs text-[#333333] hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                {trend}
              </button>
            ))}
          </div>
        </div>

        {/* Compass Search Section - Only show when user has typed meaningful keywords */}
        {autocompleteSuggestions.length > 0 && searchQuery.trim().length > 0 && (
          <div className="mt-3 px-4 pb-2">
            <h3 className="text-xs font-medium text-[#757575] mb-3">
              Save time
            </h3>
            <button
              onClick={handleCompassSearch}
              className="flex items-center gap-2 px-3 py-2 bg-[#f5f5f5] rounded-full hover:bg-[#e5e5e5] transition-colors"
            >
              <svg
                className="w-4 h-4 text-[#333333] flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path d="M16 8L12 12L8 16L12 12L16 8Z" fill="currentColor" strokeWidth="1" />
              </svg>
              <div className="flex-1 text-left">
                <span className="text-xs text-[#333333] font-medium">Try Compass</span>
                <span className="text-xs text-[#757575]"> — Compass is Faire's AI that helps you find multiple product types in one search—no more hunting around item by item</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

