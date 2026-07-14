import type { UnknownAction } from "redux";
import type { CartItem } from "@/lib/types/cart";
import {
  ADD_TO_CART,
  CLEAR_CART,
  HYDRATE_CART,
  REMOVE_FROM_CART,
  SET_QUANTITY,
} from "@/lib/actions/cart";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export default function cartReducer(
  state: CartState = initialState,
  action: UnknownAction
): CartState {
  switch (action.type) {
    case HYDRATE_CART:
      return { ...state, items: action.payload as CartItem[] };

    case ADD_TO_CART: {
      const payload = action.payload as Omit<CartItem, "quantity">;
      const existing = state.items.find((item) => item.id === payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...payload, quantity: 1 }],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== (action.payload as number)
        ),
      };

    case SET_QUANTITY: {
      const { id, quantity } = action.payload as {
        id: number;
        quantity: number;
      };
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
}
