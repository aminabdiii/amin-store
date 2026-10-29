import { request, allPages } from "./apiClient";
import { readSession, clearSession } from "./authSession";
export async function getUserApi() {
  if (!readSession()) return null;
  try {
    return await request("/users/me");
  } catch (error) {
    if (error.statusCode === 401) return null;
    throw error;
  }
}
export async function logoutApi() {
  try {
    if (readSession()) await request("/auth/logout", { method: "POST" });
  } finally {
    clearSession();
  }
}
export function uploadAvatar({ file }) {
  const body = new FormData();
  body.append("file", file);
  return request("/media/avatar", { method: "POST", body });
}
export function updateUser({ fullName }) {
  return request("/users/me", { method: "PATCH", body: { fullName } });
}
export async function updateUserPassword({ currentPassword, password }) {
  const result = await request("/auth/password", {
    method: "POST",
    body: { currentPassword, password },
  });
  clearSession();
  return result;
}
export async function userRoleApi() {
  const user = await getUserApi();
  return user ? { role: user.role } : null;
}
export async function getAllUsers() {
  return { users: await allPages("/admin/users") };
}
export function deleteUserApi({ userId }) {
  return request(`/admin/users/${userId}`, {
    method: "PATCH",
    body: { active: false },
  });
}
