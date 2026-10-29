import { StrictMode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArticleContent from "../features/DetailsArticle/ArticleContent";

describe("images inside API article HTML", () => {
  it("uses the shared fallback without changing the supplied HTML or surrounding content", () => {
    const content =
      '<p>Before</p><figure class="image"><a href="/source"><img src="/photo.webp" alt="Guide" width="600" height="400"></a><figcaption>Caption</figcaption></figure><p>After</p>';
    const { container } = render(<ArticleContent content={content} />);
    const frame = screen.getByRole("img", { name: "Guide" });
    expect(
      container.querySelector('img[src="/placeholders/article.svg"]'),
    ).toBeVisible();
    expect(frame.parentElement.style.aspectRatio).toBe("600 / 400");
    expect(frame.closest("a")).toHaveAttribute("href", "/source");
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("Caption")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
    const image = container.querySelector('img[src="/photo.webp"]');
    fireEvent.load(image);
    expect(image).toHaveStyle({ opacity: "1" });
  });

  it("shows a fallback for missing sources and stops after both requests fail", () => {
    const { container } = render(
      <ArticleContent content='<p><img src="/broken.webp" alt="Broken"><img alt="Missing"></p>' />,
    );
    const broken = screen.getByRole("img", { name: "Broken" });
    const missing = screen.getByRole("img", { name: "Missing" });
    expect(broken.parentElement.style.aspectRatio).toBe("16 / 9");
    expect(missing.querySelector("img")).toHaveAttribute(
      "src",
      "/placeholders/article.svg",
    );
    fireEvent.error(container.querySelector('img[src="/broken.webp"]'));
    fireEvent.error(broken.querySelector("img"));
    expect(broken.querySelector("img")).toBeNull();
    expect(broken.querySelector("svg")).toBeVisible();
    expect(missing.querySelector("img")).toBeInTheDocument();
  });

  it.each([
    ['style="width: 240px; height: 120px"', "240 / 120"],
    ['style="aspect-ratio: 3 / 2; width: 75%"', "3 / 2"],
    ['style="aspect-ratio: 1.5"', "1.5 / 1"],
    [
      'width="600" height="400" style="width: 240px; height: 120px"',
      "240 / 120",
    ],
    ['width="600" height="400" style="width: 240px"', "600 / 400"],
    ['width="600" height="400" style="height: 120px"', "600 / 400"],
    ['width="100%" height="250"', "16 / 9"],
    ['width="0" height="-3"', "16 / 9"],
  ])("preserves valid aspect metadata (%s)", (attrs, ratio) => {
    render(
      <ArticleContent
        content={`<img src="/photo.webp" alt="Guide" ${attrs}>`}
      />,
    );
    const host = screen.getByRole("img", { name: "Guide" }).parentElement;
    expect(host.style.aspectRatio).toBe(ratio);
    expect(host.style.maxWidth).toBe("100%");
    expect(host.style.height).toBe("auto");
  });

  it("replaces the managed images when article content changes", () => {
    const { container, rerender } = render(
      <ArticleContent content='<img src="/old.webp" alt="Old">' />,
    );
    fireEvent.error(container.querySelector('img[src="/old.webp"]'));
    rerender(
      <ArticleContent content='<p>Updated</p><img src="/new.webp" alt="New">' />,
    );
    expect(screen.queryByRole("img", { name: "Old" })).toBeNull();
    const next = container.querySelector('img[src="/new.webp"]');
    expect(next).toHaveStyle({ opacity: "0" });
    fireEvent.load(next);
    expect(next).toHaveStyle({ opacity: "1" });
    expect(screen.getByText("Updated")).toBeInTheDocument();
  });

  it("does not duplicate media under StrictMode or an unrelated rerender", () => {
    const content = '<img src="/photo.webp" alt="Guide">';
    const { container, rerender, unmount } = render(
      <StrictMode>
        <ArticleContent content={content} />
      </StrictMode>,
    );
    fireEvent.error(container.querySelector('img[src="/photo.webp"]'));
    rerender(
      <StrictMode>
        <ArticleContent content={content} />
      </StrictMode>,
    );
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(container.querySelector('img[src="/photo.webp"]')).toBeNull();
    expect(
      container.querySelectorAll('img[src="/placeholders/article.svg"]'),
    ).toHaveLength(1);
    expect(() => unmount()).not.toThrow();
  });
});
