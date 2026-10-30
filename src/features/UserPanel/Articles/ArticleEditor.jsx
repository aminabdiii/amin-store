import { useEffect, useId, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  LuUndo2,
  LuRedo2,
  LuBold,
  LuItalic,
  LuUnderline,
  LuLink,
  LuMinus,
  LuQuote,
  LuTable2,
  LuListOrdered,
  LuHighlighter,
  LuBaseline,
  LuEraser,
  LuUnlink,
  LuCheck,
  LuX,
  LuBetweenHorizontalStart,
  LuBetweenVerticalStart,
  LuTableRowsSplit,
  LuTableColumnsSplit,
  LuTrash2,
  LuType,
} from "react-icons/lu";
import {
  articleExtensions,
  prepareArticleHtml,
} from "./articleEditorExtensions";
import "../../../Styles/articleEditor.css";

function ToolbarButton({ children, icon: Icon, label, active, ...props }) {
  return (
    <button
      type="button"
      className="article-editor-button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      {...props}
    >
      {Icon && <Icon aria-hidden="true" focusable="false" />}
      {children}
    </button>
  );
}

function ArticleEditor({ value = "", onChange }) {
  const lastValue = useRef(value);
  const id = useId();
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkError, setLinkError] = useState("");
  const [textColor, setTextColor] = useState("#353535");
  const [highlightColor, setHighlightColor] = useState("#fdfd77");
  const editor = useEditor({
    extensions: articleExtensions,
    content: prepareArticleHtml(value),
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        role: "textbox",
        "aria-label": "Article content",
        "aria-multiline": "true",
        class: "ck-content article-editor-content",
      },
    },
    onUpdate({ editor }) {
      const html = editor.isEmpty ? "" : editor.getHTML();
      lastValue.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== lastValue.current) {
      lastValue.current = value;
      editor.commands.setContent(prepareArticleHtml(value), {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) return null;

  const fontSize = editor.getAttributes("textStyle").fontSize || "";
  const fontSizes = [
    ["", "Default"],
    ["0.7em", "Tiny"],
    ["0.85em", "Small"],
    ["1.4em", "Big"],
    ["1.8em", "Huge"],
  ];
  const applyLink = () => {
    const url = linkUrl.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    if ((url ? chain.setLink({ href: url }) : chain.unsetLink()).run()) {
      setLinkOpen(false);
      setLinkError("");
    } else setLinkError("Enter a valid link URL.");
  };

  return (
    <div className="article-editor">
      <div
        className="article-editor-toolbar"
        role="group"
        aria-label="Article formatting"
      >
        <div
          className="article-editor-toolgroup"
          role="group"
          aria-label="History"
        >
          <ToolbarButton
            label="Undo"
            icon={LuUndo2}
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <ToolbarButton
            label="Redo"
            icon={LuRedo2}
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          />
        </div>
        <div
          className="article-editor-toolgroup"
          role="group"
          aria-label="Text style"
        >
          <select
            aria-label="Heading"
            title="Heading"
            className="article-editor-heading"
            value={editor.getAttributes("heading").level || "paragraph"}
            onChange={(event) => {
              const level = event.target.value;
              const chain = editor.chain().focus();
              (level === "paragraph"
                ? chain.setParagraph()
                : chain.setHeading({ level: Number(level) })
              ).run();
            }}
          >
            <option value="paragraph">Paragraph</option>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <option key={level} value={level}>
                Heading {level}
              </option>
            ))}
          </select>
          <label className="article-editor-size" title="Font size">
            <LuType aria-hidden="true" focusable="false" />
            <select
              aria-label="Font size"
              value={fontSize}
              onChange={(event) => {
                const chain = editor.chain().focus();
                (event.target.value
                  ? chain.setFontSize(event.target.value)
                  : chain.unsetFontSize()
                ).run();
              }}
            >
              {fontSizes.map(([size, label]) => (
                <option key={size} value={size}>
                  {label}
                </option>
              ))}
              {!fontSizes.some(([size]) => size === fontSize) && (
                <option value={fontSize}>{fontSize}</option>
              )}
            </select>
          </label>
        </div>
        <div
          className="article-editor-toolgroup"
          role="group"
          aria-label="Text formatting"
        >
          <ToolbarButton
            label="Bold"
            icon={LuBold}
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            label="Italic"
            icon={LuItalic}
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            label="Underline"
            icon={LuUnderline}
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
        </div>
        <div
          className="article-editor-toolgroup"
          role="group"
          aria-label="Colors"
        >
          <label className="article-editor-color" title="Text color">
            <LuBaseline aria-hidden="true" focusable="false" />
            <span
              className="article-editor-color-indicator"
              style={{
                backgroundColor:
                  editor.getAttributes("textStyle").color || textColor,
              }}
            />
            <input
              aria-label="Text color"
              type="color"
              value={textColor}
              onChange={(event) => {
                setTextColor(event.target.value);
                editor.chain().focus().setColor(event.target.value).run();
              }}
            />
          </label>
          <label className="article-editor-color" title="Highlight color">
            <LuHighlighter aria-hidden="true" focusable="false" />
            <span
              className="article-editor-color-indicator"
              style={{
                backgroundColor:
                  editor.getAttributes("highlight").color || highlightColor,
              }}
            />
            <input
              aria-label="Highlight color"
              type="color"
              value={highlightColor}
              onChange={(event) => {
                setHighlightColor(event.target.value);
                editor
                  .chain()
                  .focus()
                  .setHighlight({ color: event.target.value })
                  .run();
              }}
            />
          </label>
          <ToolbarButton
            label="Clear highlight"
            icon={LuEraser}
            disabled={!editor.isActive("highlight")}
            onClick={() => editor.chain().focus().unsetHighlight().run()}
          />
        </div>
        <div
          className="article-editor-toolgroup"
          role="group"
          aria-label="Lists and blocks"
        >
          <ToolbarButton
            label="Numbered list"
            icon={LuListOrdered}
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ToolbarButton
            label="Block quote"
            icon={LuQuote}
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          <ToolbarButton
            label="Horizontal line"
            icon={LuMinus}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
        </div>
        <div
          className="article-editor-toolgroup"
          role="group"
          aria-label="Insert"
        >
          <ToolbarButton
            label="Link"
            icon={LuLink}
            active={editor.isActive("link")}
            aria-expanded={linkOpen}
            aria-controls={`${id}-link`}
            onClick={() => {
              setLinkUrl(editor.getAttributes("link").href || "");
              setLinkError("");
              setLinkOpen((open) => !open);
            }}
          />
          <ToolbarButton
            label="Insert table"
            icon={LuTable2}
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          />
        </div>
      </div>
      {editor.isActive("table") && (
        <div
          className="article-editor-tabletools"
          role="group"
          aria-label="Table editing"
        >
          <span className="article-editor-context-label">
            <LuTable2 aria-hidden="true" />
            Table
          </span>
          <ToolbarButton
            label="Add row"
            icon={LuBetweenHorizontalStart}
            onClick={() => editor.chain().focus().addRowAfter().run()}
          />
          <ToolbarButton
            label="Add column"
            icon={LuBetweenVerticalStart}
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          />
          <ToolbarButton
            label="Delete row"
            icon={LuTableRowsSplit}
            onClick={() => editor.chain().focus().deleteRow().run()}
          />
          <ToolbarButton
            label="Delete column"
            icon={LuTableColumnsSplit}
            onClick={() => editor.chain().focus().deleteColumn().run()}
          />
          <ToolbarButton
            label="Delete table"
            icon={LuTrash2}
            onClick={() => editor.chain().focus().deleteTable().run()}
          />
        </div>
      )}
      {linkOpen && (
        <div id={`${id}-link`} className="article-editor-link">
          <label htmlFor={`${id}-url`}>Link URL</label>
          <input
            id={`${id}-url`}
            type="text"
            inputMode="url"
            value={linkUrl}
            placeholder="https://example.com"
            onChange={(event) => setLinkUrl(event.target.value)}
            aria-invalid={!!linkError}
            aria-describedby={linkError ? `${id}-error` : undefined}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                applyLink();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                setLinkOpen(false);
                editor.commands.focus();
              }
            }}
          />
          <ToolbarButton label="Apply link" icon={LuCheck} onClick={applyLink}>
            Apply
          </ToolbarButton>
          <ToolbarButton
            label="Remove link"
            icon={LuUnlink}
            onClick={() => {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              setLinkOpen(false);
            }}
          />
          <ToolbarButton
            label="Close link editor"
            icon={LuX}
            onClick={() => {
              setLinkOpen(false);
              editor.commands.focus();
            }}
          />
          {linkError && (
            <span id={`${id}-error`} role="alert">
              {linkError}
            </span>
          )}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export default ArticleEditor;
