import { Link } from "react-router-dom";

function Image({ src, alt, path }) {
  return (
    <Link to={path}>
      <img className="w-full" src={src} alt={alt} />
    </Link>
  );
}

export default Image;
