import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CouponForm() {
  const { state, dispatch } = useCart();
  const [code, setCode] = useState(state.coupon || "");

  function applyCoupon(event) {
    event.preventDefault();
    dispatch({ type: "APPLY_COUPON", code });
    setCode(code.trim().toUpperCase());
  }

  function removeCoupon() {
    setCode("");
    dispatch({
      type: "REMOVE_COUPON",
      notification: { type: "success", message: "Coupon removed." }
    });
  }

  return (
    <form className="coupon-form" onSubmit={applyCoupon}>
      <label htmlFor="coupon-code">Have a little code?</label>
      <div className="coupon-controls">
        <input
          id="coupon-code"
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter coupon code"
          autoComplete="off"
          maxLength={20}
        />
        <button className="apply-button" type="submit">Apply</button>
      </div>
      {state.coupon ? <p className="coupon-applied">{state.coupon} is applied</p> : <p className="coupon-hint">Try SAVE10, SAVE20 or SAVE30</p>}
      {state.coupon && <button className="coupon-remove" type="button" onClick={removeCoupon}>Remove coupon</button>}
    </form>
  );
}