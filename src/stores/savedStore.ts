import { create } from 'zustand';
import { MovingService } from '../types';

interface SavedState {
  savedItems: MovingService[];
  addItem: (item: MovingService) => void;
  removeItem: (id: string) => void;
  clearStore: () => void;
}

export const useSavedStore = create<SavedState>((set) => ({
  savedItems: [],
  addItem: (item) => set((state) => {
    if (state.savedItems.some((i) => i.id === item.id)) return state;
    return { savedItems: [...state.savedItems, item] };
  }),
  removeItem: (id) => set((state) => ({
    savedItems: state.savedItems.filter((item) => item.id !== id),
  })),
  clearStore: () => set({ savedItems: [] }),
}));
