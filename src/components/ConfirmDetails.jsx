import { ArrowLeft, ArrowRight, MapPin, Pencil } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/calculations";

function completeAddress(address) {
  return [address.flat, address.street, address.landmark, [address.city, address.state].filter(Boolean).join(", "), address.pin]
    .filter(Boolean)
    .join(", ");
}

export default function ConfirmDetails({ address, onEdit, onContinue }) {
  const { state, totals } = useCart();

  return (
    <section className="checkout-card review-card">
      <div className="checkout-card-heading">
        <span className="step-kicker">STEP 02 / 04</span>
        <h2>One last look.</h2>
        <p>Review your delivery details and order before choosing how to pay.</p>
      </div>
      <div className="review-address">
        <div>
          <p className="review-label"><MapPin size={11} /> DELIVERING TO</p>
          <strong>{address.fullName}</strong>
          <p>{completeAddress(address)}</p>
          <p>{address.mobile} · {address.email}</p>
        </div>
        <button className="text-button" type="button" onClick={onEdit}><Pencil size={12} /> Edit address</button>
      </div>
      <div className="review-items">
        <h3>Your items <span>{state.items.reduce((sum, item) => sum + item.quantity, 0)} total</span></h3>
        {state.items.map((item) => (
          <div className="review-product" key={item.id}>
            <img src={item.image} alt="" />
            <div><strong>{item.name}</strong><span>{item.quantity} × {formatCurrency(item.price)}</span></div>
            <strong>{formatCurrency(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="review-totals">
        <div><span>Subtotal</span><strong>{formatCurrency(totals.subtotal)}</strong></div>
        <div className={state.coupon ? "saving" : ""}>
          <span>{state.coupon ? `Coupon ${state.coupon}` : "Coupon discount"}</span>
          <strong>{state.coupon ? `−${formatCurrency(totals.discount)}` : formatCurrency(0)}</strong>
        </div>
        <div><span>GST (18%)</span><strong>{formatCurrency(totals.gst)}</strong></div>
        <div className="review-grand-total"><span>Final payable amount</span><strong>{formatCurrency(totals.grandTotal)}</strong></div>
      </div>
      <div className="checkout-actions">
        <button className="secondary-button" type="button" onClick={onEdit}><ArrowLeft size={13} /> Edit address</button>
        <button className="primary-button" type="button" onClick={onContinue}>Confirm details &amp; continue <ArrowRight size={13} /></button>
      </div>
      <p className="demo-disclaimer">College project demo. No real payment gateway is connected.</p>
    </section>
  );
}