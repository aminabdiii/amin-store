import "../../Styles/articleContent.css";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MediaImage from "../../ui/MediaImage";

function positiveDimension(value) {
  return /^\d+(?:\.\d+)?$/.test(value || "") && Number(value) > 0
    ? Number(value)
    : null;
}

function imageAspectRatio(image) {
  const explicit = image.style.aspectRatio.match(
    /^(?:auto\s+)?(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/,
  );
  if (explicit && Number(explicit[1]) > 0 && Number(explicit[2]) > 0) {
    return `${explicit[1]} / ${explicit[2]}`;
  }
  const scalar = positiveDimension(image.style.aspectRatio);
  if (scalar) return `${scalar} / 1`;
  const cssWidth = positiveDimension(image.style.width.replace(/px$/, ""));
  const cssHeight = positiveDimension(image.style.height.replace(/px$/, ""));
  if (cssWidth && cssHeight) return `${cssWidth} / ${cssHeight}`;
  const width = positiveDimension(image.getAttribute("width"));
  const height = positiveDimension(image.getAttribute("height"));
  return width && height ? `${width} / ${height}` : "16 / 9";
}

function ManagedArticleContent({ content }) {
  const contentRef = useRef(null);
  const [media, setMedia] = useState([]);

  useLayoutEffect(() => {
    // The HTML remains owned by the article. Only its image slots host React
    // portals, so they share exactly the same fallback lifecycle as other media.
    const slots = Array.from(
      contentRef.current.querySelectorAll("img"),
      (image) => {
        const host = document.createElement("span");
        host.className = image.className;
        host.style.cssText = image.style.cssText;
        host.style.display = "block";
        host.style.position = "relative";
        host.style.aspectRatio = imageAspectRatio(image);
        host.style.width =
          image.style.width ||
          (positiveDimension(image.getAttribute("width"))
            ? `${image.getAttribute("width")}px`
            : "100%");
        host.style.maxWidth = "100%";
        host.style.height = "auto";
        image.replaceWith(host);
        return {
          host,
          image,
          src: image.getAttribute("src"),
          alt: image.getAttribute("alt") || "",
        };
      },
    );
    setMedia(slots);

    // Restore the original nodes for StrictMode's effect replay.
    return () => slots.forEach(({ host, image }) => host.replaceWith(image));
  }, [content]);

  return (
    <>
      <div
        ref={contentRef}
        className="ck-content mx-auto flex max-w-5xl flex-col gap-5 break-words bg-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {media.map(({ host, src, alt }, index) =>
        createPortal(
          <MediaImage
            src={src}
            alt={alt}
            kind="article"
            className="absolute inset-0 !aspect-auto h-full w-full"
          />,
          host,
          String(index),
        ),
      )}
    </>
  );
}

function ArticleContent({ content }) {
  const html = typeof content === "string" ? content : "";
  // A different article gets a fresh DOM and no events from the previous one.
  return <ManagedArticleContent key={html} content={html} />;
}

export default ArticleContent;
