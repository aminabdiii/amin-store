import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

function UserPanelAsideItem({ path, pageAddress, children, type = "user" }) {
  if (type === "user")
    return (
      <li>
        <Link
          className={`flex flex-wrap items-center gap-3 rounded-xl p-2 xs:p-3 850:text-base ${pageAddress === path ? "bg-violet-500 text-white" : "bg-white text-black"}`}
          to={`/userPanel/${path}`}
        >
          {children}
        </Link>
      </li>
    );

  if (type === "admin")
    return (
      <li>
        <Link
          className={`flex items-center justify-between gap-2 rounded-xl p-2 xs:p-3 850:text-base ${pageAddress === path ? "bg-violet-500 text-white" : "bg-white text-black"}`}
          to={`/userPanel/${path}`}
        >
          <div className="flex items-center gap-3">{children}</div>
          <span
            className={`${pageAddress === path ? "text-white" : "text-neutral-500"}`}
          >
            <AdminPanelSettingsOutlined />
          </span>
        </Link>
      </li>
    );
}

export default UserPanelAsideItem;
