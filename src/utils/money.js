function cents(value) {
  const [whole, fraction = ""] = String(value ?? "0").split(".");
  return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0").slice(0, 2));
}
function decimal(value) {
  return `${value / 100n}.${String(value % 100n).padStart(2, "0")}`;
}
export function formatMoney(value) {
  return decimal(cents(value));
}
export function discountedPrice(value, discount = 0) {
  return decimal((cents(value) * BigInt(100 - Number(discount)) + 50n) / 100n);
}
