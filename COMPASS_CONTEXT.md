# Compass Prototype - Development Context

## Project Overview

**Compass** is an AI-powered conversational product discovery assistant being prototyped for Faire's marketplace. It helps buyers discover multiple complementary products through natural language queries, demonstrating intelligent curation at scale.

### Key Value Proposition
- **Multi-category search**: Search across multiple product categories simultaneously (e.g., snacks + beverages + bath products)
- **Intelligent curation**: Shows that Compass is filtering through hundreds/thousands of products to find the best matches
- **Conversational refinement**: Users can refine results through natural conversation ("show more snacks", "no plastic", etc.)

## Current Implementation Status

### ✅ Completed Features

1. **Search Integration**
   - Inline Compass option appears in search dropdown for conversational queries (3+ words)
   - Detects conversational intent vs. simple keyword searches
   - Triggers at 3-word threshold with context indicators
   - Location: `src/components/SearchDropdown.tsx`, `src/utils/searchIntentDetection.ts`

2. **Progressive Search Animation** (Perplexity-style)
   - Sequential category reveal: categories appear one at a time
   - Each category shows: 🔍 **Category** (searching) → 🔍 **Category (count)**
   - Timing: 700ms per category + 400ms for count reveal
   - Large counts (400+) demonstrate scale of curation
   - Location: `src/components/compass/CompassChat.tsx`, `src/components/compass/CompassMessage.tsx`

3. **Chat Interface**
   - Side panel that slides in from right (480px width)
   - Onboarding state with example queries
   - Message history with user/assistant roles
   - Product cards displayed by category
   - Suggestion chips for refinement
   - Location: `src/components/compass/CompassSidePanel.tsx`, `src/components/compass/CompassChat.tsx`

4. **State Management**
   - Global state via React Context (`CompassContext`)
   - Message updates for real-time animation
   - Cart functionality integrated
   - Entry point tracking (icon vs search)
   - Location: `src/contexts/CompassContext.tsx`

5. **Product Display**
   - Products organized by category (Food Items, Beverages, Bath Products)
   - Product cards with images, pricing, ratings
   - Add to cart functionality
   - Selection state tracking
   - Location: `src/components/compass/CompassProductCard.tsx`

## Technical Architecture

### Key Files & Structure

```
src/
├── components/
│   ├── compass/
│   │   ├── CompassSidePanel.tsx       # Main container, header, cart summary
│   │   ├── CompassChat.tsx            # Chat logic, animations, message handling
│   │   ├── CompassMessage.tsx         # Message rendering (user/assistant/thinking)
│   │   ├── CompassInput.tsx           # Input field with send button
│   │   ├── CompassProductCard.tsx     # Product card display
│   │   ├── CompassCartSummary.tsx     # Cart preview at bottom of panel
│   │   └── CompassCategoryParsing.tsx # Category pill display
│   └── SearchDropdown.tsx             # Search dropdown with Compass integration
├── contexts/
│   └── CompassContext.tsx             # Global state management
├── utils/
│   ├── searchIntentDetection.ts       # Detects conversational queries
│   └── conversationPatternMatcher.ts  # Handles refinement patterns
└── data/
    └── compassProducts.ts             # Mock product data (NYC-themed)
```

### State Management Pattern

**CompassContext** provides:
- `state`: Current state (messages, cart, panel open/closed)
- `addMessage()`: Adds message and returns it (for ID tracking)
- `updateMessage(id, updates)`: Updates existing message (for animations)
- `addToCart()`, `removeFromCart()`: Cart operations
- `openPanel(entryPoint, query)`: Opens panel from icon or search

### Animation Implementation

The progressive search uses:
1. **Ref for message ID tracking**: `thinkingMessageIdRef` persists across renders
2. **Sequential timeouts**: `forEach` with `index * 700ms` delay
3. **Staged updates**: First shows category searching, then count after 400ms
4. **categorySearchProgress array**: Tracks `{ category, count?, isSearching }`

```typescript
// Pattern used:
const addedMessage = addMessage({ isThinking: true, categorySearchProgress: [] });
thinkingMessageIdRef.current = addedMessage.id;

categories.forEach((category, index) => {
  setTimeout(() => {
    // Show searching
    updateMessage(thinkingMessageIdRef.current, {
      categorySearchProgress: [...previous, { category, isSearching: true }]
    });

    setTimeout(() => {
      // Show count
      updateMessage(thinkingMessageIdRef.current, {
        categorySearchProgress: [...previous, { category, count: 420, isSearching: false }]
      });
    }, 400);
  }, index * 700);
});
```

## Design System

### Colors
- Background: `#f5f5f5` (light gray)
- Text primary: `#333333` (dark gray)
- Text secondary: `#757575` (medium gray)
- Border: `#dfe0e1` (light gray)
- Accent: `#4A5FFF` (blue, for Compass icon)
- User message: `#333333` (dark gray bubble)

