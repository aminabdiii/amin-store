import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Editor } from "@tiptap/core";
import { describe, expect, it, vi } from "vitest";
import ArticleEditor from "../features/UserPanel/Articles/ArticleEditor";
import {
  articleExtensions,
  prepareArticleHtml,
} from "../features/UserPanel/Articles/articleEditorExtensions";

const legacyHtml =
  '<h2>Guide</h2><p><strong>Bold</strong> <i>Italic</i> <u>Underline</u> <a href="https://example.com">Link</a> <span class="text-big">Large</span> <span style="color:#ff0000">Red</span> <mark class="marker-yellow">Highlight</mark></p><blockquote><p>Quote</p></blockquote><ol start="3"><li><p>Third</p></li></ol><hr><figure class="table" style="width:75%"><table><tbody><tr><th>Title</th><td>Cell</td></tr></tbody></table></figure><figure class="image image-style-side" style="width:50%"><a href="/source"><img src="/photo.webp" alt="Guide photo" width="600" height="400" style="aspect-ratio:3/2"></a><figcaption>Photo caption</figcaption></figure><p>End</p>';

describe("article editor", () => {
  it("does not rewrite an article ending in a figure when only its selection changes", () => {
    const onUpdate = vi.fn();
    const editor = new Editor({
      extensions: articleExtensions,
      content: prepareArticleHtml(
        '<figure class="image"><img src="/photo.webp" alt="Last image"><figcaption>Caption</figcaption></figure>',
      ),
      onUpdate,
    });
    try {
      editor.commands.setTextSelection(3);
      expect(onUpdate).not.toHaveBeenCalled();
      expect(editor.getHTML()).not.toMatch(/<p><\/p>$/);
    } finally {
      editor.destroy();
    }
  });

  it("loads legacy HTML without rewriting the original body or emitting changes", () => {
    const onChange = vi.fn();
    render(<ArticleEditor value={legacyHtml} onChange={onChange} />);
    const textbox = screen.getByRole("textbox", { name: "Article content" });
    expect(textbox.querySelector('img[src="/photo.webp"]')).toHaveAttribute(
      "width",
      "600",
    );
    expect(textbox.querySelector("figcaption")).toHaveTextContent(
      "Photo caption",
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it("synchronizes external article changes and resets without onChange loops", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <ArticleEditor value="<p>First article</p>" onChange={onChange} />,
    );
    rerender(
      <ArticleEditor value="<p>Second article</p>" onChange={onChange} />,
    );
    expect(screen.getByRole("textbox")).toHaveTextContent("Second article");
    expect(screen.getByRole("textbox")).not.toHaveTextContent("First article");
    rerender(<ArticleEditor value="" onChange={onChange} />);
    expect(screen.getByRole("textbox").textContent).toBe("");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("emits edits immediately and emits an empty body when the content is cleared", async () => {
    const onChange = vi.fn();
    render(<ArticleEditor value="<p>Original</p>" onChange={onChange} />);
    const textbox = screen.getByRole("textbox");
    await act(async () => {
      textbox.querySelector("p").textContent = "Changed before blur";
      fireEvent.input(textbox, { inputType: "insertText" });
    });
    await waitFor(() =>
      expect(onChange).toHaveBeenLastCalledWith("<p>Changed before blur</p>"),
    );
    await act(async () => {
      textbox.querySelector("p").textContent = "";
      fireEvent.input(textbox, { inputType: "deleteContentBackward" });
    });
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(""));
  });

  it("preserves CKEditor formatting, tables, linked images and captions after an edit", () => {
    const editor = new Editor({
      extensions: articleExtensions,
      content: prepareArticleHtml(legacyHtml),
    });
    try {
      editor.commands.insertContentAt(
        editor.state.doc.content.size,
        "<p>Added paragraph</p>",
      );
      const result = document.createElement("div");
      result.innerHTML = editor.getHTML();
      expect(result.querySelector("h2")).toHaveTextContent("Guide");
      expect(result.querySelector("strong")).toHaveTextContent("Bold");
      expect(result.querySelector("em")).toHaveTextContent("Italic");
      expect(result.querySelector("u")).toHaveTextContent("Underline");
      expect(
        result.querySelector('a[href="https://example.com"]'),
      ).toHaveTextContent("Link");
      expect(result.querySelector('span[style*="font-size"]')).toHaveStyle({
        fontSize: "1.4em",
      });
      expect(result.querySelector('span[style*="color"]')).toHaveStyle({
        color: "#ff0000",
      });
      expect(result.querySelector("mark")).toHaveStyle({
        backgroundColor: "#fdfd77",
      });
      expect(result.querySelector("blockquote")).toHaveTextContent("Quote");
      expect(result.querySelector("ol")).toHaveAttribute("start", "3");
      expect(result.querySelector("hr")).not.toBeNull();
      expect(result.querySelector("figure.table")).toHaveStyle({
        width: "75%",
      });
      expect(result.querySelector("th")).toHaveTextContent("Title");
      expect(result.querySelector("td")).toHaveTextContent("Cell");
      const image = result.querySelector('figure.image a[href="/source"] img');
      expect(image).toHaveAttribute("src", "/photo.webp");
      expect(image).toHaveAttribute("alt", "Guide photo");
      expect(image).toHaveAttribute("width", "600");
      expect(image).toHaveAttribute("height", "400");
      expect(image).toHaveStyle({ aspectRatio: "3/2" });
      expect(result.querySelector("figcaption")).toHaveTextContent(
        "Photo caption",
      );
      expect(result).toHaveTextContent("Added paragraph");
    } finally {
      editor.destroy();
    }
  });

  it.each([
    ["text-tiny", "0.7em"],
    ["text-small", "0.85em"],
    ["text-big", "1.4em"],
    ["text-huge", "1.8em"],
  ])("keeps legacy font size %s", (className, size) => {
    const editor = new Editor({
      extensions: articleExtensions,
      content: prepareArticleHtml(
        `<p><span class="${className}">Text</span></p>`,
      ),
    });
    try {
      const result = document.createElement("div");
      result.innerHTML = editor.getHTML();
      expect(result.querySelector("span")).toHaveStyle({ fontSize: size });
    } finally {
      editor.destroy();
    }
  });

  it("applies native color input events to the selected text immediately", async () => {
    const onChange = vi.fn();
    render(
      <ArticleEditor value="<p>Color selection</p>" onChange={onChange} />,
    );
    const textbox = screen.getByRole("textbox", { name: "Article content" });
    await act(async () => {
      textbox.focus();
      const range = document.createRange();
      range.selectNodeContents(textbox.querySelector("p"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.dispatchEvent(new Event("selectionchange"));
    });
    fireEvent.input(screen.getByLabelText("Text color"), {
      target: { value: "#ff0000" },
    });
    await waitFor(() =>
      expect(textbox.querySelector('span[style*="color"]')).toHaveStyle({
        color: "#ff0000",
      }),
    );
    fireEvent.input(screen.getByLabelText("Highlight color"), {
      target: { value: "#72ccfd" },
    });
    await waitFor(() =>
      expect(textbox.querySelector("mark")).toHaveStyle({
        backgroundColor: "#72ccfd",
      }),
    );
    expect(onChange).toHaveBeenCalled();
  });

  it("provides labeled formatting controls that do not submit the surrounding form", () => {
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <ArticleEditor value="<p>Text</p>" onChange={() => {}} />
      </form>,
    );
    for (const name of [
      "Undo",
      "Redo",
      "Bold",
      "Italic",
      "Underline",
      "Link",
      "Horizontal line",
      "Block quote",
      "Insert table",
      "Numbered list",
    ]) {
      expect(screen.getByRole("button", { name })).toHaveAttribute(
        "type",
        "button",
      );
    }
    expect(screen.getByLabelText("Heading")).toBeInTheDocument();
    expect(screen.getByLabelText("Text color")).toBeInTheDocument();
    expect(screen.getByLabelText("Highlight color")).toBeInTheDocument();
    expect(screen.getByLabelText("Font size")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(submit).not.toHaveBeenCalled();
  });
});
