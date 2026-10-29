import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import SecureComponent from "../ui/SecureComponent";
import ProtectComponent from "../ui/ProtectComponent";
import AdminPanelSecurity from "../ui/AdminPanelSecurity";

const state = vi.hoisted(() => ({
  user: null,
  loading: false,
  role: null,
  roleLoading: false,
  roleError: null,
}));
vi.mock("../hooks/useGetUser", () => ({
  useGetUser: () => ({ user: state.user, isLoading: state.loading }),
}));
vi.mock("../hooks/useGetUserRole", () => ({
  useGetUserRole: () => ({
    userRole: state.role,
    isLoading: state.roleLoading,
    error: state.roleError,
    refetch: vi.fn(),
  }),
}));
vi.mock("../ui/PageLoader", () => ({
  default: () => <div role="status">Loading</div>,
}));

function Destination() {
  const location = useLocation();
  return (
    <div>
      {location.pathname}
      {JSON.stringify(location.state)}
    </div>
  );
}

function renderGuard(guard, path = "/userPanel/purchases?sort=new#order") {
  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/userPanel/purchases" element={guard} />
        <Route path="/login" element={<Destination />} />
        <Route path="/home" element={<Destination />} />
        <Route path="/userPanel/accountDetails" element={<Destination />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() =>
  Object.assign(state, {
    user: null,
    loading: false,
    role: null,
    roleLoading: false,
    roleError: null,
  }),
);
describe("route access", () => {
  it("sends guests to login with the complete requested destination", async () => {
    renderGuard(<SecureComponent>Private</SecureComponent>);
    expect(await screen.findByText(/\/login/)).toHaveTextContent(
      "/userPanel/purchases",
    );
    expect(screen.getByText(/\/login/)).toHaveTextContent("sort=new");
    expect(screen.getByText(/\/login/)).toHaveTextContent("#order");
    expect(screen.queryByText("Private")).not.toBeInTheDocument();
  });
  it("does not flash guest content while authentication is loading", () => {
    state.loading = true;
    renderGuard(<ProtectComponent>Login form</ProtectComponent>);
    expect(screen.queryByText("Login form")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
  it("accepts an authenticated user without depending on optional profile metadata", () => {
    state.user = { id: "user-1" };
    renderGuard(<SecureComponent>Private</SecureComponent>);
    expect(screen.getByText("Private")).toBeInTheDocument();
  });
  it("denies admin content when role lookup fails without crashing", () => {
    state.user = { id: "user-1" };
    state.roleError = new Error("Offline");
    renderGuard(<AdminPanelSecurity>Admin only</AdminPanelSecurity>);
    expect(screen.queryByText("Admin only")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });
  it("redirects non-admin users to account details", async () => {
    state.role = { role: "authenticated" };
    renderGuard(<AdminPanelSecurity>Admin only</AdminPanelSecurity>);
    expect(
      await screen.findByText(/\/userPanel\/accountDetails/),
    ).toBeInTheDocument();
  });
  it("allows an administrator", () => {
    state.role = { role: "admin" };
    renderGuard(<AdminPanelSecurity>Admin only</AdminPanelSecurity>);
    expect(screen.getByText("Admin only")).toBeInTheDocument();
  });
});
