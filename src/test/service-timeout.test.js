import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWithTimeout } from "../services/serviceAvailability";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("service request deadline", () => {
  it("aborts a stalled request and rejects so the UI can stop loading", async () => {
    vi.useFakeTimers();
    let signal;
    vi.stubGlobal(
      "fetch",
      vi.fn((url, options) => {
        signal = options.signal;
        return new Promise(() => {});
      }),
    );
    const result = fetchWithTimeout("https://service.example.test", {}, 100);
    const failed = expect(result).rejects.toThrow(/temporarily unavailable/i);
    await vi.advanceTimersByTimeAsync(100);
    await failed;
    expect(signal.aborted).toBe(true);
  });
  it("preserves caller cancellation and clears the deadline after success", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    let signal;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url, options) => {
        signal = options.signal;
        return { ok: true };
      }),
    );
    await expect(
      fetchWithTimeout(
        "https://service.example.test",
        { signal: controller.signal },
        100,
      ),
    ).resolves.toEqual({ ok: true });
    expect(vi.getTimerCount()).toBe(0);
    controller.abort();
    expect(signal.aborted).toBe(false);
  });
});
