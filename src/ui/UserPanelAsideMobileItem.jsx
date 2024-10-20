import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

function UserPanelAsideMobileItem({
  path,
  pageAddress,
  children,
  type = "user",
  onClick = () => {},
}) {
  if (type === "user")
    return (
      <li>
        <Link
          className={`flex flex-wrap items-center gap-3 rounded-xl p-2.5 text-sm xxs:text-base xs:p-3.5 ${pageAddress === path ? "bg-violet-500 text-white" : "bg-white text-black"}`}
          to={`/userPanel/${path}`}
          onClick={onClick}
        >
          {children}
        </Link>
      </li>
    );
  if (type === "admin") {
    return (
      <li>
        <Link
          className={`flex flex-wrap items-center justify-between rounded-xl p-2.5 text-sm xxs:text-base xs:p-3.5 ${pageAddress === path ? "bg-violet-500 text-white" : "bg-white text-black"}`}
          to={`/userPanel/${path}`}
          onClick={onClick}
        >
          <span className="flex items-center gap-3">{children}</span>
          <span
            className={pageAddress === path ? "text-white" : "text-neutral-500"}
          >
            <AdminPanelSettingsOutlined color="inherit" />
          </span>
        </Link>
      </li>
    );
  }
}

export default UserPanelAsideMobileItem;
