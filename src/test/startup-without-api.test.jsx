import { afterEach, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

it("starts the real public app without API configuration", async () => {
  vi.stubEnv("VITE_API_BASE_URL", "");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  window.history.replaceState(null, "", "/home");
  const { default: App } = await import("../App");
  render(<App />);
  expect(
    await screen.findByRole(
      "link",
      { name: /get started/i },
      { timeout: 15000 },
    ),
  ).toBeInTheDocument();
  await screen.findAllByRole("alert");
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: /about us/i }).length,
  ).toBeGreaterThan(0);
}, 30000);
