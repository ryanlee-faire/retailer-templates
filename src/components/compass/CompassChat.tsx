import React, { useRef, useEffect, useState } from 'react';
import { useCompass, CompassProduct } from '../../contexts/CompassContext';
import { compassProducts, filterProducts } from '../../data/compassProducts';
import {
  parseRefinementRequest,
  generateConfirmationMessage,
  applyRefinementActions,
  getAffectedCategories,
  FilterState,
  RefinementAction,
} from '../../utils/conversationPatternMatcher';
import CompassMessage from './CompassMessage';
import CompassInput from './CompassInput';

export default function CompassChat() {
  const { state, addMessage, updateMessage, addProductToSelection, removeProductFromSelection, clearInitialQuery, setCurrentProduct, setPairedProducts } = useCompass();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const thinkingMessageIdRef = useRef<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    categories: { Snacks: 6, Beverages: 6, 'Bath Products': 6 },
    includeTags: ['nyc-local', 'premium'],
    excludeTags: [],
  });

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages]);

  // Auto-submit query when opened from search
  useEffect(() => {
    if (state.entryPoint === 'search' &&
        state.initialQuery &&
        state.messages.length === 0) {
      // Auto-submit the query
      handleSendMessage(state.initialQuery);
      // Clear the initial query after submitting
      clearInitialQuery();
    }
  }, [state.entryPoint, state.initialQuery, state.messages.length]);

  const handleSendMessage = (content: string) => {
    // Add user message with product context if available (with slight delay for realism)
    setTimeout(() => {
      addMessage({
        role: 'user',
        content,
        productContext: state.currentProduct,
      });

      // Show thinking state, then transition to working state
      setTimeout(() => {
        handleAssistantResponse(content.toLowerCase());
      }, 400);
    }, 150);
  };

  // Helper function to generate product-specific responses
  const generateProductResponse = (product: CompassProduct, question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Gluten-free questions
    if (lowerQuestion.includes('gluten') || lowerQuestion.includes('gluten free') || lowerQuestion.includes('gluten-free')) {
      if (product.category === 'snack') {
        return `Yes! The ${product.name} from ${product.brandName} is gluten-free. It's made with natural ingredients and doesn't contain any gluten-containing grains. Perfect for customers with gluten sensitivities or celiac disease.`;
      } else {
        return `The ${product.name} from ${product.brandName} is gluten-free. All ingredients are carefully sourced to ensure no cross-contamination.`;
      }
    }
    
    // Ingredient questions
    if (lowerQuestion.includes('ingredient') || lowerQuestion.includes('what\'s in') || lowerQuestion.includes('made with')) {
      if (product.category === 'snack') {
        return `The ${product.name} is made with premium, natural ingredients. Based on the product details, it features high-quality components sourced from ${product.tags.includes('nyc-local') ? 'local NYC suppliers' : 'trusted suppliers'}. The brand ${product.brandName} is known for using ${product.tags.includes('organic') ? 'organic' : 'premium'} ingredients.`;
      } else if (product.category === 'soap') {
        return `The ${product.name} from ${product.brandName} is crafted with ${product.tags.includes('organic') ? 'organic' : 'natural'} ingredients. It's ${product.tags.includes('vegan') ? 'vegan' : 'made with plant-based'} and free from harsh chemicals. Perfect for sensitive skin!`;
      } else {
        return `The ${product.name} features carefully selected ingredients. ${product.brandName} uses ${product.tags.includes('organic') ? 'organic' : 'premium'} ingredients and follows strict quality standards.`;
      }
    }
    
    // Shipping questions
    if (lowerQuestion.includes('shipping') || lowerQuestion.includes('ship') || lowerQuestion.includes('delivery')) {
      const shippingInfo = product.freeShipping 
        ? `Yes! ${product.brandName} offers free shipping on orders.`
        : `Shipping is available for ${product.brandName} products. The brand has a minimum order of ${product.minOrder || `$${product.brandMinimum}`}.`;
      return `${shippingInfo} Orders typically arrive within 5-7 business days. The ${product.name} weighs ${product.weight} lbs, so shipping costs will be calculated at checkout.`;
    }
    
    // Price/cost questions
    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('how much')) {
      return `The ${product.name} from ${product.brandName} is priced at $${product.price.toFixed(2)} per unit. The brand has a minimum order requirement of ${product.minOrder || `$${product.brandMinimum}`}. ${product.freeShipping ? 'Plus, they offer free shipping!' : ''}`;
    }
    
    // Vegan/vegetarian questions
    if (lowerQuestion.includes('vegan') || lowerQuestion.includes('vegetarian')) {
      const isVegan = product.tags.includes('vegan');
      return isVegan 
        ? `Yes! The ${product.name} from ${product.brandName} is vegan. It's made without any animal products or by-products.`
        : `The ${product.name} may contain some animal-derived ingredients. I'd recommend checking with ${product.brandName} directly for specific dietary requirements, as product formulations can vary.`;
    }
    
    // Organic questions
    if (lowerQuestion.includes('organic')) {
      const isOrganic = product.tags.includes('organic');
      return isOrganic
        ? `Yes! The ${product.name} from ${product.brandName} is made with organic ingredients. It's certified organic and sourced from trusted suppliers.`
        : `The ${product.name} uses high-quality ingredients, though it may not be certified organic. ${product.brandName} focuses on ${product.tags.includes('premium') ? 'premium' : 'natural'} ingredients.`;
    }
    
    // Allergen questions
    if (lowerQuestion.includes('allergen') || lowerQuestion.includes('allergy') || lowerQuestion.includes('contains')) {
      return `The ${product.name} from ${product.brandName} is made in a facility that may process common allergens. For specific allergen information, I'd recommend reaching out to ${product.brandName} directly, as they can provide the most up-to-date ingredient and allergen information.`;
    }
    
    // Stock/availability questions
    if (lowerQuestion.includes('stock') || lowerQuestion.includes('available') || lowerQuestion.includes('in stock')) {
      return product.inStock
        ? `Great news! The ${product.name} is currently in stock. ${product.brandName} typically maintains good inventory levels, and orders can be processed quickly.`
        : `I'll need to check current availability for the ${product.name}. ${product.brandName} can provide real-time stock information when you place an order.`;
    }
    
    // Default product-specific response
    return `The ${product.name} from ${product.brandName} is a ${product.tags.includes('premium') ? 'premium' : 'quality'} product${product.tags.includes('nyc-local') ? ' sourced from local NYC suppliers' : ''}. ${product.description} It's priced at $${product.price.toFixed(2)} and has a ${product.rating ? `${product.rating}-star` : 'great'} rating. Is there anything specific you'd like to know about ingredients, shipping, or availability?`;
  };

  // Helper function to find paired/complementary products
  const findPairedProducts = (product: CompassProduct): CompassProduct[] => {
    const pairedProducts: CompassProduct[] = [];
    
    // Find products from same brand (excluding current product)
    const sameBrandProducts = compassProducts.filter(
      p => p.brandName === product.brandName && p.id !== product.id
    );
    pairedProducts.push(...sameBrandProducts.slice(0, 2));
    
    // Find complementary category products
    let complementaryCategory: string | null = null;
    if (product.category === 'snack') {
      complementaryCategory = 'beverage';
    } else if (product.category === 'beverage') {
      complementaryCategory = 'snack';
    } else if (product.category === 'soap') {
      complementaryCategory = 'accessory';
    } else if (product.category === 'accessory') {
      complementaryCategory = 'soap';
    }
    
    if (complementaryCategory) {
      const complementaryProducts = compassProducts.filter(
        p => p.category === complementaryCategory && p.id !== product.id
      );
      // Prefer products with similar tags
      const similarTagProducts = complementaryProducts.filter(p => 
        p.tags.some(tag => product.tags.includes(tag))
      );
      pairedProducts.push(...similarTagProducts.slice(0, 2));
      
      // Fill remaining slots with any complementary products
      if (pairedProducts.length < 4) {
        const remaining = complementaryProducts.filter(
          p => !pairedProducts.some(pp => pp.id === p.id)
        );
        pairedProducts.push(...remaining.slice(0, 4 - pairedProducts.length));
      }
    }
    
    // Ensure we have at least some products, fill with any premium products if needed
    if (pairedProducts.length < 4) {
      const premiumProducts = compassProducts.filter(
        p => p.id !== product.id && 
        p.tags.includes('premium') && 
        !pairedProducts.some(pp => pp.id === p.id)
      );
      pairedProducts.push(...premiumProducts.slice(0, 4 - pairedProducts.length));
    }
    
    return pairedProducts.slice(0, 6); // Return up to 6 paired products
  };

  const handleAssistantResponse = (userInput: string) => {
    // Check if user is asking about a specific product (context is set)
    if (state.currentProduct) {
      const lowerInput = userInput.toLowerCase();
      
      // Check if asking about paired/complementary products
      const isPairingRequest = 
        lowerInput.includes('pair') || 
        lowerInput.includes('go with') || 
        lowerInput.includes('complement') || 
        lowerInput.includes('work together') ||
        lowerInput.includes('other products') ||
        lowerInput.includes('show me other') ||
        lowerInput.includes('what else');
      
      if (isPairingRequest) {
        // Find paired products
        const pairedProducts = findPairedProducts(state.currentProduct);
        
        // Store paired products in context for "See all" navigation
        setPairedProducts(pairedProducts);
        
        // Add message with paired products
        addMessage({
          role: 'assistant',
          content: `Here are some products that pair well with ${state.currentProduct.name}:`,
          productsByCategory: [
            {
              category: 'Paired Products',
              products: pairedProducts,
            },
          ],
        });
        return;
      }
      
      // Generate contextual response based on question type
      const response = generateProductResponse(state.currentProduct, userInput);
      addMessage({
        role: 'assistant',
        content: response,
      });
      // Clear product context after responding (optional - you might want to keep it)
      // setCurrentProduct(undefined);
      return;
    }

    // Check if this is a refinement request (conversation already started)
    const isRefinementRequest = state.messages.length > 0;

    if (isRefinementRequest) {
      // Parse refinement patterns
      const actions = parseRefinementRequest(userInput);

      // If it's a refinement action, apply filters and show updated results with animation
      if (actions.length > 0 && actions[0].type !== 'unknown') {
        const newFilters = applyRefinementActions(actions, currentFilters);
        setCurrentFilters(newFilters);

        // Show faster, category-specific animation for refinements
        showRefinementAnimation(actions, newFilters, userInput);
        return;
      }
    }

    // Show "working" state - start with just the heading
    const thinkingMessage = {
      role: 'assistant' as const,
      content: 'Working...',
      isThinking: true,
      thinkingStatus: '', // Start empty
      categorySearchProgress: [],
      showThinkingDots: false,
    };
    const addedMessage = addMessage(thinkingMessage);
    thinkingMessageIdRef.current = addedMessage.id;

    // After 400ms, reveal the status text
    setTimeout(() => {
      if (thinkingMessageIdRef.current) {
        updateMessage(thinkingMessageIdRef.current, {
          thinkingStatus: `Searching for products that fit "${userInput}" across multiple categories`,
        });
      }
    }, 400);

    // Animate through categories progressively - ONE AT A TIME
    const categories = ['Snacks', 'Beverages', 'Bath Products', 'Accessories'];
    const counts = [420, 267, 134, 189]; // Simulated search result counts

    categories.forEach((category, index) => {
      // First, show the category appearing with searching state
      // Add 600ms delay to let status text appear first
      setTimeout(() => {
        if (thinkingMessageIdRef.current) {
          // Build progress array showing only categories up to current index
          const progress = categories.slice(0, index + 1).map((cat, i) => ({
            category: cat,
            count: i < index ? counts[i] : undefined, // Previous categories have counts
            isSearching: i === index, // Current category is searching
          }));

          updateMessage(thinkingMessageIdRef.current, {
            categorySearchProgress: progress,
          });
        }

        // After a short delay, show the count for this category
        setTimeout(() => {
          if (thinkingMessageIdRef.current) {
            // Update to show the count
            const progress = categories.slice(0, index + 1).map((cat, i) => ({
              category: cat,
              count: counts[i], // Now all visible categories have counts
              isSearching: false,
            }));

            updateMessage(thinkingMessageIdRef.current, {
              categorySearchProgress: progress,
            });
          }
        }, 400);
      }, 600 + index * 700); // 600ms for status text + 700ms per category
    });

    // After all categories are searched, collapse to summary
    setTimeout(() => {
      // Mark thinking message as complete with compact summary
      if (thinkingMessageIdRef.current) {
        const totalProducts = counts.reduce((sum, count) => sum + count, 0);
        updateMessage(thinkingMessageIdRef.current, {
          isThinking: false,
          isThinkingComplete: true,
          totalProductsReviewed: totalProducts,
        });
      }
    }, 600 + categories.length * 700 + 800); // Wait for status text + all animations

    // Show intro message with empty products first
    const resultsMessageBaseTime = 600 + categories.length * 700 + 800 + 600; // Status + animations + summary pause
    setTimeout(() => {
      const resultsMessage = addMessage({
        role: 'assistant',
        content: `Based on your search, I've found a handful of items that might be a great fit. Feel free to take a look or refine your search by telling me more about what you had in mind.`,
        productsByCategory: [], // Start empty
      });
      
      // Store message ID for progressive updates
      const resultsMessageId = resultsMessage.id;

      // Get products by category using current filters
      const snacks = filterProducts(compassProducts, {
        categories: ['snack'],
        tags: currentFilters.includeTags,
      }).slice(0, currentFilters.categories['Snacks'] || 6);

      const beverages = filterProducts(compassProducts, {
        categories: ['beverage'],
        tags: currentFilters.includeTags,
      }).slice(0, currentFilters.categories['Beverages'] || 6);

      const soaps = filterProducts(compassProducts, {
        categories: ['soap'],
        tags: currentFilters.includeTags,
      }).slice(0, currentFilters.categories['Bath Products'] || 6);

      const allCategories = [
        { category: 'Snack Items', products: snacks },
        { category: 'Beverages', products: beverages },
        { category: 'Bath Products', products: soaps },
      ];

      // Progressively reveal each category
      allCategories.forEach((categoryData, index) => {
        setTimeout(() => {
          updateMessage(resultsMessageId, {
            productsByCategory: allCategories.slice(0, index + 1),
          });
        }, 800 + index * 600); // 800ms initial pause, then 600ms between each category
      });
    }, resultsMessageBaseTime);

    // Add follow-up message with refinement options after all categories have been revealed
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: "These are some of my recommendations but I'm happy to refine. Just let me know what you are looking for.",
        chips: ['Show more snacks', 'Show local brands only', 'More options'],
      });
    }, resultsMessageBaseTime + 800 + (3 * 600) + 800); // After all categories + buffer
  };

  const showRefinementAnimation = (actions: RefinementAction[], filters: FilterState, userInput: string) => {
    // Determine affected categories
    const affectedCategories = getAffectedCategories(actions);
    const isGlobalFilter = actions.some(a => a.type === 'filter_attribute' || a.type === 'exclude_attribute');
    
    // Categories to animate (only affected ones for category-specific, all for global filters)
    const categoriesToAnimate = affectedCategories.length > 0 && !isGlobalFilter
      ? affectedCategories
      : ['Snacks', 'Beverages', 'Bath Products'];
    
    // Simulated counts for refinements (smaller than initial search)
    const getCategoryCount = (category: string) => {
      const baseCounts: Record<string, number> = {
        'Snacks': 280,
        'Beverages': 180,
        'Bath Products': 220,
        'Accessories': 150,
      };
      return baseCounts[category] || 200;
    };

    // Show "Working..." state
    const thinkingMessage = {
      role: 'assistant' as const,
      content: 'Working...',
      isThinking: true,
      thinkingStatus: '', // Start empty
      categorySearchProgress: [],
      showThinkingDots: false,
    };
    const addedMessage = addMessage(thinkingMessage);
    const refinementMessageId = addedMessage.id;

    // Show status text (600ms to let user see it)
    setTimeout(() => {
      const statusText = categoriesToAnimate.length === 1
        ? `Reviewing ${getCategoryCount(categoriesToAnimate[0])}+ products in the ${categoriesToAnimate[0]} category`
        : `Reviewing products across ${categoriesToAnimate.length} categories`;
      
      updateMessage(refinementMessageId, {
        thinkingStatus: statusText,
      });
    }, 600);

    // Animate categories (800ms per category - slower to show work being done)
    categoriesToAnimate.forEach((category, index) => {
      setTimeout(() => {
        const progress = categoriesToAnimate.slice(0, index + 1).map((cat, i) => ({
          category: cat,
          count: i < index ? getCategoryCount(cat) : undefined,
          isSearching: i === index,
        }));

        updateMessage(refinementMessageId, {
          categorySearchProgress: progress,
        });

        // Show count after 600ms (give time to see the searching state)
        setTimeout(() => {
          const progressWithCount = categoriesToAnimate.slice(0, index + 1).map((cat) => ({
            category: cat,
            count: getCategoryCount(cat),
            isSearching: false,
          }));

          updateMessage(refinementMessageId, {
            categorySearchProgress: progressWithCount,
          });
        }, 600);
      }, 800 + index * 800);
    });

    // Collapse to summary
    const animationTime = 800 + categoriesToAnimate.length * 800 + 900;
    setTimeout(() => {
      const totalProducts = categoriesToAnimate.reduce((sum, cat) => sum + getCategoryCount(cat), 0);
      updateMessage(refinementMessageId, {
        isThinking: false,
        isThinkingComplete: true,
        totalProductsReviewed: totalProducts,
        isCategorySpecific: categoriesToAnimate.length === 1,
        specificCategoryName: categoriesToAnimate.length === 1 ? categoriesToAnimate[0] : undefined,
      });
    }, animationTime);

    // Show results after summary (800ms pause to let user read)
    setTimeout(() => {
      showFilteredResults(filters, actions, categoriesToAnimate);
    }, animationTime + 800);
  };

  const showFilteredResults = (filters: FilterState, actions?: RefinementAction[], categoriesToShow?: string[]) => {
    // Get filtered products by category
    const snacks = filterProducts(compassProducts, {
      categories: ['snack'],
      tags: filters.includeTags,
    })
      .filter((p) => !filters.excludeTags.some((tag) => p.tags.includes(tag)))
      .slice(0, filters.categories['Snacks'] || 6);

    const beverages = filterProducts(compassProducts, {
      categories: ['beverage'],
      tags: filters.includeTags,
    })
      .filter((p) => !filters.excludeTags.some((tag) => p.tags.includes(tag)))
      .slice(0, filters.categories['Beverages'] || 6);

    const soaps = filterProducts(compassProducts, {
      categories: ['soap'],
      tags: filters.includeTags,
    })
      .filter((p) => !filters.excludeTags.some((tag) => p.tags.includes(tag)))
      .slice(0, filters.categories['Bath Products'] || 6);

    // Build results based on what categories to show
    const allCategoryResults = [
      { category: 'Snack Items', products: snacks, key: 'Snacks' },
      { category: 'Beverages', products: beverages, key: 'Beverages' },
      { category: 'Bath Products', products: soaps, key: 'Bath Products' },
    ];

    const results = categoriesToShow
      ? allCategoryResults.filter(r => categoriesToShow.includes(r.key) && r.products.length > 0)
      : allCategoryResults.filter(r => r.products.length > 0);

    // Generate context-aware intro message
    let introMessage = 'Here are your updated results.';
    if (actions && actions.length > 0) {
      const firstAction = actions[0];
      if (firstAction.type === 'adjust_category_quantity' && firstAction.category) {
        if (firstAction.direction === 'more') {
          introMessage = `I've found some additional ${firstAction.category.toLowerCase()} options for you.`;
        }
      } else if (firstAction.type === 'exclude_attribute') {
        introMessage = `Here are options without ${firstAction.attribute}.`;
      } else if (firstAction.type === 'filter_attribute') {
        introMessage = `Here are ${firstAction.attribute} options.`;
      } else if (categoriesToShow && categoriesToShow.length === 1) {
        introMessage = `I've found some additional ${categoriesToShow[0].toLowerCase()} options for you.`;
      }
    }

    // Create message with empty products first for progressive reveal
    const resultsMessage = addMessage({
      role: 'assistant',
      content: introMessage,
      productsByCategory: [],
    });

    // Progressively reveal each category (300ms between each for faster feel)
    results.forEach((categoryData, index) => {
      setTimeout(() => {
        updateMessage(resultsMessage.id, {
          productsByCategory: results.slice(0, index + 1).map(r => ({ category: r.category, products: r.products })),
        });
      }, 400 + index * 300);
    });

    // Only add follow-up chips for refinements, not for all filtered results
    // This gets called for refinements, so we skip adding chips here
  };

  const handleProductSelect = (productId: string) => {
    const product = compassProducts.find(p => p.id === productId);
    if (!product) return;

    const isAlreadySelected = state.selectedProducts.some(p => p.id === productId);
    
    if (isAlreadySelected) {
      removeProductFromSelection(productId);
      // Clear product context if deselecting
      if (state.currentProduct?.id === productId) {
        setCurrentProduct(undefined);
      }
    } else {
      addProductToSelection(product);
      // Set product context for follow-up questions
      setCurrentProduct(product);
    }
  };

  // Onboarding state (no messages yet)
  if (state.messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        {/* Left-aligned welcome content */}
        <div className="flex-1 flex flex-col justify-end px-8 pb-6">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 text-left flex items-center gap-2">
              <svg
                className="w-6 h-6"
                width="22"
                height="22"
                viewBox="0 0 28 25"
                fill="none"
              >
                <path
                  d="M15.5 9.5L15.9642 9.6857L16.3975 8.60247L15.3143 9.03576L15.5 9.5ZM3 14.5L2.8143 14.0358L2.93798 14.9961L3 14.5ZM9.66667 15.3333L10.1628 15.2713L10.1146 14.8854L9.72868 14.8372L9.66667 15.3333ZM10.5 22L10.0039 22.062L10.9642 22.1857L10.5 22ZM22 0.5C22 0.223858 21.7761 0 21.5 0C21.2239 0 21 0.223858 21 0.5H21.5H22ZM25.5 5C25.7761 5 26 4.77614 26 4.5C26 4.22386 25.7761 4 25.5 4V4.5V5ZM21.5 8.5H21C21 8.77172 21.217 8.9937 21.4886 8.99987C21.7603 9.00604 21.9871 8.79414 21.9995 8.5227L21.5 8.5ZM17.5 4C17.2239 4 17 4.22386 17 4.5C17 4.77614 17.2239 5 17.5 5V4.5V4ZM26 10.5C26 10.2239 25.7761 10 25.5 10C25.2239 10 25 10.2239 25 10.5H25.5H26ZM27.5 13C27.7761 13 28 12.7761 28 12.5C28 12.2239 27.7761 12 27.5 12V12.5V13ZM25.5 14.5H25C25 14.7717 25.217 14.9937 25.4886 14.9999C25.7603 15.006 25.9871 14.7941 25.9995 14.5227L25.5 14.5ZM23.5 12C23.2239 12 23 12.2239 23 12.5C23 12.7761 23.2239 13 23.5 13V12.5V12ZM20.5 14.5H20C20 19.7467 15.7467 24 10.5 24V24.5V25C16.299 25 21 20.299 21 14.5H20.5ZM10.5 24.5V24C5.25329 24 1 19.7467 1 14.5H0.5H0C0 20.299 4.70101 25 10.5 25V24.5ZM0.5 14.5H1C1 9.25329 5.25329 5 10.5 5V4.5V4C4.70101 4 0 8.70101 0 14.5H0.5ZM10.5 4.5V5C15.7467 5 20 9.25329 20 14.5H20.5H21C21 8.70101 16.299 4 10.5 4V4.5ZM15.5 9.5L15.3143 9.03576L2.8143 14.0358L3 14.5L3.1857 14.9642L15.6857 9.96424L15.5 9.5ZM3 14.5L2.93798 14.9961L9.60465 15.8295L9.66667 15.3333L9.72868 14.8372L3.06202 14.0039L3 14.5ZM9.66667 15.3333L9.17053 15.3954L10.0039 22.062L10.5 22L10.9961 21.938L10.1628 15.2713L9.66667 15.3333ZM10.5 22L10.9642 22.1857L15.9642 9.6857L15.5 9.5L15.0358 9.3143L10.0358 21.8143L10.5 22ZM21.5 0.5H21C21 1.85977 21.3081 3.00935 22.0799 3.8162C22.8557 4.62733 24.0113 5 25.5 5V4.5V4C24.1651 4 23.3208 3.66679 22.8025 3.12498C22.2802 2.57889 22 1.72846 22 0.5H21.5ZM25.5 4.5V4C24.1156 4 22.9989 4.37954 22.2161 5.17976C21.4388 5.97438 21.0626 7.1107 21.0005 8.4773L21.5 8.5L21.9995 8.5227C22.055 7.30106 22.3848 6.43739 22.9309 5.87906C23.4716 5.32634 24.2961 5 25.5 5V4.5ZM21.5 8.5H22C22 7.19357 21.6894 6.0496 20.9238 5.23182C20.1525 4.40789 18.9995 4 17.5 4V4.5V5C18.824 5 19.671 5.35682 20.1938 5.91524C20.7223 6.47981 21 7.33584 21 8.5H21.5ZM17.5 4.5V5C18.8598 5 20.0093 4.69192 20.8162 3.92014C21.6273 3.14428 22 1.98867 22 0.5H21.5H21C21 1.83486 20.6668 2.67925 20.125 3.1975C19.5789 3.71985 18.7285 4 17.5 4V4.5ZM25.5 10.5H25C25 11.2127 25.161 11.8623 25.6093 12.3309C26.0616 12.8038 26.7172 13 27.5 13V12.5V12C26.871 12 26.5266 11.8433 26.3319 11.6397C26.1331 11.4318 26 11.0814 26 10.5H25.5ZM27.5 12.5V12C26.7627 12 26.1313 12.2031 25.6793 12.6651C25.2329 13.1214 25.0332 13.7578 25.0005 14.4773L25.5 14.5L25.9995 14.5227C26.0256 13.9481 26.1789 13.5844 26.3942 13.3644C26.604 13.1499 26.9432 13 27.5 13V12.5ZM25.5 14.5H26C26 13.8112 25.8365 13.1672 25.3944 12.6951C24.9466 12.2167 24.2937 12 23.5 12V12.5V13C24.1181 13 24.4652 13.1656 24.6644 13.3785C24.8694 13.5975 25 13.9535 25 14.5H25.5ZM23.5 12.5V13C24.2127 13 24.8623 12.839 25.3309 12.3907C25.8038 11.9384 26 11.2828 26 10.5H25.5H25C25 11.129 24.8433 11.4734 24.6397 11.6681C24.4318 11.8669 24.0814 12 23.5 12V12.5Z"
                  fill="#333333"
                />
              </svg>
              Welcome to Compass
            </h3>
            
            <p className="text-sm text-[#757575] mb-6 text-left">
              I can help you find multiple products that work together—all in one search.
            </p>

            <p className="text-sm text-[#333333] mb-4 text-left">
              For example, you can say:
            </p>

            {/* Example buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSendMessage("I'm looking for wellness & spa items")}
                className="w-full text-left px-4 py-3 border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#757575] mb-2">
                  "I'm looking for wellness & spa items" — then Compass will search across:
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">bath products</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">candles</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">hand towels</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSendMessage("I'm looking for food & entertaining")}
                className="w-full text-left px-4 py-3 border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#757575] mb-2">
                  "I'm looking for food & entertaining" — then Compass will search across:
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">snacks</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">beverages</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">napkins</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSendMessage("I'm looking for home & living items")}
                className="w-full text-left px-4 py-3 border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="text-sm text-[#757575] mb-2">
                  "I'm looking for home & living items" — then Compass will search across:
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">home decor</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">throw pillows</span>
                  <span className="text-[#757575]">+</span>
                  <span className="px-2 py-1 border border-[#dfe0e1] text-[#333333] rounded">accessories</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Input at bottom */}
        <CompassInput onSend={handleSendMessage} placeholder="What are you looking for?" />
      </div>
    );
  }

  // Conversation view (with messages)
  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6">
        {state.messages.map((message) => (
          <CompassMessage
            key={message.id}
            message={message}
            onProductSelect={handleProductSelect}
            onChipClick={handleSendMessage}
            selectedProductIds={state.selectedProducts.map(p => p.id)}
          />
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input at bottom */}
      <CompassInput onSend={handleSendMessage} disabled={isThinking} />
    </div>
  );
}

