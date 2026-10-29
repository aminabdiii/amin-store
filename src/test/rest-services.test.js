import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { saveSession, clearSession } from "../services/authSession";
import {
  addItemToCartApi,
  updateProductCountFromCart,
  removeItemToCartApi,
} from "../services/cartApi";
import {
  insertUserPurchases,
  deliveredPurchaseApi,
} from "../services/purchasesApi";
import { insertCommentApi } from "../services/commentsApi";
import { getArticles } from "../services/articlesApi";
import { selectVariant } from "../utils/variants";
import { updateProductApi } from "../services/productsApi";
import { discountedPrice, formatMoney } from "../utils/money";
let fetch;
beforeEach(() => {
  vi.stubEnv("VITE_API_BASE_URL", "http://localhost:3001/api/v1");
  saveSession({ accessToken: "a", refreshToken: "r", expiresIn: 900 });
  fetch = vi.fn(
    async () =>
      new Response(
        JSON.stringify({ data: [], meta: { page: 1, totalPages: 1 } }),
      ),
  );
  vi.stubGlobal("fetch", fetch);
});
afterEach(() => {
  clearSession();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
it("addresses cart mutations by variant and sends no client product or owner", async () => {
  await addItemToCartApi({
    variantId: 12,
    quantity: 2,
    product: { price: 1 },
    userId: "wrong",
  });
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
    variantId: 12,
    quantity: 2,
  });
  await updateProductCountFromCart({ variantId: 13, quantity: 3 });
  expect(fetch.mock.calls[1][0]).toMatch(/\/cart\/items\/13$/);
  await removeItemToCartApi({ variantId: 12 });
  expect(fetch.mock.calls[2][1].method).toBe("DELETE");
});
it("keeps checkout retry keys and sends only the empty checkout DTO", async () => {
  await insertUserPurchases({ idempotencyKey: "same-checkout", totalPrice: 1 });
  await insertUserPurchases({ idempotencyKey: "same-checkout" });
  for (const [, options] of fetch.mock.calls) {
    expect(options.headers.get("Idempotency-Key")).toBe("same-checkout");
    expect(options.body).toBe("{}");
  }
});
it("sends canonical review and explicit order status", async () => {
  await insertCommentApi({
    productId: "7",
    content: "Good product",
    rating: 4,
    userId: "ignored",
    avatar: "ignored",
  });
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
    productId: 7,
    content: "Good product",
    rating: 4,
  });
  await deliveredPurchaseApi({ id: 3, status: "PROCESSING" });
  expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual({
    status: "PROCESSING",
  });
});
it("loads all pages for existing non-paginated content screens", async () => {
  fetch.mockImplementation(async (url) => {
    const page = Number(new URL(url).searchParams.get("page"));
    return new Response(
      JSON.stringify({ data: [{ id: page }], meta: { page, totalPages: 2 } }),
    );
  });
  expect(await getArticles()).toEqual([{ id: 1 }, { id: 2 }]);
});
it("matches exact option combinations and retains distinct variant identifiers", () => {
  const variants = [
    { id: 1, stock: 2, options: { color: "red", size: "S" } },
    { id: 2, stock: 0, options: { color: "blue", size: "S" } },
  ];
  expect(selectVariant(variants, { color: "red", size: "S" })?.id).toBe(1);
  expect(selectVariant(variants, { color: "blue", size: "S" })?.id).toBe(2);
  expect(selectVariant(variants, { size: "S" })).toBeUndefined();
});
it("formats decimal strings and rounds discounted units to cents", () => {
  expect(discountedPrice("19.99", 15)).toBe("16.99");
  expect(formatMoney("19.90")).toBe("19.90");
  expect(discountedPrice("0.05", 10)).toBe("0.05");
});

it("excludes the routing product id from the strict PATCH body", async () => {
  await updateProductApi({ id: 12, title: "Updated", price: "12.50" });
  expect(fetch.mock.calls[0][0]).toMatch(/\/admin\/products\/12$/);
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
    title: "Updated",
    price: "12.50",
  });
});
