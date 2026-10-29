import { allPages } from "./apiClient";
export function getCategorySubMenus() {
  return allPages("/categories", { auth: false });
}
