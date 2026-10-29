import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MediaImage from "../ui/MediaImage";

const original = (container) =>
  container.querySelector('img[src="/photo.webp"]');

describe("API media images", () => {
  it("keeps the placeholder visible until the primary image loads", () => {
    const { container } = render(
      <MediaImage src="/photo.webp" alt="Walking shoes" />,
    );
    const frame = screen.getByRole("img", { name: "Walking shoes" });
    const image = original(container);
    expect(image).toHaveStyle({ opacity: "0" });
    expect(
      container.querySelector('img[src="/placeholders/product.svg"]'),
    ).toBeVisible();
    fireEvent.load(image);
    expect(image).toHaveStyle({ opacity: "1" });
    expect(
      container.querySelector('img[src="/placeholders/product.svg"]'),
    ).not.toBeVisible();
    expect(screen.getByRole("img", { name: "Walking shoes" })).toBe(frame);
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it.each([undefined, null, "", "  ", 123, {}, []])(
    "uses only a placeholder for an invalid source (%s)",
    (src) => {
      const { container } = render(<MediaImage src={src} alt="Shoes" />);
      expect(container.querySelectorAll("img")).toHaveLength(1);
      expect(container.querySelector("img")).toHaveAttribute(
        "src",
        "/placeholders/product.svg",
      );
    },
  );

  it.each([
    ["product", "aspect-square", "object-contain"],
    ["article", "aspect-video", "object-cover"],
    ["brand", "aspect-square", "object-contain"],
    ["category", "aspect-square", "object-contain"],
    ["avatar", "aspect-square", "object-cover"],
    ["feature", "aspect-square", "object-contain"],
  ])("reserves the correct frame and fallback for %s", (kind, aspect, fit) => {
    const { container } = render(
      <MediaImage
        src="/photo.webp"
        alt="Example"
        kind={kind}
        className="h-14 w-14"
      />,
    );
    const frame = screen.getByRole("img", { name: "Example" });
    expect(frame).toHaveClass(aspect, "h-14", "w-14");
    expect(original(container)).toHaveClass(fit);
    const fallback = container.querySelector(
      `img[src="/placeholders/${kind}.svg"]`,
    );
    expect(fallback).toHaveClass("object-contain");
    if (kind === "avatar") expect(frame).toHaveClass("rounded-full");
  });

  it("retains the frame and inline illustration when both requests fail", () => {
    const { container, rerender } = render(
      <MediaImage src="/photo.webp" alt="Shoes" className="w-20" />,
    );
    const frame = screen.getByRole("img");
    fireEvent.error(original(container));
    fireEvent.error(
      container.querySelector('img[src="/placeholders/product.svg"]'),
    );
    expect(container.querySelector("img")).toBeNull();
    expect(frame.querySelector("svg")).toBeVisible();
    rerender(<MediaImage src="/photo.webp" alt="New name" className="w-20" />);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByRole("img", { name: "New name" })).toBe(frame);
  });

  it("does not reveal a late success from a failed request", () => {
    const { container } = render(<MediaImage src="/photo.webp" alt="Shoes" />);
    const image = original(container);
    fireEvent.error(image);
    fireEvent.load(image);
    expect(original(container)).toBeNull();
    expect(
      container.querySelector('img[src="/placeholders/product.svg"]'),
    ).toBeVisible();
  });

  it("starts fresh when the source changes and ignores events on the previous image", () => {
    const { container, rerender } = render(
      <MediaImage src="/photo.webp" alt="Shoes" />,
    );
    const previous = original(container);
    fireEvent.error(previous);
    fireEvent.error(
      container.querySelector('img[src="/placeholders/product.svg"]'),
    );
    rerender(<MediaImage src=" /new.webp " alt="New shoes" />);
    const next = container.querySelector('img[src="/new.webp"]');
    expect(next).toHaveStyle({ opacity: "0" });
    fireEvent.load(previous);
    fireEvent.error(previous);
    expect(next).toHaveStyle({ opacity: "0" });
    fireEvent.load(next);
    expect(next).toHaveStyle({ opacity: "1" });
  });

  it("uses a new placeholder when the media kind changes", () => {
    const { container, rerender } = render(
      <MediaImage kind="product" alt="Example" />,
    );
    fireEvent.error(container.querySelector("img"));
    rerender(<MediaImage kind="article" alt="Example" />);
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "/placeholders/article.svg",
    );
  });

  it("leaves decorative images out of the accessible image list", () => {
    render(<MediaImage src="/photo.webp" />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("honors eager loading where requested", () => {
    const { container } = render(
      <MediaImage src="/photo.webp" loading="eager" />,
    );
    expect(original(container)).toHaveAttribute("loading", "eager");
  });
});
