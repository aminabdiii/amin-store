import { request } from "./apiClient";
import { saveSession } from "./authSession";
async function authenticate(path, body) {
  const data = await request(path, { method: "POST", body, auth: false });
  saveSession(data);
  return data;
}
export function signInUser({ fullName, userName, email, password }) {
  return authenticate("/auth/register", {
    fullName,
    username: userName,
    email,
    password,
  });
}
export function loginUserApi({ email, password }) {
  return authenticate("/auth/login", { email, password });
}
