import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/calculations";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <article className="cart-item">
      <img className="cart-item-image" src={item.image} alt="" loading="lazy" />
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-unit">{formatCurrency(item.price)} each</p>
        <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
          <button type="button" onClick={() => dispatch({ type: "DECREASE_QUANTITY", productId: item.id })} aria-label={`Decrease ${item.name} quantity`}>
            <Minus size={12} />
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button type="button" onClick={() => dispatch({ type: "INCREASE_QUANTITY", productId: item.id })} aria-label={`Increase ${item.name} quantity`}>
            <Plus size={12} />
          </button>
        </div>
      </div>
      <div className="cart-item-end">
        <strong className="cart-item-total">{formatCurrency(item.price * item.quantity)}</strong>
        <button
          className="remove-button"
          type="button"
          onClick={() => dispatch({
            type: "REMOVE_FROM_CART",
            productId: item.id,
            notification: { type: "success", message: `${item.name} removed from your bag.` }
          })}
          aria-label={`Remove ${item.name}`}
          title="Remove item"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </article>
  );
}