import { create } from 'zustand';
import { getProduct } from './api';
import type { Product, FavoritesStore } from './types';

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  addFavorite: async (product: Product) => {
    set((state) => {
      if (!state.favorites.find((p) => p.id === product.id)) {
        return { favorites: [...state.favorites, product] };
      }
      return state;
    });
  },
  removeFavorite: (productId: number) => {
    set((state) => ({ favorites: state.favorites.filter((p) => p.id !== productId) }));
  },
  isFavorite: (productId: number) => {
    return get().favorites.some((p) => p.id === productId);
  },
}));

const STORAGE_KEY = 'favorites';

(async () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const ids: number[] = JSON.parse(stored);
        const products = await Promise.all(ids.map(async (id) => await getProduct(id.toString())));
        useFavoritesStore.setState({ favorites: products });
      } catch {
        useFavoritesStore.setState({ favorites: [] });
      }
    }
  }
})();

useFavoritesStore.subscribe((state) => {
  if (typeof window !== 'undefined') {
    const ids = state.favorites.map((p) => p.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
});
