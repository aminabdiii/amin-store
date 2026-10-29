import { allPages } from "./apiClient";
export function getQuestions() {
  return allPages("/faqs", { auth: false });
}
