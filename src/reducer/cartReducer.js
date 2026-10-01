import { products } from "../data/products";
import { COUPON_RATES } from "../utils/calculations";

const productsById = new Map(products.map((product) => [product.id, product]));

export function createInitialCartState() {
  try {
    const saved = JSON.parse(localStorage.getItem("northstar-react-cart-v1") || "{}");
    const items = Array.isArray(saved.items)
      ? saved.items
          .filter((item) => productsById.has(item.id) && Number.isInteger(item.quantity) && item.quantity > 0)
          .map((item) => ({ ...productsById.get(item.id), quantity: Math.min(item.quantity, 99) }))
      : [];

    return {
      items,
      coupon: items.length && Object.hasOwn(COUPON_RATES, saved.coupon) ? saved.coupon : null,
      notification: null
    };
  } catch {
    return { items: [], coupon: null, notification: null };
  }
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = productsById.get(action.productId);
      if (!product) return state;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing?.quantity >= 99) {
        return { ...state, notification: { type: "error", message: "A maximum of 99 of each item can be added." } };
      }

      const items = existing
        ? state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, { ...product, quantity: 1 }];
      return { ...state, items, notification: action.notification };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.productId),
        coupon: state.items.length === 1 ? null : state.coupon,
        notification: action.notification
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => item.id === action.productId
          ? { ...item, quantity: Math.min(99, item.quantity + 1) }
          : item)
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => item.id === action.productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item)
      };
    case "UPDATE_QUANTITY": {
      const quantity = Number(action.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return state;
      return {
        ...state,
        items: state.items.map((item) => item.id === action.productId ? { ...item, quantity } : item)
      };
    }
    case "APPLY_COUPON": {
      const code = String(action.code || "").trim().toUpperCase();
      if (!Object.hasOwn(COUPON_RATES, code)) {
        return { ...state, notification: { type: "error", message: "Invalid code. Try SAVE10, SAVE20 or SAVE30." } };
      }
      if (!state.items.length) {
        return { ...state, notification: { type: "error", message: "Add an item before applying a coupon." } };
      }
      return {
        ...state,
        coupon: code,
        notification: { type: "success", message: `${code} applied. ${COUPON_RATES[code] * 100}% off your items.` }
      };
    }
    case "REMOVE_COUPON":
      return { ...state, coupon: null, notification: action.notification || null };
    case "CLEAR_CART":
      return { items: [], coupon: null, notification: null };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.notification };
    case "CLEAR_NOTIFICATION":
      return state.notification ? { ...state, notification: null } : state;
    default:
      return state;
  }
}