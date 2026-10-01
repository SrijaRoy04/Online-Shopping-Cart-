export const COUPON_RATES = Object.freeze({
  SAVE10: 0.1,
  SAVE20: 0.2,
  SAVE30: 0.3
});

export function calculateTotals(items, coupon) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon ? roundToCents(subtotal * COUPON_RATES[coupon]) : 0;
  const discountedSubtotal = subtotal - discount;
  const gst = roundToCents(discountedSubtotal * 0.18);

  return {
    subtotal,
    discount,
    gst,
    grandTotal: roundToCents(discountedSubtotal + gst)
  };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  }).format(amount);
}

function roundToCents(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}