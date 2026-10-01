import { useState } from "react";
import { ArrowLeft, Building2, CheckCircle2, CreditCard, LockKeyhole, PackageCheck, Smartphone, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import OrderSummary from "./OrderSummary";

const paymentMethods = [
  { id: "COD", title: "Cash on Delivery", description: "Pay when your order arrives", Icon: Truck },
  { id: "UPI", title: "UPI", description: "Simulated UPI ID confirmation", Icon: Smartphone },
  { id: "Card", title: "Credit / Debit Card", description: "Demo form only · never use real card details", Icon: CreditCard },
  { id: "Net Banking", title: "Net Banking", description: "Choose a sample bank to simulate", Icon: Building2 }
];

const banks = ["SBI", "HDFC", "ICICI", "Axis Bank", "PNB"];

function validate(method, values) {
  const errors = {};
  if (method === "UPI" && !/^[\w.-]{2,}@[\w.-]{2,}$/.test(values.upiId.trim())) {
    errors.upiId = "Enter a valid demo UPI ID, such as student@upi.";
  }
  if (method === "Card") {
    if (!values.cardholder.trim()) errors.cardholder = "Enter the demo cardholder name.";
    if (!/^\d{16}$/.test(values.cardNumber.replace(/\D/g, ""))) errors.cardNumber = "Enter the 16-digit sample number shown above.";
    const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(values.expiry.trim());
    if (!match) errors.expiry = "Use a valid future date in MM/YY format.";
    else {
      const month = Number(match[1]);
      const year = 2000 + Number(match[2]);
      const now = new Date();
      if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) errors.expiry = "The demo expiry date must be in the future.";
    }
    if (!/^\d{3,4}$/.test(values.cvv)) errors.cvv = "Enter the 3 or 4 digit sample CVV.";
  }
  if (method === "Net Banking" && !banks.includes(values.bank)) errors.bank = "Choose a sample bank to continue.";
  return errors;
}

function PaymentField({ id, label, value, error, onChange, fieldClassName = "", ...props }) {
  return (
    <label className={`form-field ${fieldClassName}${error ? " has-error" : ""}`} htmlFor={id}>
      {label} <span>*</span>
      <input id={id} value={value} aria-invalid={Boolean(error)} onChange={(event) => onChange(event.target.value)} {...props} />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export default function PaymentOptions({ onBack, onPlaceOrder }) {
  const { dispatch } = useCart();
  const [method, setMethod] = useState("COD");
  const [values, setValues] = useState({ upiId: "", cardholder: "", cardNumber: "", expiry: "", cvv: "", bank: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: "" }));
  }

  function placeOrder(event) {
    event.preventDefault();
    const nextErrors = validate(method, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.currentTarget.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      onPlaceOrder(method, method === "Net Banking" ? values.bank : "");
      dispatch({
        type: "SET_NOTIFICATION",
        notification: {
          type: "success",
          message: method === "COD" ? "Demo order placed. Payment is due at delivery." : "Demo payment confirmed. No real transaction occurred."
        }
      });
      setBusy(false);
    }, 500);
  }

  return (
    <section className="checkout-card payment-card">
      <div className="checkout-card-heading">
        <span className="step-kicker">STEP 03 / 04</span>
        <h2>Choose how to pay.</h2>
        <p>Every option below is simulated for this college project demo.</p>
      </div>
      <form onSubmit={placeOrder} noValidate>
        <fieldset className="payment-options">
          <legend className="sr-only">Payment method</legend>
          {paymentMethods.map(({ id, title, description, Icon }) => (
            <label className={`payment-option${method === id ? " selected" : ""}`} key={id}>
              <input type="radio" name="paymentMethod" value={id} checked={method === id} onChange={() => { setMethod(id); setErrors({}); }} />
              <span className="payment-option-icon"><Icon size={16} /></span>
              <span><strong>{title}</strong><small>{description}</small></span>
              <CheckCircle2 className="option-check" size={14} />
            </label>
          ))}
        </fieldset>
        <div className="payment-detail">
          {method === "COD" && (
            <div className="payment-message"><PackageCheck size={18} /><span><strong>Payment will be collected at delivery.</strong><small>No payment is due now. This is a simulated COD selection.</small></span></div>
          )}
          {method === "UPI" && (
            <>
              <PaymentField id="upi-id" label="Demo UPI ID" value={values.upiId} error={errors.upiId} onChange={(value) => update("upiId", value)} placeholder="student@upi" autoComplete="off" />
              <p className="payment-hint">Use a demo-format ID only. No transaction will occur.</p>
            </>
          )}
          {method === "Card" && (
            <>
              <p className="card-demo-warning"><strong>DEMO ONLY.</strong> Use sample values, never real card details. Card fields are not saved.</p>
              <div className="form-grid card-demo-fields">
                <PaymentField id="cardholder" label="Cardholder name" value={values.cardholder} error={errors.cardholder} onChange={(value) => update("cardholder", value)} fieldClassName="span-2" autoComplete="off" placeholder="Demo Student" />
                <PaymentField id="card-number" label="Demo card number" value={values.cardNumber} error={errors.cardNumber} onChange={(value) => update("cardNumber", value)} fieldClassName="span-2" inputMode="numeric" maxLength={19} autoComplete="off" placeholder="4242 4242 4242 4242" />
                <PaymentField id="card-expiry" label="Expiry (MM/YY)" value={values.expiry} error={errors.expiry} onChange={(value) => update("expiry", value)} maxLength={5} autoComplete="off" placeholder="12/30" />
                <PaymentField id="card-cvv" label="Demo CVV" value={values.cvv} error={errors.cvv} onChange={(value) => update("cvv", value)} inputMode="numeric" maxLength={4} autoComplete="off" placeholder="123" />
              </div>
            </>
          )}
          {method === "Net Banking" && (
            <>
              <label className={`form-field${errors.bank ? " has-error" : ""}`} htmlFor="bank-name">Select a sample bank <span>*</span>
                <select id="bank-name" value={values.bank} aria-invalid={Boolean(errors.bank)} onChange={(event) => update("bank", event.target.value)}>
                  <option value="">Choose a bank</option>
                  {banks.map((bank) => <option key={bank}>{bank}</option>)}
                </select>
                {errors.bank && <small className="field-error">{errors.bank}</small>}
              </label>
              <p className="payment-hint">No banking credentials are requested. The redirect is simulated.</p>
            </>
          )}
        </div>
        <p className="form-error-summary" role="alert">{Object.keys(errors).length ? "Please correct the highlighted payment details." : ""}</p>
        <div className="checkout-actions">
          <button className="secondary-button" type="button" onClick={onBack}><ArrowLeft size={13} /> Back to review</button>
          <button className="primary-button" type="submit" disabled={busy}>{busy ? "Simulating…" : "Place demo order"} {busy ? <LockKeyhole size={12} /> : <LockKeyhole size={12} />}</button>
        </div>
      </form>
      <OrderSummary compact />
      <p className="demo-disclaimer">Demonstration only. Do not enter actual financial information.</p>
    </section>
  );
}