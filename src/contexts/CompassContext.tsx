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
}

interface CompassContextType {
  state: CompassState;
  openPanel: (entryPoint?: 'icon' | 'search') => void;
  closePanel: () => void;
  togglePanel: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
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
  setCurrentProduct: (product: CompassProduct) => void;
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
  });

  const openPanel = (entryPoint: 'icon' | 'search' = 'icon') => {
    setState(prev => ({ ...prev, isPanelOpen: true, entryPoint }));
  };

  const closePanel = () => {
    setState(prev => ({ ...prev, isPanelOpen: false }));
  };

  const togglePanel = () => {
    setState(prev => ({ ...prev, isPanelOpen: !prev.isPanelOpen }));
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const clearMessages = () => {
    setState(prev => ({
      ...prev,
      messages: [],
      activeConstraints: {},
      selectedProducts: [],
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

  const setCurrentProduct = (product: CompassProduct) => {
    setState(prev => ({
      ...prev,
      currentProduct: product,
    }));
  };

  const value: CompassContextType = {
    state,
    openPanel,
    closePanel,
    togglePanel,
    addMessage,
    clearMessages,
    addProductToSelection,
    removeProductFromSelection,
    updateConstraints,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    getCartItemsByBrand,
    setCurrentProduct,
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

