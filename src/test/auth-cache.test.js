import { afterEach, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { bindAuthCache } from "../services/authCache";
import { clearSession, saveSession, AUTH_KEY } from "../services/authSession";
afterEach(() => {
  clearSession();
  localStorage.clear();
});
it("clears private data on identity changes and cross-tab logout", () => {
  const client = new QueryClient();
  const unbind = bindAuthCache(client);
  saveSession({
    accessToken: "a",
    refreshToken: "r",
    expiresIn: 900,
    user: { id: "one" },
  });
  client.setQueryData(["cart", "one"], { secret: true });
  client.setQueryData(["allUser"], { secret: true });
  client.setQueryData(["user"], { id: "one" });
  saveSession({
    accessToken: "b",
    refreshToken: "s",
    expiresIn: 900,
    user: { id: "two" },
  });
  expect(client.getQueryData(["cart", "one"])).toBeUndefined();
  expect(client.getQueryData(["allUser"])).toBeUndefined();
  expect(client.getQueryData(["user"])).toBeNull();
  client.setQueryData(["user"], { id: "two" });
  const oldValue = localStorage.getItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(
    new StorageEvent("storage", { key: AUTH_KEY, oldValue, newValue: null }),
  );
  expect(client.getQueryData(["user"])).toBeNull();
  unbind();
  client.clear();
});
