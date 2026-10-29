import MediaImage from "./MediaImage";

function ProductImage({ src, alt = "", className = "", loading = "lazy" }) {
  return (
    <MediaImage
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      kind="product"
    />
  );
}

export default ProductImage;
