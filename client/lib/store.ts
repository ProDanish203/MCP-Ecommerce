import { create } from "zustand";
import type { Product } from "./types";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  isOpen: boolean;
  cartItems: CartItem[];
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  cartItems: [],

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true,
        };
      }

      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        isOpen: true,
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== productId),
    })),

  increaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
