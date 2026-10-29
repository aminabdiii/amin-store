import { request } from "./apiClient";
export function getUserCartItems() {
  return request("/cart");
}
export async function getCartItemById({ variantId }) {
  return (await getUserCartItems()).cartItems.find(
    (item) => item.variantId === variantId,
  );
}
export function addItemToCartApi({ variantId, quantity = 1 }) {
  return request("/cart/items", {
    method: "POST",
    body: { variantId, quantity },
  });
}
export function removeItemToCartApi({ variantId }) {
  return request(`/cart/items/${variantId}`, { method: "DELETE" });
}
export function updateProductCountFromCart({ variantId, quantity }) {
  return request(`/cart/items/${variantId}`, {
    method: "PATCH",
    body: { quantity },
  });
}
export function clearUserCart() {
  return request("/cart", { method: "DELETE" });
}
