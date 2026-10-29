import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailsProduct from "../features/detailsProduct/DetailsProduct";
import DetailsArticle from "../features/DetailsArticle/DetailsArticle";

const state = vi.hoisted(() => ({ error: null, refetch: vi.fn() }));
vi.mock("../features/detailsProduct/useDetailsProduct", () => ({
  useDetailsProduct: () => ({ product: null, isLoading: false, ...state }),
}));
vi.mock("../features/DetailsArticle/useDetailsArticle", () => ({
  useDetailsArticle: () => ({
    detailsArticle: null,
    isLoading: false,
    ...state,
  }),
}));
vi.mock("../hooks/useGetUser", () => ({
  useGetUser: () => ({ user: null, isLoading: false }),
}));
vi.mock("../features/detailsProduct/useGetCommentsByProductId", () => ({
  useGetCommentsByProductId: () => ({ comments: [], isLoading: false }),
}));
vi.mock("../features/detailsProduct/InformationSection", () => ({
  default: () => null,
}));
vi.mock("../features/detailsProduct/ThumbSwiper", () => ({
  default: () => null,
}));
vi.mock("../features/detailsProduct/RelatedProducts", () => ({
  default: () => null,
}));
vi.mock("../features/detailsProduct/CommentForm", () => ({
  default: () => null,
}));

beforeEach(() => {
  state.error = null;
  state.refetch.mockReset();
});
describe.each([
  ["product", DetailsProduct],
  ["article", DetailsArticle],
])("%s detail failures", (name, Component) => {
  it("shows 404 for an absent record", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Component />
      </MemoryRouter>,
    );
    expect(screen.getByText("page not found")).toBeInTheDocument();
  });
  it("offers retry for network failures", () => {
    state.error = new Error("Offline");
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Component />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(state.refetch).toHaveBeenCalledOnce();
    expect(screen.queryByText("page not found")).not.toBeInTheDocument();
  });
});
