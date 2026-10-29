import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../pages/Home";
import AppLayout from "../ui/AppLayout";

const api = vi.hoisted(() => ({
  request: vi.fn(async () => {
    throw new Error("Service offline");
  }),
}));
vi.mock("../services/productsApi", () => ({
  getLimitProducts: api.request,
  getDiscountProducts: api.request,
}));
vi.mock("../services/articlesApi", () => ({ getLatestArticles: api.request }));
vi.mock("../services/categoriesApi", () => ({
  getCategorySubMenus: api.request,
}));
vi.mock("../services/featuresApi", () => ({ getAllFeatures: api.request }));
vi.mock("../services/popularBrandsApi", () => ({
  getPopularBrands: api.request,
}));
vi.mock("../services/frequentlyAskedQuestionsApi", () => ({
  getQuestions: api.request,
}));
vi.mock("../services/userApi", () => ({ getUserApi: api.request }));
vi.mock("../services/cartApi", () => ({ getUserCartItems: api.request }));
vi.mock("../features/home/HeroSection", () => ({
  default: () => <h1>Welcome to AMIN STORE</h1>,
}));

function mount(
  children,
  client = new QueryClient({ defaultOptions: { queries: { retry: false } } }),
) {
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {children}
      </MemoryRouter>
    </QueryClientProvider>,
  );
  return client;
}

describe("public site during an outage", () => {
  it("retains successfully loaded content after a background request fails", async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    client.setQueryData(
      ["features"],
      [
        {
          id: 1,
          title: "Previously loaded feature",
          description: "Still readable",
          image: "/logo.webp",
        },
      ],
    );
    mount(<Home />, client);
    await screen.findAllByRole("alert");
    expect(screen.getByText("Previously loaded feature")).toBeInTheDocument();
  });
  it("keeps home content visible when every remote section fails", async () => {
    mount(<Home />);
    await screen.findAllByRole("alert");
    expect(
      screen.getByRole("heading", { name: "Welcome to AMIN STORE" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Latest Products")).toBeInTheDocument();
    expect(
      screen.getByText("Frequently Asked Questions", { exact: false }),
    ).toBeInTheDocument();
  });
  it("keeps public navigation and footer usable when auth and categories fail", async () => {
    mount(<AppLayout />);
    await screen.findAllByRole("alert");
    expect(
      screen.getAllByRole("link", { name: /about us/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /products/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    const retry = screen.getAllByRole("button", { name: /try again/i })[0];
    fireEvent.click(retry);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
