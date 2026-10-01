import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const fields = [
  { key: "fullName", label: "Full name", required: true, autoComplete: "name", wide: true },
  { key: "mobile", label: "Mobile number", required: true, autoComplete: "tel-national", type: "tel", inputMode: "numeric", maxLength: 10, placeholder: "10-digit mobile number" },
  { key: "email", label: "Email address", required: true, autoComplete: "email", type: "email", placeholder: "you@example.com" },
  { key: "flat", label: "House / flat number", required: true, autoComplete: "address-line1" },
  { key: "street", label: "Street / locality", required: true, autoComplete: "address-line2" },
  { key: "landmark", label: "Landmark", required: false, placeholder: "Optional" },
  { key: "city", label: "City", required: true, autoComplete: "address-level2" },
  { key: "state", label: "State", required: true, select: true },
  { key: "pin", label: "PIN code", required: true, autoComplete: "postal-code", inputMode: "numeric", maxLength: 6, placeholder: "6-digit PIN code" }
];

function validateAddress(address) {
  const errors = {};
  ["fullName", "flat", "street", "city", "state"].forEach((key) => {
    if (!String(address[key] || "").trim()) errors[key] = "This field is required.";
  });
  if (!/^\d{10}$/.test(String(address.mobile || "").trim())) errors.mobile = "Enter a valid 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(address.email || "").trim())) errors.email = "Enter a valid email address.";
  if (!/^\d{6}$/.test(String(address.pin || "").trim())) errors.pin = "Enter a valid 6-digit PIN code.";
  return errors;
}

export default function AddressForm({ initialAddress, onAddressChange, onBack, onContinue }) {
  const [values, setValues] = useState(() => ({ state: "West Bengal", ...initialAddress }));
  const [errors, setErrors] = useState({});

  function updateField(key, value) {
    const nextValues = { ...values, [key]: value };
    setValues(nextValues);
    onAddressChange(nextValues);
    if (errors[key]) setErrors((current) => ({ ...current, [key]: "" }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateAddress(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.currentTarget.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    onContinue(values);
  }

  return (
    <div className="checkout-columns">
      <section className="checkout-card">
        <div className="checkout-card-heading">
          <span className="step-kicker">STEP 01 / 04</span>
          <h2>Where should we send it?</h2>
          <p>Enter the details for your delivery.</p>
        </div>
        <form className="address-form" onSubmit={submit} noValidate>
          <div className="form-grid">
            {fields.map((field) => (
              <label className={`form-field${field.wide ? " span-2" : ""}${errors[field.key] ? " has-error" : ""}`} htmlFor={`address-${field.key}`} key={field.key}>
                {field.label} {field.required ? <span>*</span> : <small>(optional)</small>}
                {field.select ? (
                  <select
                    id={`address-${field.key}`}
                    name={field.key}
                    autoComplete="address-level1"
                    value={values[field.key]}
                    aria-invalid={Boolean(errors[field.key])}
                    onChange={(event) => updateField(field.key, event.target.value)}
                  >
                    {states.map((state) => <option key={state}>{state}</option>)}
                  </select>
                ) : (
                  <input
                    id={`address-${field.key}`}
                    name={field.key}
                    type={field.type || "text"}
                    inputMode={field.inputMode}
                    autoComplete={field.autoComplete || "off"}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    value={values[field.key] || ""}
                    aria-invalid={Boolean(errors[field.key])}
                    onChange={(event) => updateField(field.key, event.target.value)}
                  />
                )}
                {errors[field.key] && <small className="field-error">{errors[field.key]}</small>}
              </label>
            ))}
          </div>
          <p className="form-error-summary" role="alert">{Object.keys(errors).length ? `Please check ${Object.keys(errors).length === 1 ? "the highlighted field" : "the highlighted fields"} and try again.` : ""}</p>
          <div className="checkout-actions">
            <button className="secondary-button" type="button" onClick={onBack}><ArrowLeft size={13} /> Return to bag</button>
            <button className="primary-button" type="submit">Continue to payment review <ArrowRight size={13} /></button>
          </div>
        </form>
      </section>
      <aside className="checkout-mini-summary address-summary">
        <span className="step-kicker">DELIVERY DETAILS</span>
        <h3>Almost there.</h3>
        <p>Your contact details are used for this demo order only.</p>
        <div className="mini-summary-note">No account needed · No real payment is collected</div>
      </aside>
    </div>
  );
}