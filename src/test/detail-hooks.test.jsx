import { describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDetailsProduct } from "../features/detailsProduct/useDetailsProduct";
import { useGetCommentsByProductId } from "../features/detailsProduct/useGetCommentsByProductId";
import { useInsertComment } from "../features/detailsProduct/useInsertComment";
import { useUpdateProductView } from "../features/detailsProduct/useUpdateProductView";

const api = vi.hoisted(() => ({
  product: vi.fn(async ({ id }) => ({ id, title: `Product ${id}` })),
  comments: vi.fn(async () => []),
  insert: vi.fn(async () => ({})),
  view: vi.fn(async () => ({})),
}));
vi.mock("../services/productsApi", () => ({
  getDetailProduct: api.product,
  updateProductView: api.view,
}));
vi.mock("../services/commentsApi", () => ({
  getCommentsByProductIdApi: api.comments,
  insertCommentApi: api.insert,
}));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

function Consumer() {
  const { product } = useDetailsProduct();
  const { comments } = useGetCommentsByProductId();
  const { insertComment } = useInsertComment();
  const { productViewUpdater } = useUpdateProductView();
  const navigate = useNavigate();
  return (
    <>
      <p>
        {product?.title} comments: {comments?.length}
      </p>
      <button onClick={() => navigate("/products/2")}>Next product</button>
      <button onClick={() => insertComment({ content: "Hello" })}>
        Comment
      </button>
      <button onClick={() => productViewUpdater({ view: 4 })}>View</button>
    </>
  );
}

describe("product route consumers", () => {
  it("uses the current path ID for details, comments, mutations and comment refresh", async () => {
    const client = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    render(
      <QueryClientProvider client={client}>
        <MemoryRouter
          initialEntries={["/products/1?productId=wrong"]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/products/:productId" element={<Consumer />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(
      await screen.findByText("Product 1 comments: 0"),
    ).toBeInTheDocument();
    await act(async () => screen.getByText("Next product").click());
    expect(
      await screen.findByText("Product 2 comments: 0"),
    ).toBeInTheDocument();
    await act(async () => screen.getByText("Comment").click());
    await waitFor(() =>
      expect(api.insert).toHaveBeenCalledWith({
        content: "Hello",
        productId: "2",
      }),
    );
    await waitFor(() =>
      expect(
        api.comments.mock.calls.filter(([args]) => args.productId === "2")
          .length,
      ).toBeGreaterThan(1),
    );
    await act(async () => screen.getByText("View").click());
    await waitFor(() => expect(api.view).toHaveBeenCalledWith({ id: "2" }));
    expect(api.product).toHaveBeenCalledWith({ id: "1" });
    expect(api.product).toHaveBeenCalledWith({ id: "2" });
  });
});
