import type { CartItem } from "@/lib/types/cart";

export const HYDRATE_CART = "cart/hydrate" as const;
export const ADD_TO_CART = "cart/add" as const;
export const REMOVE_FROM_CART = "cart/remove" as const;
export const SET_QUANTITY = "cart/setQuantity" as const;
export const CLEAR_CART = "cart/clear" as const;

export function hydrateCart(items: CartItem[]) {
  return { type: HYDRATE_CART, payload: items };
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  return { type: ADD_TO_CART, payload: item };
}

export function removeFromCart(id: number) {
  return { type: REMOVE_FROM_CART, payload: id };
}

export function setQuantity(payload: { id: number; quantity: number }) {
  return { type: SET_QUANTITY, payload };
}

export function clearCart() {
  return { type: CLEAR_CART };
}

export type CartAction =
  | ReturnType<typeof hydrateCart>
  | ReturnType<typeof addToCart>
  | ReturnType<typeof removeFromCart>
  | ReturnType<typeof setQuantity>
  | ReturnType<typeof clearCart>;
