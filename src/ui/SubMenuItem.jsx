import { categoryPath } from "../routing/paths";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import MediaImage from "./MediaImage";

function SubMenuItem({ subMenu }) {
  const params = useParams();
  const selectedCategory = params.category;

  return (
    <li>
      <Link
        to={categoryPath(subMenu.slug)}
        className={`flex items-center gap-2 border-b border-r px-4 py-[18px] transition-colors hover:bg-gray-100`}
      >
        <MediaImage
          src={subMenu.image?.url}
          alt=""
          kind="category"
          className="h-5 w-5"
        />
        {subMenu.title}
        {selectedCategory === subMenu.slug && (
          <HiOutlineBadgeCheck size={18} color="#663dff" />
        )}
      </Link>
    </li>
  );
}

export default SubMenuItem;
