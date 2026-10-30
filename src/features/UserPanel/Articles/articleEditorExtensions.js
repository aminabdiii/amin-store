import { Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Color, FontSize, TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";

const sizes = {
  "text-tiny": "0.7em",
  "text-small": "0.85em",
  "text-big": "1.4em",
  "text-huge": "1.8em",
};
const markers = {
  "marker-yellow": "#fdfd77",
  "marker-green": "#62f962",
  "marker-pink": "#fc7899",
  "marker-blue": "#72ccfd",
};

// Normalize only the editor's working copy. The forms retain the original HTML
// until the user makes an edit, so opening and saving never rewrites an article.
export function prepareArticleHtml(html) {
  const document = new DOMParser().parseFromString(html || "", "text/html");
  for (const [className, size] of Object.entries(sizes)) {
    for (const element of document.querySelectorAll(`.${className}`)) {
      if (!element.style.fontSize) element.style.fontSize = size;
    }
  }
  for (const [className, color] of Object.entries(markers)) {
    for (const element of document.querySelectorAll(`mark.${className}`)) {
      if (!element.style.backgroundColor) element.style.backgroundColor = color;
    }
  }
  for (const [className, color] of [
    ["pen-red", "#e71313"],
    ["pen-green", "#128a00"],
  ]) {
    for (const element of document.querySelectorAll(`mark.${className}`)) {
      const span = document.createElement("span");
      span.style.color = element.style.color || color;
      span.append(...element.childNodes);
      element.replaceWith(span);
    }
  }
  return document.body.innerHTML;
}

const Figure = Node.create({
  name: "articleFigure",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return { class: { default: null }, style: { default: null } };
  },
  parseHTML: () => [{ tag: "figure" }],
  renderHTML: ({ HTMLAttributes }) => ["figure", HTMLAttributes, 0],
});

const Caption = Node.create({
  name: "articleCaption",
  group: "block",
  content: "inline*",
  parseHTML: () => [{ tag: "figcaption" }],
  renderHTML: () => ["figcaption", 0],
});

const imageAttributes = [
  "src",
  "alt",
  "title",
  "width",
  "height",
  "style",
  "class",
];
const linkAttributes = ["href", "target", "rel", "title"];
function attributes(element, names) {
  return Object.fromEntries(
    names
      .filter((name) => element.hasAttribute(name))
      .map((name) => [name, element.getAttribute(name)]),
  );
}

// A block image wrapped in a link needs its own node: ordinary inline link marks
// cannot retain the anchor around a block image in ProseMirror's document model.
const LinkedImage = Node.create({
  name: "articleLinkedImage",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return { image: { default: {} }, link: { default: {} } };
  },
  parseHTML: () => [
    {
      tag: "a[href]",
      priority: 1100,
      getAttrs(element) {
        const image = element.firstElementChild;
        if (element.children.length !== 1 || image?.tagName !== "IMG")
          return false;
        return {
          image: attributes(image, imageAttributes),
          link: attributes(element, linkAttributes),
        };
      },
    },
  ],
  renderHTML: ({ node }) => ["a", node.attrs.link, ["img", node.attrs.image]],
});

const ArticleImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null },
      height: { default: null },
      style: { default: null },
      class: { default: null },
    };
  },
});

export const articleExtensions = [
  StarterKit.configure({
    // Its default trailing-node plugin can append a paragraph on a selection-only
    // transaction, incorrectly marking an untouched legacy article as edited.
    trailingNode: false,
    link: { openOnClick: false, HTMLAttributes: { target: null, rel: null } },
  }),
  TextStyle,
  Color,
  FontSize,
  Highlight.configure({ multicolor: true }),
  TableKit,
  ArticleImage,
  LinkedImage,
  Figure,
  Caption,
];
