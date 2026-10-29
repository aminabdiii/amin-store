import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductImage from "../ui/ProductImage";
import { MemoryRouter } from "react-router-dom";
import Product from "../features/products/Product";
import ThumbSwiper from "../features/detailsProduct/ThumbSwiper";
import CartImage from "../features/cart/Image";

describe("product image fallback", () => {
  it("shows the original image with its accessible name", () => {
    render(<ProductImage src="/product.webp" alt="Walking shoes" />);
    expect(screen.getByRole("img", { name: "Walking shoes" })).toHaveAttribute(
      "src",
      "/product.webp",
    );
  });

  it.each([undefined, null, "", "   "])(
    "uses the local fallback for a missing source (%s)",
    (src) => {
      render(<ProductImage src={src} alt="Walking shoes" />);
      expect(screen.getByRole("img")).toHaveAttribute("src", "/no-image.webp");
    },
  );

  it("replaces a broken image without replacing its frame", () => {
    render(
      <ProductImage
        src="/broken.webp"
        alt="Walking shoes"
        className="h-14 w-14"
      />,
    );
    const image = screen.getByRole("img");
    const frame = image.parentElement;
    fireEvent.error(image);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/no-image.webp");
    expect(screen.getByRole("img").parentElement).toBe(frame);
    expect(frame).toHaveClass("h-14", "w-14");
  });

  it("ends with a local icon when both image requests fail", () => {
    const { container } = render(
      <ProductImage src="/broken.webp" alt="Walking shoes" />,
    );
    const frame = screen.getByRole("img").parentElement;
    fireEvent.error(screen.getByRole("img"));
    fireEvent.error(screen.getByRole("img"));
    expect(container.querySelector("img")).toBeNull();
    expect(
      screen.getByRole("img", { name: "Walking shoes" }).parentElement,
    ).toBe(frame);
    expect(frame.querySelector("svg")).toBeInTheDocument();
  });

  it("does not retry a failed image on an unrelated rerender", () => {
    const { rerender } = render(
      <ProductImage src="/broken.webp" alt="Shoes" />,
    );
    fireEvent.error(screen.getByRole("img"));
    rerender(<ProductImage src="/broken.webp" alt="Updated shoes" />);
    expect(screen.getByRole("img", { name: "Updated shoes" })).toHaveAttribute(
      "src",
      "/no-image.webp",
    );
  });

  it("retries a new source after both previous requests failed", () => {
    const { rerender } = render(
      <ProductImage src="/broken.webp" alt="Shoes" />,
    );
    fireEvent.error(screen.getByRole("img"));
    fireEvent.error(screen.getByRole("img"));
    rerender(<ProductImage src="/new-product.webp" alt="New shoes" />);
    expect(screen.getByRole("img", { name: "New shoes" })).toHaveAttribute(
      "src",
      "/new-product.webp",
    );
  });

  it("stops after a failed fallback when the source is initially absent", () => {
    const { container } = render(<ProductImage alt="Shoes" />);
    fireEvent.error(screen.getByRole("img"));
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByRole("img", { name: "Shoes" })).toBeInTheDocument();
  });
});

describe("product image integration", () => {
  const product = {
    id: 1,
    title: "Walking shoes",
    price: "19.00",
    discount: 0,
    isAvailable: true,
    images: [{ url: "/broken.webp" }],
  };

  it.each([
    ["card", <Product key="card" product={product} />],
    [
      "cart",
      <CartImage
        key="cart"
        src="/broken.webp"
        alt={product.title}
        path="/products/1"
      />,
    ],
  ])("uses the fallback in the %s", (_, component) => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {component}
      </MemoryRouter>,
    );
    fireEvent.error(screen.getByRole("img", { name: product.title }));
    expect(screen.getByRole("img")).toHaveAttribute("src", "/no-image.webp");
  });

  it.each([[], null, undefined])(
    "renders a fallback gallery with images=%s",
    (images) => {
      render(<ThumbSwiper product={{ ...product, images }} />);
      expect(
        screen.getByRole("img", { name: "Walking shoes-general" }),
      ).toHaveAttribute("src", "/no-image.webp");
    },
  );
});
