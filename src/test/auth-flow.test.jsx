import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LogIn from "../features/signOrLoginPage/LogIn";
import SignIn from "../features/signOrLoginPage/SignIn";
import SecureComponent from "../ui/SecureComponent";
import ProtectComponent from "../ui/ProtectComponent";

const api = vi.hoisted(() => ({
  login: vi.fn(),
  signup: vi.fn(),
  getUser: vi.fn(async () => null),
}));
vi.mock("../services/signInOrLoginApi", () => ({
  loginUserApi: api.login,
  signInUser: api.signup,
}));
vi.mock("../services/userApi", () => ({ getUserApi: api.getUser }));
vi.mock("sweetalert2", () => ({ default: { fire: vi.fn() } }));
vi.mock("../ui/PageLoader", () => ({
  default: () => <div role="status">Loading</div>,
}));

function Destination() {
  const location = useLocation();
  return (
    <output>
      {location.pathname}
      {location.search}
      {location.hash}
    </output>
  );
}
function open(entry) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  client.setQueryData(["user"], null);
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter
        initialEntries={[entry]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectComponent>
                <LogIn />
              </ProtectComponent>
            }
          />
          <Route
            path="/sign-in"
            element={
              <ProtectComponent>
                <SignIn />
              </ProtectComponent>
            }
          />
          <Route
            path="/userPanel/purchases"
            element={
              <SecureComponent>
                <Destination />
              </SecureComponent>
            }
          />
          <Route path="/home" element={<Destination />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
  return client;
}
async function login() {
  fireEvent.change(await screen.findByPlaceholderText("Email address"), {
    target: { value: "person@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password12345" },
  });
  fireEvent.submit(screen.getByPlaceholderText("Password").closest("form"));
}
beforeEach(() => {
  vi.clearAllMocks();
  api.getUser.mockResolvedValue(null);
  api.login.mockImplementation(async () => {
    api.getUser.mockResolvedValue({ id: "user-1" });
    return { user: { id: "user-1" }, accessToken: "test" };
  });
});
describe("authentication navigation", () => {
  it("updates authentication before returning to the full requested panel path", async () => {
    const client = open("/userPanel/purchases?sort=new#order");
    await login();
    expect(
      await screen.findByText("/userPanel/purchases?sort=new#order"),
    ).toBeInTheDocument();
    expect(client.getQueryData(["user"])).toEqual({ id: "user-1" });
  });
  it("uses home when a return destination is external", async () => {
    open({ pathname: "/login", state: { from: "https://example.com/" } });
    await login();
    expect(await screen.findByText("/home")).toBeInTheDocument();
  });
  it("preserves the return destination while switching between login and signup", async () => {
    open("/userPanel/purchases?sort=new#order");
    fireEvent.click(await screen.findByText("Doesn't have an account?"));
    fireEvent.click(await screen.findByText("Already have account?"));
    await login();
    expect(
      await screen.findByText("/userPanel/purchases?sort=new#order"),
    ).toBeInTheDocument();
  });
  it("does not let an older guest lookup overwrite a successful login", async () => {
    let finishGuestLookup;
    api.getUser.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finishGuestLookup = resolve;
        }),
    );
    const client = open("/userPanel/purchases?sort=new#order");
    await login();
    await waitFor(() =>
      expect(client.getQueryData(["user"])).toEqual({ id: "user-1" }),
    );
    await act(async () => finishGuestLookup(null));
    expect(client.getQueryData(["user"])).toEqual({ id: "user-1" });
    expect(
      screen.getByText("/userPanel/purchases?sort=new#order"),
    ).toBeInTheDocument();
  });
  it.each([true, false])(
    "returns after signup only when an access token exists: %s",
    async (hasSession) => {
      api.signup.mockImplementation(async () => {
        if (hasSession) api.getUser.mockResolvedValue({ id: "new-user" });
        return {
          user: { id: "new-user" },
          accessToken: hasSession ? "test" : null,
        };
      });
      const client = open({
        pathname: "/sign-in",
        state: {
          from: {
            pathname: "/userPanel/purchases",
            search: "?sort=new",
            hash: "#order",
          },
        },
      });
      for (const [placeholder, value] of [
        ["fullName", "Test Person"],
        ["userName", "testperson"],
        ["Email address", "person@example.com"],
        ["Password", "password12345"],
        ["confirm Password", "password12345"],
      ]) {
        fireEvent.change(await screen.findByPlaceholderText(placeholder), {
          target: { value },
        });
      }
      fireEvent.submit(screen.getByPlaceholderText("Password").closest("form"));
      expect(
        await screen.findByText(
          hasSession ? "/userPanel/purchases?sort=new#order" : "/home",
        ),
      ).toBeInTheDocument();
      expect(client.getQueryData(["user"])).toEqual(
        hasSession ? { id: "new-user" } : null,
      );
    },
  );
});
