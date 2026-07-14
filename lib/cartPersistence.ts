import type { AppStore } from "./store";
import { hydrateCart } from "./cartSlice";
import type { CartItem } from "./types";

const STORAGE_KEY = "ecommerce-cart";

function loadCart(): CartItem[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : null;
  } catch {
    // Corrupt or inaccessible storage: start with an empty cart
    return null;
  }
}

/**
 * Hydrates the store from localStorage and keeps localStorage in sync on
 * every cart change. Returns the store's unsubscribe function so the caller
 * can clean up (avoids listener leaks across Fast Refresh).
 */
export function setUpCartPersistence(store: AppStore): () => void {
  const saved = loadCart();
  if (saved) {
    store.dispatch(hydrateCart(saved));
  }

  let lastItems = store.getState().cart.items;
  return store.subscribe(() => {
    const items = store.getState().cart.items;
    if (items === lastItems) return;
    lastItems = items;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable; cart still works in-memory
    }
  });
}
