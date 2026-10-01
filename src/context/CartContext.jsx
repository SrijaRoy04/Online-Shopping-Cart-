import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { cartReducer, createInitialCartState } from "../reducer/cartReducer";
import { calculateTotals } from "../utils/calculations";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, createInitialCartState);
  const totals = calculateTotals(state.items, state.coupon);

  useEffect(() => {
    try {
      localStorage.setItem("northstar-react-cart-v1", JSON.stringify({
        items: state.items.map(({ id, quantity }) => ({ id, quantity })),
        coupon: state.coupon
      }));
    } catch {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: { type: "error", message: "Your browser could not save the cart." }
      });
    }
  }, [state.items, state.coupon]);

  useEffect(() => {
    if (!state.notification) return undefined;
    const timer = window.setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 3200);
    return () => window.clearTimeout(timer);
  }, [state.notification]);

  const contextValue = useMemo(() => ({ state, dispatch, totals }), [state, totals]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}