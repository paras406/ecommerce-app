import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import type { CartItem } from "./types";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartCount = (state: RootState): number =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: RootState): number =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
