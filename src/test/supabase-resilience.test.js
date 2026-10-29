import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("optional Supabase configuration", () => {
  it("can import the application clients without either key", async () => {
    vi.stubEnv("VITE_SUPABASE_API_KEY", "");
    vi.stubEnv("VITE_SUPABASE_SERVICE_ROLE_KEY", "");
    const clients = await import("../../supabase");
    expect(clients.supabase).toBeDefined();
    expect(() => clients.supabase.from("products")).toThrow(
      /temporarily unavailable/i,
    );
  });
  it("does not require the admin key for public reads", async () => {
    vi.stubEnv("VITE_SUPABASE_API_KEY", "public-test-key");
    vi.stubEnv("VITE_SUPABASE_SERVICE_ROLE_KEY", "");
    const clients = await import("../../supabase");
    expect(() => clients.supabase.from("products")).not.toThrow();
    expect(() => clients.adminAuthClient.listUsers()).toThrow(
      /temporarily unavailable/i,
    );
  });
});
