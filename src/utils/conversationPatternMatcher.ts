/**
 * Conversation Pattern Matcher
 * Parses refinement requests from conversational input
 */

export interface RefinementAction {
  type:
    | 'adjust_category_quantity'
    | 'filter_attribute'
    | 'exclude_attribute'
    | 'show_similar'
    | 'remove_product'
    | 'remove_brand'
    | 'unknown';
  category?: string;
  direction?: 'more' | 'less';
  attribute?: string;
  attributeValue?: string;
  productName?: string;
  brandName?: string;
  rawIntent?: string;
}

/**
 * Get affected categories from refinement actions
 * @param actions - Array of refinement actions
 * @returns Array of affected category names
 */
export function getAffectedCategories(actions: RefinementAction[]): string[] {
  const categories: string[] = [];
  
  for (const action of actions) {
    if (action.category && !categories.includes(action.category)) {
      categories.push(action.category);
    }
  }
  
  return categories;
}

/**
 * Matches conversational refinement patterns and extracts structured actions
 * @param input - User's refinement message
 * @returns Array of parsed refinement actions
 */
export function parseRefinementRequest(input: string): RefinementAction[] {
  const lowerInput = input.toLowerCase().trim();
  const actions: RefinementAction[] = [];

  // Pattern 1: "more [category]" or "less [category]"
  const categoryAdjustmentPattern =
    /(more|less|fewer|additional|reduce)\s+(snacks?|beverages?|drinks?|soaps?|bath\s*products?|amenities|stationery|candles?|decor?)/gi;
  let match;
  while ((match = categoryAdjustmentPattern.exec(lowerInput)) !== null) {
    const direction = ['more', 'additional'].includes(match[1]) ? 'more' : 'less';
    const rawCategory = match[2];
    const category = normalizeCategory(rawCategory);
    actions.push({
      type: 'adjust_category_quantity',
      category,
      direction,
    });
  }

  // Pattern 2: "no [attribute]" or "without [attribute]"
  const excludePattern =
    /(?:no|without|avoid|not|exclude)\s+(plastic|glass|metal|paper|organic|local|premium|expensive|cheap|large|small|heavy|light)/gi;
  while ((match = excludePattern.exec(lowerInput)) !== null) {
    actions.push({
      type: 'exclude_attribute',
      attribute: match[1].toLowerCase(),
    });
  }

  // Pattern 3: "show me [attribute]" or "only [attribute]" or "filter by [attribute]"
  const filterPattern =
    /(?:show\s+(?:me\s+)?|only|just|filter\s+(?:by\s+)?|prefer)\s+(local|organic|premium|artisan|handmade|sustainable|eco-friendly|brooklyn|nyc|new\s*york|woman-owned|fair-trade)/gi;
  while ((match = filterPattern.exec(lowerInput)) !== null) {
    actions.push({
      type: 'filter_attribute',
      attribute: match[1].toLowerCase().replace(/\s+/g, '-'),
    });
  }

  // Pattern 4: "more like this" or "similar to [product]"
  if (
    lowerInput.includes('more like this') ||
    lowerInput.includes('similar') ||
    lowerInput.includes('like that')
  ) {
    actions.push({
      type: 'show_similar',
      rawIntent: lowerInput,
    });
  }

  // Pattern 5: "remove [product name]" or "take out [product]"
  const removeProductPattern =
    /(?:remove|delete|take\s+out|get\s+rid\s+of)\s+(?:the\s+)?([a-zA-Z\s]+?)(?:\s+from|$)/i;
  match = removeProductPattern.exec(lowerInput);
  if (match) {
    actions.push({
      type: 'remove_product',
      productName: match[1].trim(),
    });
  }

  // Pattern 6: "not this type of [category]" or "different [category]"
  const differentTypePattern =
    /(?:not\s+this\s+type\s+of|different|another)\s+(snacks?|beverages?|drinks?|soaps?|bath\s*products?|amenities|stationery|candles?|decor?)/gi;
  while ((match = differentTypePattern.exec(lowerInput)) !== null) {
    const category = normalizeCategory(match[1]);
    actions.push({
      type: 'adjust_category_quantity',
      category,
      direction: 'more',
      rawIntent: 'show different options',
    });
  }

  // Pattern 7: "other options for [category]" or "more [category] options"
  const otherOptionsPattern =
    /(?:other\s+options?\s+for|more\s+options?\s+for|see\s+other)\s+(snacks?|beverages?|drinks?|soaps?|bath\s*products?|amenities|stationery|candles?|decor?)/gi;
  while ((match = otherOptionsPattern.exec(lowerInput)) !== null) {
    const category = normalizeCategory(match[1]);
    actions.push({
      type: 'adjust_category_quantity',
      category,
      direction: 'more',
      rawIntent: 'show other options',
    });
  }

  // If no patterns matched, return unknown action
  if (actions.length === 0) {
    actions.push({
      type: 'unknown',
      rawIntent: input,
    });
  }

  return actions;
}

