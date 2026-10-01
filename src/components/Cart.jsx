import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import CouponForm from "./CouponForm";
import OrderSummary from "./OrderSummary";

export default function Cart({ onCheckout }) {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="cart-panel" id="cart" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR PICKS</p>
          <h2 id="cart-title">Your bag <span>({itemCount})</span></h2>
        </div>
        <ShoppingBag className="cart-heading-icon" size={18} />
      </div>
      {state.items.length ? (
        <>
          <div className="cart-content">{state.items.map((item) => <CartItem key={item.id} item={item} />)}</div>
          <div className="cart-bottom">
            <CouponForm />
            <OrderSummary />
            <button className="checkout-button" type="button" onClick={onCheckout}>
              <span>Proceed to checkout</span><ArrowRight size={14} />
            </button>
            <p className="secure-note">Secure, simple, and yours</p>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <span className="empty-cart-icon"><ShoppingBag size={17} /></span>
          <strong>Your bag is taking a breather.</strong>
          <p>Find something useful for your everyday.</p>
          <a className="continue-button" href="#catalog">Continue shopping</a>
        </div>
      )}
    </aside>
  );
}