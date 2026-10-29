import { useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

const FALLBACK_IMAGE = "/no-image.webp";

function ImageFrame({ src, alt, className }) {
  const [status, setStatus] = useState("primary");
  const imageSource = status === "primary" ? src : FALLBACK_IMAGE;

  return (
    <span
      className={`relative block aspect-square shrink-0 overflow-hidden ${className}`}
    >
      {status === "unavailable" ? (
        <span
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
        >
          <HiOutlinePhotograph
            aria-hidden="true"
            className="h-1/2 w-1/2 text-gray-400"
          />
        </span>
      ) : (
        <img
          src={imageSource}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain"
          onError={() =>
            setStatus(
              imageSource === FALLBACK_IMAGE ? "unavailable" : "fallback",
            )
          }
        />
      )}
    </span>
  );
}

function ProductImage({ src, alt = "", className = "" }) {
  const source = (typeof src === "string" && src.trim()) || FALLBACK_IMAGE;

  // A new source gets a fresh attempt, even if the previous fallback failed.
  return (
    <ImageFrame key={source} src={source} alt={alt} className={className} />
  );
}

export default ProductImage;
