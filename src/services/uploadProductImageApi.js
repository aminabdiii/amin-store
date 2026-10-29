import { request } from "./apiClient";
export function uploadProductImageApi({ fileBody }) {
  const body = new FormData();
  body.append("file", fileBody);
  return request("/media/images", { method: "POST", body });
}
