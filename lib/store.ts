import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import { thunk, type ThunkDispatch } from "redux-thunk";
import type { UnknownAction } from "redux";
import cartReducer, { type CartState } from "@/lib/reducers/cart";
import type { CartItem } from "@/lib/types/cart";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export const makeStore = () => createStore(rootReducer, applyMiddleware(thunk));

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = {
  cart: CartState;
};
export type AppDispatch = ThunkDispatch<RootState, undefined, UnknownAction>;

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartCount = (state: RootState): number =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: RootState): number =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
