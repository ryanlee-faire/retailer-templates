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
  chips?: string[]; // Suggestion chips to show
  interpretation?: string; // System interpretation text
  timestamp: Date;
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
  entryPoint?: 'icon' | 'search'; // Track how user opened Compass
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
}

const CompassContext = createContext<CompassContextType | undefined>(undefined);

export function CompassProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CompassState>({
    isPanelOpen: false,
    messages: [],
    activeConstraints: {},
    selectedProducts: [],
    entryPoint: undefined,
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

