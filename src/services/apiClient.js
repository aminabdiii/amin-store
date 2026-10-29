import {
  fetchWithTimeout,
  ServiceUnavailableError,
} from "./serviceAvailability";
import { readSession, saveSession, clearSession } from "./authSession";
export class ApiError extends Error {
  constructor({
    statusCode = 0,
    code = "API_ERROR",
    message = "The request could not be completed.",
    requestId,
  } = {}) {
    super(Array.isArray(message) ? message.join(". ") : message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.requestId = requestId;
  }
}
function configuration() {
  const base = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");
  const timeout = Number(import.meta.env.VITE_API_TIMEOUT_MS || 8000);
  if (
    !base ||
    !/^https?:\/\//.test(base) ||
    !Number.isInteger(timeout) ||
    timeout <= 0
  )
    throw new ApiError({
      code: "INVALID_CONFIGURATION",
      message:
        "The API connection is not configured. Please contact the store.",
    });
  return { base, timeout };
}
async function transport(
  path,
  { method = "GET", body, headers, query, signal } = {},
  token,
) {
  const { base, timeout } = configuration();
  const url = new URL(`${base}/${path.replace(/^\/+/, "")}`);
  for (const [key, value] of Object.entries(query || {}))
    if (value !== undefined && value !== null && value !== "")
      url.searchParams.set(key, String(value));
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  if (token) requestHeaders.set("Authorization", `Bearer ${token}`);
  const multipart = body instanceof FormData;
  if (body !== undefined && !multipart)
    requestHeaders.set("Content-Type", "application/json");
  let response;
  try {
    response = await fetchWithTimeout(
      url.toString(),
      {
        method,
        body: body === undefined || multipart ? body : JSON.stringify(body),
        headers: requestHeaders,
        signal,
      },
      timeout,
    );
  } catch (error) {
    if (signal?.aborted || error instanceof ServiceUnavailableError)
      throw error;
    throw new ServiceUnavailableError();
  }
  const text = response.status === 204 ? "" : await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new ApiError({
      statusCode: response.status,
      code: "INVALID_RESPONSE",
      message: "The server returned an invalid response.",
      requestId: response.headers.get("X-Request-ID"),
    });
  }
  if (!response.ok)
    throw new ApiError({
      ...data,
      statusCode: response.status,
      requestId: data?.requestId || response.headers.get("X-Request-ID"),
    });
  return data;
}
let refreshing;
async function rotate(expectedToken) {
  const current = readSession();
  if (!current)
    throw new ApiError({
      statusCode: 401,
      code: "SESSION_EXPIRED",
      message: "Please sign in again.",
    });
  if (current.accessToken !== expectedToken) return current;
  try {
    const pair = await transport("/auth/refresh", {
      method: "POST",
      body: { refreshToken: current.refreshToken },
    });
    if (readSession()?.refreshToken !== current.refreshToken)
      throw new ApiError({
        statusCode: 401,
        code: "SESSION_CHANGED",
        message: "Please sign in again.",
      });
    saveSession(pair);
    return readSession();
  } catch (error) {
    if (
      (error.statusCode === 401 || error.statusCode === 403) &&
      readSession()?.refreshToken === current.refreshToken
    )
      clearSession();
    throw error;
  }
}
// Web Locks serialize rotating refresh tokens across tabs on secure contexts (including localhost).
async function withRefreshLock(token) {
  if (globalThis.navigator?.locks)
    return navigator.locks.request("amin-store.auth:refresh", () =>
      rotate(token),
    );
  // Older browsers share a short-lived storage lease. Re-read credentials after acquiring it.
  const key = "amin-store.auth.refresh-lock";
  const owner = crypto.randomUUID();
  for (;;) {
    let lease;
    try {
      lease = JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return rotate(token);
    }
    if (!lease || lease.expires < Date.now()) {
      try {
        localStorage.setItem(
          key,
          JSON.stringify({ owner, expires: Date.now() + 30000 }),
        );
      } catch {
        return rotate(token);
      }
      await new Promise((resolve) => setTimeout(resolve, 30));
      if (JSON.parse(localStorage.getItem(key) || "null")?.owner === owner) {
        try {
          return await rotate(token);
        } finally {
          if (JSON.parse(localStorage.getItem(key) || "null")?.owner === owner)
            localStorage.removeItem(key);
        }
      }
    }
    const session = readSession();
    if (!session || session.accessToken !== token) return rotate(token);
    await new Promise((resolve) => setTimeout(resolve, 60));
  }
}
function refresh(token) {
  if (!refreshing)
    refreshing = withRefreshLock(token).finally(() => {
      refreshing = undefined;
    });
  return refreshing;
}
export async function request(path, options = {}) {
  if (options.auth === false) return transport(path, options);
  let session = readSession();
  if (!session)
    throw new ApiError({
      statusCode: 401,
      code: "SESSION_EXPIRED",
      message: "Please sign in again.",
    });
  if (session.expiresAt <= Date.now())
    session = await refresh(session.accessToken);
  const token = session.accessToken;
  try {
    return await transport(path, options, token);
  } catch (error) {
    if (error.statusCode !== 401) throw error;
    if (!readSession()) throw error;
    const replacement = await refresh(token);
    try {
      return await transport(path, options, replacement.accessToken);
    } catch (retryError) {
      if (
        retryError.statusCode === 401 &&
        readSession()?.accessToken === replacement.accessToken
      )
        clearSession();
      throw retryError;
    }
  }
}
export async function allPages(path, options = {}) {
  const records = [];
  let page = 1;
  for (;;) {
    const result = await request(path, {
      ...options,
      query: { ...options.query, page, limit: 100 },
    });
    records.push(...result.data);
    if (page >= result.meta.totalPages) return records;
    page++;
  }
}
export function nextPage(lastPage) {
  return lastPage.meta.page < lastPage.meta.totalPages
    ? lastPage.meta.page + 1
    : undefined;
}
export async function detail(path) {
  try {
    return await request(path, { auth: false });
  } catch (error) {
    if (error.statusCode === 404) return null;
    throw error;
  }
}
