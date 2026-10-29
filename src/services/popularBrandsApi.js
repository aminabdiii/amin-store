import { allPages } from "./apiClient";
export function getPopularBrands() {
  return allPages("/brands", { auth: false });
}
