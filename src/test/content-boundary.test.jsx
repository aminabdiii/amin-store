import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, useLocation } from "react-router-dom";
import ContentBoundary from "../ui/ContentBoundary";
import AppErrorFallback from "../ui/AppErrorFallback";

function Page() {
  const { pathname } = useLocation();
  if (pathname === "/broken") throw new Error("Remote data is unavailable");
  return <p>Working page</p>;
}

describe("isolated render failures", () => {
  it("keeps navigation outside a failed page and recovers on navigation", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    try {
      render(
        <MemoryRouter
          initialEntries={["/broken"]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Link to="/working">Open another page</Link>
          <ContentBoundary>
            <Page />
          </ContentBoundary>
        </MemoryRouter>,
      );
      expect(screen.getByRole("alert")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Open another page"));
      expect(screen.getByText("Working page")).toBeInTheDocument();
    } finally {
      consoleError.mockRestore();
    }
  });
  it("can render the last-resort fallback without a Router", () => {
    const retry = vi.fn();
    render(<AppErrorFallback resetErrorBoundary={retry} />);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(retry).toHaveBeenCalledOnce();
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute(
      "href",
      "/home",
    );
  });
});
