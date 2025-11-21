import React, { createContext, useContext, useState, ReactNode } from 'react';

// Product interface matching our existing product structure
export interface CompassProduct {
  id: string;
  name: string;
  brandName: string;
  imageUrl: string;
  brandAvatarUrl?: string;
  price: number;
  weight: number; // in lbs
  dimensions: { width: number; height: number; depth: number }; // in inches
  category: 'snack' | 'beverage' | 'soap' | 'accessory';
  tags: string[]; // e.g., 'nyc-local', 'premium', 'artisanal'
  brandMinimum: number;
  description: string;
  inStock: boolean;
  rating?: number;
  minOrder?: string;
  freeShipping?: boolean;
}

// Message types
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  products?: CompassProduct[]; // Products to display with this message
  productsByCategory?: { category: string; products: CompassProduct[] }[]; // Products organized by category
  chips?: string[]; // Suggestion chips to show
  interpretation?: string; // System interpretation text
  categories?: string[]; // Parsed categories to display
  isThinking?: boolean; // Whether this is a "thinking" state message
  isThinkingComplete?: boolean; // Whether thinking is complete and should show compact summary
  showThinkingDots?: boolean; // Show bouncing dots (initial thinking state)
  thinkingStatus?: string; // Status text for thinking state
  searchingCategories?: string[]; // Categories being searched during thinking
  categorySearchProgress?: { category: string; count?: number; isSearching: boolean }[]; // Progressive search status with counts
  totalProductsReviewed?: number; // Total number of products reviewed for compact summary
  isCategorySpecific?: boolean; // Whether this is a single-category refinement
  specificCategoryName?: string; // Name of the specific category for refinements
  productContext?: CompassProduct; // Product being asked about in this message
  timestamp: Date;
}

// Cart item with quantity
export interface CartItem {
  product: CompassProduct;
  quantity: number;
}

// Conversation state
export interface CompassState {
  isPanelOpen: boolean;
  messages: Message[];
  activeConstraints: {
    location?: string;
    traySize?: { width: number; height: number };
    aesthetic?: string[];
    categories?: string[];
  };
  selectedProducts: CompassProduct[];
  cartItems: CartItem[]; // Cart with quantities
  entryPoint?: 'icon' | 'search'; // Track how user opened Compass
  currentProduct?: CompassProduct; // Product being viewed on PDP
  currentCategory?: string; // Category being viewed (from "See all")
  pairedProducts?: CompassProduct[]; // Paired products for "Paired Products" category
  initialQuery?: string; // Query passed from search bar
}

interface CompassContextType {
  state: CompassState;
  openPanel: (entryPoint?: 'icon' | 'search', initialQuery?: string) => void;
  closePanel: () => void;
  togglePanel: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Message;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
  clearInitialQuery: () => void;
  addProductToSelection: (product: CompassProduct) => void;
  removeProductFromSelection: (productId: string) => void;
  updateConstraints: (constraints: Partial<CompassState['activeConstraints']>) => void;
  // Cart methods
  addToCart: (product: CompassProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemsByBrand: () => Record<string, CartItem[]>;
  // Product viewing
  setCurrentProduct: (product: CompassProduct | undefined) => void;
  // Category viewing
  setCurrentCategory: (category: string | undefined) => void;
  // Paired products
  setPairedProducts: (products: CompassProduct[] | undefined) => void;
}

const CompassContext = createContext<CompassContextType | undefined>(undefined);

export function CompassProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CompassState>({
    isPanelOpen: false,
    messages: [],
    activeConstraints: {},
    selectedProducts: [],
    cartItems: [],
    entryPoint: undefined,
    currentProduct: undefined,
    currentCategory: undefined,
    pairedProducts: undefined,
    initialQuery: undefined,
  });

  const openPanel = (entryPoint: 'icon' | 'search' = 'icon', initialQuery?: string) => {
    setState(prev => ({ ...prev, isPanelOpen: true, entryPoint, initialQuery }));
  };

  const closePanel = () => {
    setState(prev => ({ ...prev, isPanelOpen: false }));
  };

  const togglePanel = () => {
    setState(prev => ({ ...prev, isPanelOpen: !prev.isPanelOpen }));
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>): Message => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    return newMessage;
  };

  const updateMessage = (messageId: string, updates: Partial<Message>) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      ),
    }));
  };

  const clearMessages = () => {
    setState(prev => ({
      ...prev,
      messages: [],
      activeConstraints: {},
      selectedProducts: [],
      currentProduct: undefined, // Clear product context when starting new conversation
      currentCategory: undefined, // Clear category context when starting new conversation
      pairedProducts: undefined, // Clear paired products when starting new conversation
    }));
  };

  const clearInitialQuery = () => {
    setState(prev => ({
      ...prev,
      initialQuery: undefined,
    }));
  };

  const addProductToSelection = (product: CompassProduct) => {
    setState(prev => ({
      ...prev,
      selectedProducts: [...prev.selectedProducts, product],
    }));
  };

  const removeProductFromSelection = (productId: string) => {
    setState(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter(p => p.id !== productId),
    }));
  };

  const updateConstraints = (constraints: Partial<CompassState['activeConstraints']>) => {
    setState(prev => ({
      ...prev,
      activeConstraints: { ...prev.activeConstraints, ...constraints },
    }));
  };

  // Cart methods
  const addToCart = (product: CompassProduct, quantity: number = 1) => {
    setState(prev => {
      const existingItem = prev.cartItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if already in cart
        return {
          ...prev,
          cartItems: prev.cartItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // Add new item
        return {
          ...prev,
          cartItems: [...prev.cartItems, { product, quantity }],
        };
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cartItems: prev.cartItems.filter(item => item.product.id !== productId),
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setState(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ),
    }));
  };

  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartItemsByBrand = () => {
    return state.cartItems.reduce((grouped, item) => {
      const brandName = item.product.brandName;
      if (!grouped[brandName]) {
        grouped[brandName] = [];
      }
      grouped[brandName].push(item);
      return grouped;
    }, {} as Record<string, CartItem[]>);
  };

  const setCurrentProduct = (product: CompassProduct | undefined) => {
    setState(prev => ({
      ...prev,
      currentProduct: product,
      // Clear category when product is set
      currentCategory: product ? undefined : prev.currentCategory,
    }));
  };

  const setCurrentCategory = (category: string | undefined) => {
    setState(prev => ({
      ...prev,
      currentCategory: category,
      // Always clear product when category is set (no special cases)
      currentProduct: category ? undefined : prev.currentProduct,
    }));
  };

  const setPairedProducts = (products: CompassProduct[] | undefined) => {
    setState(prev => ({
      ...prev,
      pairedProducts: products,
    }));
  };

  const value: CompassContextType = {
    state,
    openPanel,
    closePanel,
    togglePanel,
    addMessage,
    updateMessage,
    clearMessages,
    clearInitialQuery,
    addProductToSelection,
    removeProductFromSelection,
    updateConstraints,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    getCartItemsByBrand,
    setCurrentProduct,
    setCurrentCategory,
    setPairedProducts,
  };

  return (
    <CompassContext.Provider value={value}>
      {children}
    </CompassContext.Provider>
  );
}

export function useCompass() {
  const context = useContext(CompassContext);
  if (context === undefined) {
    throw new Error('useCompass must be used within a CompassProvider');
  }
  return context;
}

