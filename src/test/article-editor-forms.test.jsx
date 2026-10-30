import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AdminArticlesPage from "../features/UserPanel/Articles/AdminArticlesPage";
import EditArticleModal from "../features/UserPanel/Articles/EditArticleModal";
import { clearSession, saveSession } from "../services/authSession";

const original = '<p class="legacy">Untouched &amp; original</p>';
let requests;
const response = (data) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });

beforeEach(() => {
  vi.stubEnv("VITE_API_BASE_URL", "http://localhost:3001/api/v1");
  saveSession({ accessToken: "test", refreshToken: "refresh", expiresIn: 900 });
  requests = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url, options = {}) => {
      const path = new URL(url).pathname.replace("/api/v1", "");
      const method = options.method || "GET";
      if (method === "PATCH" || method === "POST") {
        requests.push({
          path,
          method,
          body:
            options.body instanceof FormData
              ? options.body
              : JSON.parse(options.body),
        });
        return response({ id: 77 });
      }
      if (path === "/articles")
        return response({ data: [], meta: { page: 1, totalPages: 1 } });
      const id = Number(path.split("/").at(-1));
      return response({
        id,
        title: `Article ${id}`,
        content: id === 1 ? original : "<p>Second article</p>",
        image: { id: 9, url: "/article.webp" },
      });
    }),
  );
});
afterEach(() => {
  clearSession();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function wrapper({ children }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
}
async function editText(text) {
  const textbox = screen.getByRole("textbox", { name: "Article content" });
  await act(async () => {
    textbox.querySelector("p").textContent = text;
    fireEvent.input(textbox, {
      inputType: text ? "insertText" : "deleteContentBackward",
    });
  });
}

describe("article forms with the shared editor", () => {
  it("sends an unedited article body byte-for-byte without re-uploading its image", async () => {
    render(<EditArticleModal articleId={1} onClose={() => {}} />, { wrapper });
    await screen.findByRole("textbox", { name: "Article content" });
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    await waitFor(() =>
      expect(requests).toEqual([
        {
          path: "/admin/articles/1",
          method: "PATCH",
          body: { title: "Article 1", imageId: 9, content: original },
        },
      ]),
    );
  });

  it("sends the latest edit before blur and does not carry that edit into another article", async () => {
    const { rerender } = render(
      <EditArticleModal articleId={1} onClose={() => {}} />,
      { wrapper },
    );
    await screen.findByRole("textbox", { name: "Article content" });
    await editText("Latest edit");
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    await waitFor(() =>
      expect(requests[0]?.body.content).toBe("<p>Latest edit</p>"),
    );
    rerender(<EditArticleModal articleId={2} onClose={() => {}} />);
    await waitFor(() =>
      expect(
        screen.getByRole("textbox", { name: "Article content" }),
      ).toHaveTextContent("Second article"),
    );
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    await waitFor(() =>
      expect(requests[1]).toEqual({
        path: "/admin/articles/2",
        method: "PATCH",
        body: {
          title: "Article 2",
          imageId: 9,
          content: "<p>Second article</p>",
        },
      }),
    );
  });

  it("rejects an edit that clears the article instead of silently restoring its old body", async () => {
    render(<EditArticleModal articleId={1} onClose={() => {}} />, { wrapper });
    await screen.findByRole("textbox", { name: "Article content" });
    await editText("");
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    await act(async () => {});
    expect(requests).toEqual([]);
  });

  it("creates articles with current HTML and clears both the form and editor afterward", async () => {
    const { container } = render(<AdminArticlesPage />, { wrapper });
    await screen.findByRole("textbox", { name: "Article content" });
    fireEvent.change(screen.getByLabelText("title"), {
      target: { value: "New article" },
    });
    const fileInput = container.querySelector('input[type="file"]');
    // A real file selection also sets the input's fakepath value; jsdom's
    // synthetic files array alone does not model that browser behavior.
    Object.defineProperty(fileInput, "value", {
      configurable: true,
      writable: true,
      value: "C:\\fakepath\\cover.png",
    });
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["image"], "cover.png", { type: "image/png" })],
      },
    });
    await editText("New content");
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    await waitFor(() =>
      expect(requests.find((x) => x.path === "/admin/articles")?.body).toEqual({
        title: "New article",
        content: "<p>New content</p>",
        imageId: 77,
      }),
    );
    await waitFor(() =>
      expect(
        screen.getByRole("textbox", { name: "Article content" }).textContent,
      ).toBe(""),
    );
    expect(screen.getByLabelText("title")).toHaveValue("");
  });

  it("clears an in-progress article without sending a request", async () => {
    render(<AdminArticlesPage />, { wrapper });
    await screen.findByRole("textbox", { name: "Article content" });
    await editText("Discard me");
    fireEvent.click(screen.getByRole("button", { name: "clear" }));
    expect(
      screen.getByRole("textbox", { name: "Article content" }).textContent,
    ).toBe("");
    expect(requests).toEqual([]);
  });
});
