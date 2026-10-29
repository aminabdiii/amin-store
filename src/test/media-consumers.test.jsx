import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ArticleItem from "../ui/ArticleItem";
import SubMenuItem from "../ui/SubMenuItem";
import FeatureItem from "../features/home/FeatureItem";
import MostPopularBrands from "../features/home/MostPopularBrands";
import UploadImageSection from "../features/UserPanel/accountDetails/UploadImageSection";
import UserBox from "../features/UserPanel/users/UserBox";
import Comments from "../features/detailsProduct/Comments";
import AdminPanelCommentBox from "../features/UserPanel/comments/AdminPanelCommentBox";
import ArticleItemAdminPanel from "../features/UserPanel/Articles/ArticleItemAdminPanel";

function renderConsumer(component) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  client.setQueryData(
    ["popular-brands"],
    [{ id: 1, title: "Brand", image: { url: "/broken.webp" } }],
  );
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {component}
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

const user = {
  id: 1,
  fullName: "Amin",
  username: "amin",
  active: true,
  createdAt: "2026-10-29T12:00:00Z",
  avatar: { url: "/broken.webp" },
  avatarUrl: "/broken.webp",
};
const comment = {
  id: 1,
  user,
  productId: 1,
  approved: true,
  content: "Good",
  rating: 5,
  createdAt: "2026-10-29T12:00:00Z",
};

describe("API image consumers", () => {
  it.each([
    [
      "article",
      <ArticleItem
        key="article"
        article={{ id: 1, title: "Article", image: { url: "/broken.webp" } }}
      />,
    ],
    [
      "article",
      <ArticleItemAdminPanel
        key="admin-article"
        article={{ id: 1, title: "Article", image: { url: "/broken.webp" } }}
      />,
    ],
    [
      "category",
      <SubMenuItem
        key="category"
        subMenu={{
          title: "Shoes",
          slug: "shoes",
          image: { url: "/broken.webp" },
        }}
      />,
    ],
    [
      "feature",
      <FeatureItem
        key="feature"
        feature={{
          title: "Delivery",
          description: "Fast delivery",
          image: { url: "/broken.webp" },
        }}
      />,
    ],
    ["brand", <MostPopularBrands key="brand" />],
    [
      "avatar",
      <UploadImageSection
        key="profile"
        avatarUrlPath="/broken.webp"
        register={{}}
      />,
    ],
    ["avatar", <UserBox key="user" user={user} />],
    ["avatar", <Comments key="comments" comments={[comment]} />],
    ["avatar", <AdminPanelCommentBox key="admin-comments" comment={comment} />],
  ])(
    "keeps a %s placeholder when a consumer's image fails",
    (kind, component) => {
      const { container } = renderConsumer(component);
      const image = container.querySelector('img[src="/broken.webp"]');
      expect(image).toBeInTheDocument();
      fireEvent.error(image);
      expect(container.querySelector('img[src="/broken.webp"]')).toBeNull();
      expect(
        container.querySelector(`img[src="/placeholders/${kind}.svg"]`),
      ).toBeVisible();
    },
  );

  it("uses fixed article media and title slots for a missing cover", () => {
    renderConsumer(
      <ArticleItem article={{ id: 1, title: "Article", image: null }} />,
    );
    expect(screen.getByRole("img", { name: "Article" })).toHaveClass(
      "aspect-video",
    );
    expect(screen.getByText("Article")).toHaveClass("h-12", "xs:h-16");
  });

  it("preserves the avatar file input and loads a newly uploaded URL", () => {
    const onChange = vi.fn();
    const { container, rerender } = render(
      <UploadImageSection
        avatarUrlPath="/old.webp"
        register={{ onChange, name: "avatar" }}
      />,
    );
    fireEvent.error(container.querySelector('img[src="/old.webp"]'));
    const file = new File(["image"], "avatar.webp", { type: "image/webp" });
    fireEvent.change(container.querySelector('input[type="file"]'), {
      target: { files: [file] },
    });
    expect(onChange).toHaveBeenCalledOnce();
    rerender(
      <UploadImageSection
        avatarUrlPath="/new-avatar.webp"
        isUploading
        register={{ onChange, name: "avatar" }}
      />,
    );
    const image = container.querySelector('img[src="/new-avatar.webp"]');
    expect(image).toHaveStyle({ opacity: "0" });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    fireEvent.load(image);
    expect(image).toHaveStyle({ opacity: "1" });
  });
});
