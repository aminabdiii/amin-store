import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { panelPath } from "../routing/paths";

function UserPanelAsideItem({ path, children, type = "user" }) {
  const isAdmin = type === "admin";
  return (
    <li>
      <NavLink
        to={panelPath(path)}
        end
        className={({ isActive }) =>
          `${isAdmin ? "flex items-center justify-between gap-2" : "flex flex-wrap items-center gap-3"} rounded-xl p-2 xs:p-3 850:text-base ${isActive ? "bg-violet-500 text-white" : "bg-white text-black"}`
        }
      >
        {({ isActive }) =>
          isAdmin ? (
            <>
              <div className="flex items-center gap-3">{children}</div>
              <span className={isActive ? "text-white" : "text-neutral-500"}>
                <AdminPanelSettingsOutlined />
              </span>
            </>
          ) : (
            children
          )
        }
      </NavLink>
    </li>
  );
}

export default UserPanelAsideItem;
