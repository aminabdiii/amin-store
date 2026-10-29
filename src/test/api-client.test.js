import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { request, ApiError } from "../services/apiClient";
import {
  saveSession,
  clearSession,
  readSession,
} from "../services/authSession";
const response = (body, status = 200) =>
  new Response(JSON.stringify(body), { status });
beforeEach(() => {
  localStorage.clear();
  clearSession();
  vi.stubEnv("VITE_API_BASE_URL", "http://localhost:3001/api/v1/");
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
describe("REST transport", () => {
  it("builds URLs and preserves structured errors", async () => {
    const fetch = vi.fn(async () =>
      response(
        { code: "INVALID", message: "Invalid input", requestId: "r1" },
        422,
      ),
    );
    vi.stubGlobal("fetch", fetch);
    await expect(
      request("/products", {
        query: { search: "red & blue", page: 2 },
        auth: false,
      }),
    ).rejects.toMatchObject({
      name: "ApiError",
      statusCode: 422,
      code: "INVALID",
      requestId: "r1",
    });
    expect(fetch.mock.calls[0][0]).toBe(
      "http://localhost:3001/api/v1/products?search=red+%26+blue&page=2",
    );
  });
  it("rejects missing configuration lazily without a network request", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await expect(request("/products", { auth: false })).rejects.toBeInstanceOf(
      ApiError,
    );
    expect(fetch).not.toHaveBeenCalled();
  });
  it("shares a refresh across concurrent unauthorized requests and saves the rotated pair", async () => {
    saveSession({
      accessToken: "old",
      refreshToken: "refresh-old",
      expiresIn: 900,
      user: { id: "u" },
    });
    const fetch = vi.fn(async (url, options) => {
      if (url.endsWith("/auth/refresh"))
        return response({
          accessToken: "new",
          refreshToken: "refresh-new",
          expiresIn: 900,
        });
      return options.headers.get("Authorization") === "Bearer old"
        ? response({ message: "Expired" }, 401)
        : response({ id: "u" });
    });
    vi.stubGlobal("fetch", fetch);
    expect(await Promise.all([request("/users/me"), request("/cart")])).toEqual(
      [{ id: "u" }, { id: "u" }],
    );
    expect(
      fetch.mock.calls.filter(([url]) => url.endsWith("/auth/refresh")),
    ).toHaveLength(1);
    expect(readSession()).toMatchObject({
      accessToken: "new",
      refreshToken: "refresh-new",
    });
  });
  it("does not restore a session when logout occurs during refresh", async () => {
    saveSession({
      accessToken: "old",
      refreshToken: "r",
      expiresIn: 0,
      user: { id: "u" },
    });
    let resolve;
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((r) => {
            resolve = r;
          }),
      ),
    );
    const pending = request("/users/me");
    await vi.waitFor(() => expect(resolve).toBeTypeOf("function"));
    clearSession();
    resolve(
      response({ accessToken: "new", refreshToken: "new-r", expiresIn: 900 }),
    );
    await expect(pending).rejects.toMatchObject({ statusCode: 401 });
    expect(readSession()).toBeNull();
  });
  it("keeps the session on network failure but clears it on rejected refresh", async () => {
    saveSession({
      accessToken: "old",
      refreshToken: "r",
      expiresIn: 0,
      user: { id: "u" },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("offline");
      }),
    );
    await expect(request("/cart")).rejects.toThrow();
    expect(readSession()).not.toBeNull();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => response({ message: "Revoked" }, 401)),
    );
    await expect(request("/cart")).rejects.toMatchObject({ statusCode: 401 });
    expect(readSession()).toBeNull();
  });
  it("lets the browser set multipart boundaries", async () => {
    saveSession({ accessToken: "a", refreshToken: "r", expiresIn: 900 });
    const fetch = vi.fn(async () => response({ id: "media" }));
    vi.stubGlobal("fetch", fetch);
    const body = new FormData();
    body.append("file", new File(["image"], "test.png"));
    await request("/media/images", { method: "POST", body });
    expect(fetch.mock.calls[0][1].body).toBe(body);
    expect(fetch.mock.calls[0][1].headers.has("Content-Type")).toBe(false);
  });
});

it("serializes refresh across isolated tab clients with Web Locks", async () => {
  saveSession({
    accessToken: "old",
    refreshToken: "shared-r",
    expiresIn: 0,
    user: { id: "u" },
  });
  let queue = Promise.resolve();
  vi.stubGlobal("navigator", {
    locks: {
      request: vi.fn((name, callback) => {
        const next = queue.then(callback);
        queue = next.catch(() => {});
        return next;
      }),
    },
  });
  const fetch = vi.fn(async (url) =>
    url.endsWith("/auth/refresh")
      ? new Response(
          JSON.stringify({
            accessToken: "new",
            refreshToken: "rotated",
            expiresIn: 900,
          }),
        )
      : new Response(JSON.stringify({ ok: true })),
  );
  vi.stubGlobal("fetch", fetch);
  vi.resetModules();
  const first = await import("../services/apiClient");
  vi.resetModules();
  const second = await import("../services/apiClient");
  await Promise.all([first.request("/cart"), second.request("/users/me")]);
  expect(
    fetch.mock.calls.filter(([url]) => url.endsWith("/auth/refresh")),
  ).toHaveLength(1);
  expect(navigator.locks.request).toHaveBeenCalledTimes(2);
});
it("keeps an in-memory session when browser storage cannot be written", () => {
  const write = vi
    .spyOn(Storage.prototype, "setItem")
    .mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
  try {
    saveSession({
      accessToken: "memory",
      refreshToken: "memory-r",
      expiresIn: 900,
      user: { id: "u" },
    });
    expect(readSession()?.accessToken).toBe("memory");
    clearSession();
    expect(readSession()).toBeNull();
  } finally {
    write.mockRestore();
  }
});
