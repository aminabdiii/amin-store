const pending = new Map();
export function checkoutKey(userId, items) {
  const key = `amin-store.checkout.${userId}`;
  const signature = JSON.stringify(
    items
      .map((item) => [item.variantId, item.quantity])
      .sort((a, b) => a[0] - b[0]),
  );
  let saved;
  try {
    saved = JSON.parse(sessionStorage.getItem(key));
  } catch {
    saved = pending.get(key);
  }
  if (saved?.signature === signature) return saved.id;
  const id = crypto.randomUUID();
  pending.set(key, { id, signature });
  try {
    sessionStorage.setItem(key, JSON.stringify({ id, signature }));
  } catch {
    /* Keep retries stable in memory when storage is unavailable. */
  }
  return id;
}
export function finishCheckout(userId) {
  const key = `amin-store.checkout.${userId}`;
  pending.delete(key);
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* The in-memory attempt is already cleared. */
  }
}