/**
 * Normalizes category names to standard values
 */
function normalizeCategory(rawCategory: string): string {
  const normalized = rawCategory.toLowerCase().replace(/\s+/g, ' ').trim();

  const categoryMap: Record<string, string> = {
    snack: 'Snacks',
    snacks: 'Snacks',
    beverage: 'Beverages',
    beverages: 'Beverages',
    drink: 'Beverages',
    drinks: 'Beverages',
    soap: 'Bath Products',
    soaps: 'Bath Products',
    'bath product': 'Bath Products',
    'bath products': 'Bath Products',
    bath: 'Bath Products',
    amenity: 'Amenities',
    amenities: 'Amenities',
    stationery: 'Stationery',
    candle: 'Candles',
    candles: 'Candles',
    decor: 'Decor',
  };

  return categoryMap[normalized] || normalized;
}

/**
 * Generates a confirmation message based on refinement actions
 */
export function generateConfirmationMessage(
  actions: RefinementAction[]
): string {
  if (actions.length === 0 || actions[0].type === 'unknown') {
    return "I'm not sure I understood that. Could you try rephrasing? For example, 'show me more snacks' or 'no plastic packaging'.";
  }

  const confirmations: string[] = [];

  for (const action of actions) {
    switch (action.type) {
      case 'adjust_category_quantity':
        if (action.direction === 'more') {
          confirmations.push(`showing more ${action.category}`);
        } else {
          confirmations.push(`reducing ${action.category}`);
        }
        break;
      case 'filter_attribute':
        confirmations.push(`filtering to ${action.attribute} products`);
        break;
      case 'exclude_attribute':
        confirmations.push(`excluding ${action.attribute}`);
        break;
      case 'show_similar':
        confirmations.push('finding similar products');
        break;
      case 'remove_product':
        confirmations.push(`removing ${action.productName}`);
        break;
      case 'remove_brand':
        confirmations.push(`removing ${action.brandName} products`);
        break;
    }
  }

  if (confirmations.length === 1) {
    return `Got it! I'm ${confirmations[0]}.`;
  } else {
    const last = confirmations.pop();
    return `Got it! I'm ${confirmations.join(', ')}, and ${last}.`;
  }
}

/**
 * Applies refinement actions to filter parameters
 */
export interface FilterState {
  categories: Record<string, number>; // category -> max items to show
  includeTags: string[];
  excludeTags: string[];
  maxPrice?: number;
  minPrice?: number;
}

export function applyRefinementActions(
  actions: RefinementAction[],
  currentFilters: FilterState
): FilterState {
  const newFilters = { ...currentFilters };

  for (const action of actions) {
    switch (action.type) {
      case 'adjust_category_quantity':
        if (action.category && action.direction) {
          const current = newFilters.categories[action.category] || 3;
          newFilters.categories[action.category] =
            action.direction === 'more'
              ? Math.min(current + 2, 10)
              : Math.max(current - 1, 1);
        }
        break;
      case 'filter_attribute':
        if (
          action.attribute &&
          !newFilters.includeTags.includes(action.attribute)
        ) {
          newFilters.includeTags.push(action.attribute);
        }
        break;
      case 'exclude_attribute':
        if (
          action.attribute &&
          !newFilters.excludeTags.includes(action.attribute)
        ) {
          newFilters.excludeTags.push(action.attribute);
        }
        break;
    }
  }

  return newFilters;
}
