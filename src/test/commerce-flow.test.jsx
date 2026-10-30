import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { showDialog } from "../ui/dialogs/dialogService";
import Cart from "../features/cart/Cart";
import Order from "../features/UserPanel/purchases/Order";
const state = vi.hoisted(() => ({
  cart: null,
  remove: vi.fn(),
  quantity: vi.fn(),
  checkout: vi.fn(),
  clear: vi.fn(),
}));
vi.mock("../features/cart/useGetUserCartItems", () => ({
  useGetUserCartItems: () => ({ cartProducts: state.cart, isLoading: false }),
}));
vi.mock("../hooks/useGetUser", () => ({
  useGetUser: () => ({ user: { id: "u1" }, isLoading: false }),
}));
vi.mock("../features/cart/useDeleteFromCart", () => ({
  useDeleteFromCart: () => ({ removeFromCartById: state.remove }),
}));
vi.mock("../features/cart/useUpdateProductCountFromCart", () => ({
  useUpdateProductCountFromCart: () => ({ countUpdater: state.quantity }),
}));
vi.mock("../features/cart/useInsertUserPurchases", () => ({
  useInsertUserPurchases: () => ({ insertPurchases: state.checkout }),
}));
vi.mock("../features/cart/useClearUserCart", () => ({
  useClearUserCart: () => ({ clearCart: state.clear }),
}));
vi.mock("../ui/dialogs/dialogService", () => ({
  showDialog: vi.fn(async () => true),
}));
beforeEach(() => {
  vi.clearAllMocks();
  sessionStorage.clear();
  state.cart = {
    requiresResolution: false,
    total: "42.42",
    currency: "USD",
    cartItems: [
      {
        id: 1,
        variantId: 11,
        productId: 7,
        title: "Red shirt",
        quantity: 1,
        stock: 5,
        price: "10.00",
        netUnitPrice: "9.00",
        lineTotal: "9.00",
        isAvailable: true,
        options: { color: "red" },
      },
      {
        id: 2,
        variantId: 12,
        productId: 7,
        title: "Blue shirt",
        quantity: 2,
        stock: 5,
        price: "10.00",
        netUnitPrice: "9.00",
        lineTotal: "18.00",
        isAvailable: true,
        options: { color: "blue" },
      },
    ],
  };
});
const open = (element) =>
  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {element}
    </MemoryRouter>,
  );
describe("canonical cart", () => {
  it("keeps variants of the same product independent and shows the server total", async () => {
    open(<Cart />);
    expect(screen.getByText("42.42")).toBeInTheDocument();
    fireEvent.click(
      screen.getAllByRole("button", { name: "Increase quantity" })[1],
    );
    expect(state.quantity).toHaveBeenCalledWith({ variantId: 12, quantity: 3 });
    fireEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);
    await waitFor(() =>
      expect(state.remove).toHaveBeenCalledWith({ variantId: 11 }),
    );
  });
  it("preserves the checkout key after a failed attempt", () => {
    open(<Cart />);
    const button = screen.getByRole("button", { name: "Complete Purchase" });
    fireEvent.click(button);
    fireEvent.click(button);
    const first = state.checkout.mock.calls[0][0];
    expect(first.idempotencyKey).toBeTruthy();
    expect(state.checkout.mock.calls[1][0]).toEqual(first);
    expect(state.clear).not.toHaveBeenCalled();
  });
  it("offers resolution before treating an ambiguous empty cart as empty", () => {
    state.cart = { ...state.cart, requiresResolution: true, cartItems: [] };
    open(<Cart />);
    expect(screen.getByRole("alert")).toHaveTextContent("could not be matched");
    fireEvent.click(screen.getByRole("button", { name: "Clear saved cart" }));
    expect(state.clear).toHaveBeenCalled();
    expect(
      screen.queryByRole("button", { name: "Complete Purchase" }),
    ).not.toBeInTheDocument();
  });
  it("blocks checkout when a row is unavailable", () => {
    state.cart.cartItems[0].isAvailable = false;
    open(<Cart />);
    expect(
      screen.getByRole("button", { name: "Complete Purchase" }),
    ).toBeDisabled();
  });
});
describe("canonical orders", () => {
  const order = {
    id: 1,
    status: "PLACED",
    total: "10.00",
    currency: "USD",
    createdAt: "2026-10-29T00:00:00Z",
    deliveryDate: null,
    items: [{ id: 1, title: "Archived item", productId: null, quantity: 2 }],
  };
  it("offers only the valid next states and renders historical rows without links", async () => {
    const update = vi.fn();
    open(<Order purchaseItem={order} type="admin" deliveryPurchase={update} />);
    expect(
      screen.queryByRole("button", { name: "delivered" }),
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "processing" }));
    await waitFor(() =>
      expect(update).toHaveBeenCalledWith(
        { id: 1, status: "PROCESSING" },
        expect.any(Object),
      ),
    );
  });
  it("does not change order status when confirmation is cancelled", async () => {
    showDialog.mockResolvedValueOnce(false);
    const update = vi.fn();
    open(<Order purchaseItem={order} type="admin" deliveryPurchase={update} />);
    fireEvent.click(screen.getByRole("button", { name: "processing" }));
    await waitFor(() => expect(showDialog).toHaveBeenCalled());
    expect(update).not.toHaveBeenCalled();
  });
  it("has no transitions for terminal states", () => {
    open(
      <Order purchaseItem={{ ...order, status: "DELIVERED" }} type="admin" />,
    );
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
