import { useEffect, useState } from "react";
import { ArrowRight, Compass, Sun } from "lucide-react";
import AddressForm from "./components/AddressForm";
import Cart from "./components/Cart";
import CheckoutStepper from "./components/CheckoutStepper";
import ConfirmDetails from "./components/ConfirmDetails";
import Navbar from "./components/Navbar";
import OrderSuccess, { createOrder } from "./components/OrderSuccess";
import PaymentOptions from "./components/PaymentOptions";
import ProductList from "./components/ProductList";
import { useCart } from "./context/CartContext";

const ORDER_STORAGE_KEY = "northstar-react-order-v1";
const ADDRESS_STORAGE_KEY = "northstar-react-address-v1";

function readStoredOrder() {
  try { return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "null"); }
  catch { return null; }
}

function readStoredAddress() {
  try { return JSON.parse(localStorage.getItem(ADDRESS_STORAGE_KEY) || "null") || { state: "West Bengal" }; }
  catch { return { state: "West Bengal" }; }
}

export default function App() {
  const { state, dispatch, totals } = useCart();
  const [step, setStep] = useState(() => readStoredOrder() ? "Success" : "Cart");
  const [address, setAddress] = useState(readStoredAddress);
  const [order, setOrder] = useState(readStoredOrder);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!state.notification) return undefined;
    setToast(state.notification);
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [state.notification]);

  function beginCheckout() {
    if (!state.items.length) {
      setToast({ type: "error", message: "Add an item to your bag before checking out." });
      return;
    }
    if (order) {
      setOrder(null);
      try { localStorage.removeItem(ORDER_STORAGE_KEY); } catch { /* Ignore unavailable local storage. */ }
    }
    setStep("Address");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveAddress(nextAddress) {
    setAddress(nextAddress);
    try { localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(nextAddress)); } catch { /* The current form remains usable without storage. */ }
  }

  function backToCart() {
    setStep("Cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function placeOrder(method, bank) {
    const nextOrder = createOrder(address, method, bank, state.items, state.coupon, totals);
    setOrder(nextOrder);
    setStep("Success");
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(nextOrder));
    } catch {
      setToast({ type: "error", message: "Order placed, but this browser could not save the receipt." });
    }
    dispatch({ type: "CLEAR_CART" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startNewShopping() {
    setOrder(null);
    setStep("Cart");
    setAddress({ state: "West Bengal" });
    try {
      localStorage.removeItem(ORDER_STORAGE_KEY);
      localStorage.removeItem(ADDRESS_STORAGE_KEY);
    } catch { /* Continue shopping remains available without storage. */ }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isCheckout = step !== "Cart";

  return (
    <>
      <Navbar />
      <main id="top">
        {!isCheckout ? (
          <>
            <section className="welcome-band" aria-labelledby="welcome-title">
              <div className="welcome-copy">
                <p className="eyebrow"><span className="eyebrow-line" /> GOOD TECH, NO GUESSWORK</p>
                <h1 id="welcome-title">The little things<br />that make <em>every day.</em></h1>
                <p className="welcome-subtitle">Useful tech. Thoughtfully picked. Ready for wherever your day takes you.</p>
                <a className="welcome-link" href="#catalog">Explore the collection <ArrowRight size={13} /></a>
              </div>
              <div className="welcome-art" aria-hidden="true">
                <div className="art-label"><span>FIELD NOTES</span><span>01 / 08</span></div>
                <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1100&q=85" alt="" fetchPriority="high" />
                <span className="art-stamp"><Sun size={14} /> Curated for<br />your everyday</span>
              </div>
              <div className="welcome-index" aria-hidden="true">01—08</div>
            </section>
            <section className="shop-section" aria-label="Shop and cart">
              <div className="shop-layout">
                <ProductList />
                <Cart onCheckout={beginCheckout} />
              </div>
            </section>
          </>
        ) : (
          <section className="checkout-flow" aria-labelledby="checkout-page-title">
            <div className="checkout-page-heading">
              {step !== "Success" && <button className="back-to-shop" type="button" onClick={backToCart}>← Back to bag</button>}
              <p className="eyebrow"><span className="eyebrow-line" /> NORTHSTAR CHECKOUT</p>
              <h1 id="checkout-page-title">{step === "Success" ? "A good choice, " : "A few details, "}<em>{step === "Success" ? "on its way." : "then it’s yours."}</em></h1>
            </div>
            <CheckoutStepper currentStep={step} />
            <div className="checkout-stage stage-enter" key={step}>
              {step === "Address" && <AddressForm initialAddress={address} onAddressChange={saveAddress} onBack={backToCart} onContinue={(nextAddress) => { saveAddress(nextAddress); setStep("Confirm Details"); }} />}
              {step === "Confirm Details" && <ConfirmDetails address={address} onEdit={() => setStep("Address")} onContinue={() => setStep("Payment")} />}
              {step === "Payment" && <PaymentOptions onBack={() => setStep("Confirm Details")} onPlaceOrder={placeOrder} />}
              {step === "Success" && order && <OrderSuccess order={order} onContinueShopping={startNewShopping} />}
            </div>
          </section>
        )}
      </main>
      <footer className="site-footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Compass size={13} /></span><span>northstar<span className="brand-period">.</span></span></a>
        <p>Good things, chosen well.</p>
        <span className="footer-meta">Made for your everyday <Sun size={12} /></span>
      </footer>
      {toast && <div className={`toast visible ${toast.type}`} role="status" aria-live="polite">{toast.message}</div>}
    </>
  );
}