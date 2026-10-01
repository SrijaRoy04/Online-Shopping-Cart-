import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/calculations";

export default function ProductCard({ product, index }) {
  const { dispatch } = useCart();

  function addProduct() {
    dispatch({
      type: "ADD_TO_CART",
      productId: product.id,
      notification: { type: "success", message: `${product.name} added to your bag.` }
    });
  }

  return (
    <article className="product-card" style={{ "--card-order": index }}>
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        <span className="product-tag">{product.tag}</span>
      </div>
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-buy-row">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <button className="add-button" type="button" onClick={addProduct} aria-label={`Add ${product.name} to bag`} title="Add to bag">
            <Plus size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}