import { Link } from "react-router-dom";

function ProductTitleLink({ path, title }) {
  return (
    <Link
      to={path}
      className="line-clamp-2 text-pretty text-sm font-semibold 450:text-base sm:text-lg"
    >
      {title}
    </Link>
  );
}

export default ProductTitleLink;
