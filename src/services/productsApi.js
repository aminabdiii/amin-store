import { request, detail } from "./apiClient";
function filters({
  category,
  sort = "rate",
  presale,
  availableProducts,
  discountProducts,
  search,
  pageParam = 1,
} = {}) {
  return {
    category,
    sort,
    preSale: presale,
    available: availableProducts,
    discounted: discountProducts,
    search,
    page: pageParam,
    limit: 9,
  };
}
export async function getLimitProducts({ limit }) {
  return (
    await request("/products", {
      auth: false,
      query: { sort: "newest", limit },
    })
  ).data;
}
export async function getDiscountProducts() {
  return (
    await request("/products", {
      auth: false,
      query: { discounted: true, limit: 12 },
    })
  ).data;
}
export function getDetailProduct({ id }) {
  return detail(`/products/${id}`);
}
export function getProductsByCategory(values) {
  return request("/products", { auth: false, query: filters(values) });
}
export function getAllProducts(values) {
  return request("/products", { auth: false, query: filters(values) });
}
export function getAdminProducts(values) {
  return request("/admin/products", { query: filters(values) });
}
export function updateProductView({ id }) {
  return request(`/products/${id}/views`, { method: "POST", auth: false });
}
export function insertNewProductApi(values) {
  return request("/admin/products", { method: "POST", body: values });
}
export function updateProductApi({ id, ...values }) {
  return request(`/admin/products/${id}`, { method: "PATCH", body: values });
}
export async function getRelatedProducts({ expectProductId }) {
  return (
    await request(`/products/${expectProductId}/related`, { auth: false })
  ).data;
}
export function updateInventoryApi({ variantId, delta, reason }) {
  return request(`/admin/variants/${variantId}/inventory`, {
    method: "POST",
    body: { delta, reason },
  });
}