### Components
- Message bubbles: rounded-2xl with small tail (rounded-tl-sm or rounded-tr-sm)
- Product cards: White background, subtle shadows, rounded corners
- Spacing: Consistent 24px (px-6) horizontal padding in panel

## Data Structure

### Message Interface
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  products?: CompassProduct[];
  productsByCategory?: { category: string; products: CompassProduct[] }[];
  chips?: string[];  // Suggestion chips
  interpretation?: string;
  categories?: string[];
  isThinking?: boolean;  // Thinking state flag
  thinkingStatus?: string;  // Status message
  categorySearchProgress?: {
    category: string;
    count?: number;
    isSearching: boolean;
  }[];
  timestamp: Date;
}
```

### Product Interface
```typescript
interface CompassProduct {
  id: string;
  name: string;
  brandName: string;
  imageUrl: string;
  price: number;
  category: 'snack' | 'beverage' | 'soap' | 'accessory';
  tags: string[];  // e.g., 'nyc-local', 'premium'
  rating?: number;
  // ... other fields
}
```

## Current Mock Data

All products are NYC-themed for the hotel amenities use case:
- **Snacks**: Brooklyn Artisan Popcorn, Manhattan Chocolate Truffles, etc.
- **Beverages**: Brooklyn Cold Brew, Hudson Valley Tea, etc.
- **Bath Products**: Hudson Valley Lavender Soap, Brooklyn Botanical Bar Soap, etc.
- **Accessories**: NYC Skyline Candle, Hudson Valley Linen Napkins, etc.

Tags used for filtering: `nyc-local`, `premium`, `organic`, `artisanal`, `brooklyn`, `manhattan`, etc.

Location: `src/data/compassProducts.ts`

## Key UX Patterns

### Search Entry Flow
1. User types 3+ word query in search bar
2. "Ask Compass about: [query]" option appears inline with ENTER indicator
3. Click or press Enter → Panel opens, auto-submits query
4. Thinking animation plays → Results appear

### Progressive Animation Flow
```
Working...
Searching for products that fit "[query]" across multiple categories

Searching
🔍 Snacks                    (t=0ms, searching)
🔍 Snacks (420)              (t=400ms, count appears)
🔍 Snacks (420)              (t=700ms)
🔍 Beverages                 (t=700ms, searching)
🔍 Snacks (420)              (t=1100ms)
🔍 Beverages (267)           (t=1100ms, count appears)
... (continues for Bath Products, Accessories)

[Results appear at ~3600ms]
```

### Refinement Flow
User can refine by clicking chips or typing:
- "Show more snacks" → Increases snack count
- "No plastic" → Adds exclusion filter
- "Local brands only" → Filters by nyc-local tag

Location: `src/utils/conversationPatternMatcher.ts`

## Important Implementation Notes

### State Update Timing
- `addMessage()` now returns the created `Message` to get the ID immediately
- Use refs (`useRef`) to persist message IDs across async operations
- `updateMessage()` uses message ID, not index, for reliable updates

### Animation Timing
- **Per category**: 700ms total (300ms searching visible + 400ms for count)
- **Total animation**: ~3.6s for 4 categories (leaves final state visible for smooth transition)
- **Results delay**: `categories.length * 700 + 800`
- **Follow-up chips**: `categories.length * 700 + 3300`

### Search Intent Detection
Triggers Compass when query has:
- 3+ words AND
- Helper phrases ("looking for", "need", "want") OR
- Context indicators ("for", "to", "with") OR
- Multi-product intent ("and", "plus", "items")

Location: `src/utils/searchIntentDetection.ts:130`

## Next Steps / Future Enhancements

### Potential Improvements
- [ ] Real API integration (replace mock data)
- [ ] More sophisticated refinement parsing
- [ ] Image-based product recommendations
- [ ] Saved searches / conversation history
- [ ] Multi-language support
- [ ] Mobile responsive design refinements
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Analytics tracking for user interactions

### Known Limitations
- Currently uses hardcoded categories (Snacks, Beverages, Bath Products, Accessories)
- Search counts are simulated (420, 267, 134, 189)
- Limited to NYC-themed products in mock data
- Refinement patterns are rule-based, not ML-powered
- No real-time inventory updates

## Development Commands

```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests (if configured)
npm test
```

## Git Branch
- Branch: `compass-prototype-ji`
- Repository: `ryanlee-faire/faire-proto-playground`

## Related Documentation
- Perplexity thinking state inspiration: https://www.perplexity.ai
- Faire design system: (internal)
- React Context API: https://react.dev/reference/react/useContext

---

**Last Updated**: 2025-11-20

This prototype demonstrates the core Compass experience and validates the key value proposition of intelligent multi-category product discovery at scale.
