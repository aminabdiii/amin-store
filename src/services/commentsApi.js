import { request, allPages } from "./apiClient";
export function getCommentsByProductIdApi({ productId }) {
  return allPages(`/products/${productId}/reviews`, { auth: false });
}
export function getAllComments({ pageParam, COMMENTS_PER_PAGE }) {
  return request("/admin/reviews", {
    query: { page: pageParam, limit: COMMENTS_PER_PAGE },
  });
}
export function insertCommentApi({ productId, content, rating }) {
  return request("/reviews", {
    method: "POST",
    body: { productId: Number(productId), content, rating: Number(rating) },
  });
}
export function confirmUserCommentApi({ id }) {
  return request(`/admin/reviews/${id}`, {
    method: "PATCH",
    body: { approved: true },
  });
}
export function deleteCommentApi({ id }) {
  return request(`/admin/reviews/${id}`, { method: "DELETE" });
}
