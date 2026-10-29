import { allPages } from "./apiClient";
export function getAllFeatures() {
  return allPages("/features", { auth: false });
}
