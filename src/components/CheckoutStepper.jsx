import { Check } from "lucide-react";

const steps = ["Cart", "Address", "Confirm Details", "Payment", "Success"];

export default function CheckoutStepper({ currentStep }) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <ol className="checkout-progress" aria-label="Checkout progress">
      {steps.map((label, index) => {
        const state = index === currentIndex ? "current" : index < currentIndex ? "complete" : "";
        return (
          <li className={`progress-step ${state}`} key={label} aria-current={index === currentIndex ? "step" : undefined}>
            <span className="progress-marker">{index < currentIndex ? <Check size={13} /> : index + 1}</span>
            <span className="progress-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}