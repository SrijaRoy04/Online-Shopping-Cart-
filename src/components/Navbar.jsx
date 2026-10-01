import { ShoppingBag, Compass, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Northstar Goods home">
          <span className="brand-mark"><Compass size={15} /></span>
          <span>northstar<span className="brand-period">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#catalog">Shop</a>
          <a className="nav-link" href="#catalog">Audio</a>
          <a className="nav-link" href="#catalog">Computers</a>
        </nav>
        <div className="header-actions">
          <span className="header-note"><Truck size={14} aria-hidden="true" /> Free delivery over ₹5,000</span>
          <a className="cart-shortcut" href="#cart" aria-label={`Jump to bag, ${itemCount} items`}>
            <ShoppingBag size={17} aria-hidden="true" />
            <span className="cart-shortcut-label">Bag</span>
            <span className="cart-count" aria-live="polite">{itemCount}</span>
          </a>
        </div>
      </div>
    </header>
  );
}