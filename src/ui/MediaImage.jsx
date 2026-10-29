import { useEffect, useRef, useState } from "react";

const KINDS = ["product", "article", "brand", "category", "avatar", "feature"];

function ImageFrame({ src, alt, kind, className, loading }) {
  const [status, setStatus] = useState("loading");
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const imageRef = useRef(null);
  const isCover = kind === "article" || kind === "avatar";

  // Cached images can finish before React attaches the load listener.
  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setStatus("loaded");
    }
  }, []);

  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`relative block shrink-0 overflow-hidden bg-gray-50 ${kind === "article" ? "aspect-video" : "aspect-square"} ${kind === "avatar" ? "rounded-full" : ""} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ opacity: status === "loaded" ? 0 : 1 }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 160 160"
          className="absolute inset-0 h-full w-full text-violet-500"
          fill="none"
        >
          <path fill="#f5f3ff" d="M0 0h160v160H0z" />
          <rect
            x="36"
            y="42"
            width="88"
            height="76"
            rx="12"
            stroke="currentColor"
            strokeWidth="5"
          />
          <circle cx="62" cy="65" r="9" fill="currentColor" opacity=".3" />
          <path
            d="m40 105 26-25 17 17 16-15 22 23"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {!fallbackFailed && (
          <img
            src={`/placeholders/${kind}.svg`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
            onError={() => setFallbackFailed(true)}
          />
        )}
      </span>
      {src && status !== "failed" && (
        <img
          ref={imageRef}
          src={src}
          alt=""
          aria-hidden="true"
          loading={loading}
          decoding="async"
          className={`absolute inset-0 h-full w-full ${isCover ? "object-cover" : "object-contain"}`}
          style={{ opacity: status === "loaded" ? 1 : 0 }}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />
      )}
    </span>
  );
}

function MediaImage({
  src,
  alt = "",
  kind = "product",
  className = "",
  loading = "lazy",
}) {
  const source = (typeof src === "string" && src.trim()) || "";
  const mediaKind = KINDS.includes(kind) ? kind : "product";

  return (
    <ImageFrame
      key={`${mediaKind}:${source}`}
      src={source}
      alt={alt}
      kind={mediaKind}
      className={className}
      loading={loading}
    />
  );
}

export default MediaImage;
