export const AUTH_KEY = "amin-store.auth";
export const AUTH_EVENT = "amin-store:auth-change";
let memory = null;
let storageWritable = true;
export function readSession() {
  if (!storageWritable) return memory;
  try {
    const value = localStorage.getItem(AUTH_KEY);
    const parsed = value ? JSON.parse(value) : null;
    memory = parsed?.accessToken && parsed?.refreshToken ? parsed : null;
    return memory;
  } catch {
    storageWritable = false;
    return memory;
  }
}
function notify(previous, current) {
  if (previous?.userId !== current?.userId || !!previous !== !!current) {
    window.dispatchEvent(
      new CustomEvent(AUTH_EVENT, { detail: { previous, current } }),
    );
  }
}
export function saveSession(data) {
  const previous = readSession();
  const current = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAt: Date.now() + data.expiresIn * 1000,
    userId: data.user?.id ?? previous?.userId ?? null,
  };
  memory = current;
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(current));
    storageWritable = true;
  } catch {
    storageWritable = false;
    /* Private browsing can disable storage. */
  }
  notify(previous, current);
}
export function clearSession() {
  const previous = readSession();
  memory = null;
  try {
    localStorage.removeItem(AUTH_KEY);
    storageWritable = true;
  } catch {
    storageWritable = false;
    /* Still clear this tab. */
  }
  notify(previous, null);
}
if (typeof window !== "undefined")
  window.addEventListener("storage", (event) => {
    if (event.key !== AUTH_KEY && event.key !== null) return;
    let previous = null;
    try {
      previous =
        event.key === null
          ? memory
          : event.oldValue
            ? JSON.parse(event.oldValue)
            : null;
    } catch {
      /* Ignore corrupt storage. */
    }
    memory = null;
    notify(previous, readSession());
  });
