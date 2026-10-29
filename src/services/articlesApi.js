import { request, allPages, detail } from "./apiClient";
export async function getLatestArticles() {
  return (await request("/articles", { auth: false, query: { limit: 6 } }))
    .data;
}
export function getArticles() {
  return allPages("/articles", { auth: false });
}
export function getDetailsArticle({ id }) {
  return detail(`/articles/${id}`);
}
export function insertNewArticleApi(values) {
  return request("/admin/articles", { method: "POST", body: values });
}
export function updateArticleApi({ id, ...values }) {
  return request(`/admin/articles/${id}`, { method: "PATCH", body: values });
}
