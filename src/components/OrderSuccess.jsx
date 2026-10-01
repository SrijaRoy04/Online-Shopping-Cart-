import { CalendarDays, Check, Info, MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/calculations";

function formatAddress(address) {
  return [address.flat, address.street, address.landmark, [address.city, address.state].filter(Boolean).join(", "), address.pin]
    .filter(Boolean)
    .join(", ");
}

export function createOrder(address, method, bank, items, coupon, totals) {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const orderSuffix = globalThis.crypto?.randomUUID?.().replace(/-/g, "").slice(0, 8).toUpperCase()
    || Math.random().toString(36).slice(2, 10).toUpperCase();

  return {
    id: `NS-DEMO-${orderSuffix}`,
    customer: address.fullName,
    address: { ...address },
    items: items.map(({ id, name, price, image, quantity }) => ({ id, name, price, image, quantity })),
    coupon,
    totals: { ...totals },
    paymentMethod: method === "Net Banking" ? `Net Banking · ${bank}` : method,
    deliveryDate: deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    placedAt: new Date().toISOString()
  };
}

export default function OrderSuccess({ order, onContinueShopping }) {
  const { dispatch } = useCart();
  const paymentMessage = order.paymentMethod === "COD"
    ? "Payment will be collected when your order is delivered."
    : "Demo payment simulated successfully. No real transaction was made.";

  function startShopping() {
    dispatch({ type: "CLEAR_CART" });
    try { localStorage.removeItem("northstar-react-order-v1"); } catch { /* Ignore unavailable local storage. */ }
    onContinueShopping();
  }

  return (
    <section className="success-card">
      <div className="success-check"><Check size={20} /></div>
      <p className="eyebrow"><span className="eyebrow-line" /> ORDER PLACED</p>
      <h2>Thank you, {order.customer.split(" ")[0]}.</h2>
      <p className="success-lede">Your next good thing is on its way.</p>
      <div className="order-id"><span>DEMO ORDER ID</span><strong>{order.id}</strong></div>
      <div className="success-details">
        <section>
          <h3><MapPin size={13} /> Delivery</h3>
          <strong>{order.customer}</strong>
          <p>{formatAddress(order.address)}</p>
          <p>{order.address.mobile} · {order.address.email}</p>
          <div className="delivery-date"><CalendarDays size={12} /> Estimated {order.deliveryDate}</div>
        </section>
        <section>
          <h3><ShoppingBag size={13} /> Order summary</h3>
          {order.items.map((item) => (
            <div className="success-item" key={item.id}><span>{item.name} <small>× {item.quantity}</small></span><strong>{formatCurrency(item.price * item.quantity)}</strong></div>
          ))}
          <div className="success-item"><span>Subtotal</span><strong>{formatCurrency(order.totals.subtotal)}</strong></div>
          {order.coupon && <div className="success-item saving"><span>{order.coupon} discount</span><strong>−{formatCurrency(order.totals.discount)}</strong></div>}
          <div className="success-item"><span>GST</span><strong>{formatCurrency(order.totals.gst)}</strong></div>
          <div className="success-item success-total"><span>{order.paymentMethod === "COD" ? "Payable on delivery" : "Total paid (demo)"}</span><strong>{formatCurrency(order.totals.grandTotal)}</strong></div>
          <p className="payment-result"><Info size={11} /> {order.paymentMethod} · {paymentMessage}</p>
        </section>
      </div>
      <p className="thank-you">Thanks for choosing well.<span>We hope it makes every day a little better.</span></p>
      <button className="primary-button continue-shopping-button" type="button" onClick={startShopping}>Continue shopping <ShoppingBag size={13} /></button>
    </section>
  );
}