import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import AppRoutes from "../AppRoutes";

const state = vi.hoisted(() => ({
  categories: [{ path: "mobile" }],
  isLoading: false,
  error: null,
  refetch: vi.fn(),
  user: null,
  role: { role: "CUSTOMER" },
}));
vi.mock("../hooks/useCategories", () => ({ useCategories: () => state }));
vi.mock("../hooks/useGetUser", () => ({
  useGetUser: () => ({ user: state.user, isLoading: false }),
}));
vi.mock("../hooks/useGetUserRole", () => ({
  useGetUserRole: () => ({ userRole: state.role, isLoading: false }),
}));
vi.mock("../ui/AppLayout", () => ({ default: () => <Outlet /> }));
vi.mock("../pages/UserPanelPage", () => ({
  default: () => <Outlet context={{ user: state.user, cartItemsLength: 2 }} />,
}));
vi.mock("../pages/DetailsProductPage", () => ({
  default: function ProductPage() {
    return <div>Product {useParams().productId}</div>;
  },
}));
vi.mock("../pages/DetailsArticlePage", () => ({
  default: function ArticlePage() {
    return <div>Article {useParams().articleId}</div>;
  },
}));
vi.mock("../pages/ProductsByCategoryPage", () => ({
  default: function CategoryPage() {
    return <div>Category {useParams().category}</div>;
  },
}));
vi.mock("../pages/Home", () => ({ default: () => <div>Home</div> }));
vi.mock("../features/UserPanel/accountDetails/AccountDetails", () => ({
  default: () => <div>Account details</div>,
}));
vi.mock("../features/UserPanel/purchases/Purchases", () => ({
  default: () => <div>Purchases</div>,
}));
vi.mock("../features/UserPanel/users/Users", () => ({
  default: () => <div>Manage users</div>,
}));
vi.mock("../ui/PageLoader", () => ({
  default: () => <div role="status">Loading</div>,
}));

function LocationProbe() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <output data-testid="url">
        {pathname}
        {search}
        {hash}
      </output>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}
function open(path, entries = [path]) {
  return render(
    <MemoryRouter
      initialEntries={entries}
      initialIndex={entries.length - 1}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <LocationProbe />
      <AppRoutes />
    </MemoryRouter>,
  );
}
beforeEach(() => {
  Object.assign(state, {
    categories: [{ path: "mobile" }],
    isLoading: false,
    error: null,
    user: null,
    role: { role: "CUSTOMER" },
  });
  state.refetch.mockReset();
});
describe("public routes and compatibility", () => {
  it.each([
    ["/products/123", "Product 123"],
    ["/articles/42", "Article 42"],
    ["/products/category/mobile?sort=rate", "Category mobile"],
    ["/DetailsProduct?productId=123&ref=cart#reviews", "Product 123"],
    ["/detailsArticle?id=42&ref=home#content", "Article 42"],
    ["/products/mobile?sort=rate#results", "Category mobile"],
  ])("opens %s", async (path, text) => {
    open(path);
    expect(await screen.findByText(text)).toBeInTheDocument();
  });
  it("preserves unrelated query/hash and replaces the legacy history entry", async () => {
    open(null, ["/home", "/DetailsProduct?productId=123&ref=cart#reviews"]);
    await screen.findByText("Product 123");
    expect(screen.getByTestId("url")).toHaveTextContent(
      "/products/123?ref=cart#reviews",
    );
    fireEvent.click(screen.getByText("Back"));
    expect(await screen.findByText("Home")).toBeInTheDocument();
  });
  it("preserves category filters and hash on old category links", async () => {
    open("/products/mobile?sort=rate#results");
    await screen.findByText("Category mobile");
    expect(screen.getByTestId("url")).toHaveTextContent(
      "/products/category/mobile?sort=rate#results",
    );
  });
  it.each([
    "/DetailsProduct",
    "/detailsArticle?id=",
    "/DetailsProduct?productId=%20",
    "/unknown",
    "/userPanel/unknown",
  ])("shows 404 for %s", async (path) => {
    state.user = { id: "u1" };
    open(path);
    expect(await screen.findByText("page not found")).toBeInTheDocument();
  });
  it("does not mount product details before category resolution", async () => {
    state.isLoading = true;
    open("/products/mobile");
    expect(await screen.findByText("Loading")).toBeInTheDocument();
    expect(screen.queryByText(/Product/)).not.toBeInTheDocument();
  });
  it("offers retry on category failure without mounting product details", async () => {
    state.error = new Error("Offline");
    state.categories = undefined;
    open("/products/123");
    fireEvent.click(await screen.findByRole("button", { name: /try again/i }));
    expect(state.refetch).toHaveBeenCalledOnce();
    expect(screen.queryByText("Product 123")).not.toBeInTheDocument();
  });
});
describe("nested panel routes", () => {
  it("redirects the panel index to account details", async () => {
    state.user = { id: "u1" };
    open("/userPanel");
    expect(await screen.findByText("Account details")).toBeInTheDocument();
    expect(screen.getByTestId("url")).toHaveTextContent(
      "/userPanel/accountDetails",
    );
  });
  it("opens purchases as a child page", async () => {
    state.user = { id: "u1" };
    open("/userPanel/purchases");
    expect(await screen.findByText("Purchases")).toBeInTheDocument();
  });
  it("prevents a regular user opening an admin child", async () => {
    state.user = { id: "u1" };
    open("/userPanel/users");
    expect(await screen.findByText("Account details")).toBeInTheDocument();
    expect(screen.queryByText("Manage users")).not.toBeInTheDocument();
  });
  it("opens an admin child for an administrator", async () => {
    state.user = { id: "u1" };
    state.role = { role: "ADMIN" };
    open("/userPanel/users");
    expect(await screen.findByText("Manage users")).toBeInTheDocument();
  });
});
