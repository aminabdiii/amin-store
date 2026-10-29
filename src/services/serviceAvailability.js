export class ServiceUnavailableError extends Error {
  constructor() {
    super("This service is temporarily unavailable. Please try again.");
    this.name = "ServiceUnavailableError";
  }
}

export async function fetchWithTimeout(input, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const cancel = () => controller.abort(options.signal?.reason);
  if (options.signal?.aborted) cancel();
  else options.signal?.addEventListener("abort", cancel, { once: true });
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new ServiceUnavailableError());
      controller.abort();
    }, timeoutMs);
  });
  try {
    return await Promise.race([
      globalThis.fetch(input, { ...options, signal: controller.signal }),
      deadline,
    ]);
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", cancel);
  }
}
