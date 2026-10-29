import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailsProduct from "../features/detailsProduct/DetailsProduct";
import DetailsArticle from "../features/DetailsArticle/DetailsArticle";

const state = vi.hoisted(() => ({
  error: null,
  refetch: vi.fn(),
  product: null,
  userLoading: false,
  commentsLoading: false,
  commentsError: null,
}));
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
  useGetUser: () => ({ user: null, isLoading: state.userLoading }),
}));
vi.mock("../features/detailsProduct/useGetCommentsByProductId", () => ({
  useGetCommentsByProductId: () => ({
    comments: [],
    isLoading: state.commentsLoading,
    error: state.commentsError,
    refetch: state.refetch,
  }),
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
  Object.assign(state, {
    error: null,
    product: null,
    userLoading: false,
    commentsLoading: false,
    commentsError: null,
  });
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

describe("product secondary services", () => {
  it.each(["userLoading", "commentsLoading", "commentsError", "error"])(
    "keeps product details visible during %s",
    (field) => {
      state.product = {
        id: "1",
        title: "Available product",
        category: "mobile",
      };
      state[field] = field.endsWith("Loading")
        ? true
        : new Error("Service offline");
      render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <DetailsProduct />
        </MemoryRouter>,
      );
      expect(screen.getByText("Available product")).toBeInTheDocument();
    },
  );
});
