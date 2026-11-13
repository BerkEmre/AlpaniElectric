import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuoteItem } from '../types';

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: QuoteItem) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateItemNote: (index: number, note: string) => void;
  clearQuote: () => void;
  totalQuantity: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'alpani_quote_schedule';

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to sync quote schedule to localStorage', e);
    }
  }, [items]);

  const addItem = (newItem: QuoteItem) => {
    setItems(prev => {
      // Check if identical item (same product, specs, variant) already exists
      const existingIdx = prev.findIndex(i =>
        i.productId === newItem.productId &&
        i.wattage === newItem.wattage &&
        i.cct === newItem.cct &&
        i.beamAngle === newItem.beamAngle &&
        i.bodyColor === newItem.bodyColor &&
        i.controlType === newItem.controlType
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        if (newItem.itemNote && !updated[existingIdx].itemNote) {
          updated[existingIdx].itemNote = newItem.itemNote;
        }
        return updated;
      }
      return [...prev, newItem];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    setItems(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].quantity = quantity;
      }
      return updated;
    });
  };

  const updateItemNote = (index: number, note: string) => {
    setItems(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].itemNote = note;
      }
      return updated;
    });
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateItemNote,
        clearQuote,
        totalQuantity,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
