import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";

function SubMenuItem({ subMenu }) {
  const params = useParams();
  const selectedCategory = params.category;

  return (
    <li>
      <Link
        to={`/products/${subMenu.path}`}
        className={`flex items-center gap-2 border-b border-r px-4 py-[18px] transition-colors hover:bg-gray-100`}
      >
        <img src={subMenu.image} alt={subMenu.title} className="w-5" />
        {subMenu.title}
        {selectedCategory === subMenu.path && (
          <HiOutlineBadgeCheck size={18} color="#663dff" />
        )}
      </Link>
    </li>
  );
}

export default SubMenuItem;
