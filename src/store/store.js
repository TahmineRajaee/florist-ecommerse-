import { create } from "zustand";

export const useStore = create((set, get) => ({
  categories: [],
  cart: [],
  setCategories: (categories) => set({ categories }),
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.id === product.id && item.categoryId === product.categoryId
      );
      if (existingIndex !== -1) {
        const newCart = [...state.cart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
        return { cart: newCart };
      }
      return { cart: [...state.cart, { ...product, quantity }] };
    }),
  removeFromCart: (productId, categoryId) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === productId && item.categoryId === categoryId)
      ),
    })),
  updateQuantity: (productId, categoryId, quantity) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === productId && item.categoryId === categoryId
          ? { ...item, quantity }
          : item
      );
      return { cart: newCart };
    }),
  getTotalPrice: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
