import { create } from 'zustand';
import { getProduct } from './api';
import type { Product, CartItem, CartStore } from './types';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: async (product: Product) => {
    const existing = get().items.find((item) => item.id === product.id);
    if (existing) {
      set({
        items: get().items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId: number) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },
  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((item) => item.id !== productId) });
    } else {
      set({
        items: get().items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
      });
    }
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
}));

const STORAGE_KEY = 'cart';

(async () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: { id: number; quantity: number }[] = JSON.parse(stored);
        const products = await Promise.all(
          parsed.map(async ({ id, quantity }) => {
            const product = await getProduct(id.toString());
            return { ...product, quantity };
          }),
        );
        useCartStore.setState({ items: products });
      } catch {
        useCartStore.setState({ items: [] });
      }
    }
  }
})();

useCartStore.subscribe((state) => {
  if (typeof window !== 'undefined') {
    const toSave = state.items.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }
});
