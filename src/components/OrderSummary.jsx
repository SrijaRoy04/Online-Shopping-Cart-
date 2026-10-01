import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/calculations";

export default function OrderSummary({ compact = false }) {
  const { state, totals, dispatch } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className={`bill-summary${compact ? " compact-summary" : ""}`} aria-label="Order summary">
      {compact && <p className="eyebrow"><span className="eyebrow-line" /> ORDER TOTAL</p>}
      {compact && <h3 className="compact-total">{formatCurrency(totals.grandTotal)}</h3>}
      {compact && <p className="summary-subtitle">{itemCount} {itemCount === 1 ? "item" : "items"} · GST included</p>}
      <div className="bill-line"><span>Subtotal</span><strong>{formatCurrency(totals.subtotal)}</strong></div>
      {state.coupon && (
        <div className="bill-line discount-line">
          <span>Discount <small>({state.coupon})</small></span>
          <strong>−{formatCurrency(totals.discount)}</strong>
        </div>
      )}
      <div className="bill-line"><span>GST <small>(18%)</small></span><strong>{formatCurrency(totals.gst)}</strong></div>
      <div className="bill-total"><span>Total to pay</span><strong>{formatCurrency(totals.grandTotal)}</strong></div>
      {!compact && <p className="tax-note">GST calculated after discount</p>}
      {compact && <div className="mini-summary-note">Demo checkout · no real payment is collected</div>}
    </section>
  );
}