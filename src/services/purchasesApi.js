import { request } from "./apiClient";
export function getUserPurchases({ purchasePerPage, pageParam }) {
  return request("/orders", {
    query: { page: pageParam, limit: purchasePerPage },
  });
}
export function getAllPurchases({ pageParam, numPurchasePerPage }) {
  return request("/admin/orders", {
    query: { page: pageParam, limit: numPurchasePerPage },
  });
}
export function insertUserPurchases({ idempotencyKey }) {
  return request("/orders", {
    method: "POST",
    body: {},
    headers: { "Idempotency-Key": idempotencyKey },
  });
}
export function deliveredPurchaseApi({ id, status }) {
  return request(`/admin/orders/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}
