import { Link } from "react-router-dom";
import ProductImage from "../../ui/ProductImage";

function Image({ src, alt, path }) {
  return (
    <Link to={path} className="block w-full">
      <ProductImage className="w-full" src={src} alt={alt} />
    </Link>
  );
}

export default Image;
