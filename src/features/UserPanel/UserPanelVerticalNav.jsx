import { createContext, useContext, useState } from "react";
import {
  HiBars3BottomRight,
  HiOutlineBookOpen,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useLogout } from "./useLogout";
import { HiOutlineHeart } from "react-icons/hi";
import { Logout } from "@mui/icons-material";

import Logo from "../../ui/Logo";
import Swal from "sweetalert2";
import UserPanelAsideMobileItem from "../../ui/UserPanelAsideMobileItem";
import { FaRegComments } from "react-icons/fa6";

const UserPanelVerticalNavContext = createContext();

export default function UserPanelVerticalNav({ children }) {
  const [isOpenVerticalNav, setIsOpenVerticalNav] = useState(false);

  const open = setIsOpenVerticalNav;
  const isOpen = isOpenVerticalNav;

  return (
    <UserPanelVerticalNavContext.Provider value={{ isOpen, open }}>
      {children}
    </UserPanelVerticalNavContext.Provider>
  );
}
function Toggle() {
  const { open } = useContext(UserPanelVerticalNavContext);
  return (
    <div
      className="flex cursor-pointer items-center gap-1"
      onClick={() => open(true)}
    >
      <HiBars3BottomRight className="h-9 w-9 xs:h-10 xs:w-10" />
    </div>
  );
}

function Window({ isAdmin }) {
  const { isOpen, open } = useContext(UserPanelVerticalNavContext);
  const { logout } = useLogout();
  const params = useParams();
  const { page } = params;

  function logoutHandler() {
    open(false);

    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  }

  return (
    <nav
      className={`fixed left-0 top-0 z-30 h-dvh w-56 space-y-4 bg-white px-3 shadow-xl transition-all xxs:w-60 vxs:w-64 xs:px-4 ${
        isOpen ? "translate-x-0 translate-y-0" : "-translate-x-full"
      } md:hidden`}
    >
      <div className="mx-1 flex justify-center border-b py-4 xs:py-5">
        <Logo />
      </div>
      <ul className="space-y-4 py-4 font-medium capitalize xs:py-5">
        <UserPanelAsideMobileItem
          path={"accountDetails"}
          pageAddress={page}
          onClick={() => open(false)}
        >
          <HiOutlineUser size={23} />
          <span>account details</span>
        </UserPanelAsideMobileItem>
        <UserPanelAsideMobileItem
          path={"purchases"}
          pageAddress={page}
          onClick={() => open(false)}
        >
          <HiOutlineShoppingBag size={23} />
          <span>Purchases</span>
        </UserPanelAsideMobileItem>
        <UserPanelAsideMobileItem
          path={"favoriteList"}
          pageAddress={page}
          onClick={() => open(false)}
        >
          <HiOutlineHeart size={23} />
          <span>Favorite List</span>
        </UserPanelAsideMobileItem>

        {isAdmin && (
          <>
            <UserPanelAsideMobileItem
              path={"users"}
              pageAddress={page}
              onClick={() => open(false)}
              type="admin"
            >
              <HiOutlineUsers size={23} />
              <span>users</span>
            </UserPanelAsideMobileItem>
            <UserPanelAsideMobileItem
              path={"products"}
              pageAddress={page}
              onClick={() => open(false)}
              type="admin"
            >
              <HiOutlineSquares2X2 size={23} />
              <span>products</span>
            </UserPanelAsideMobileItem>
            <UserPanelAsideMobileItem
              path={"articles"}
              pageAddress={page}
              onClick={() => open(false)}
              type="admin"
            >
              <HiOutlineBookOpen size={23} />
              <span>articles</span>
            </UserPanelAsideMobileItem>
            <UserPanelAsideMobileItem
              path={"allPurchases"}
              pageAddress={page}
              onClick={() => open(false)}
              type="admin"
            >
              <HiOutlineShoppingCart size={23} />
              <span>allPurchases</span>
            </UserPanelAsideMobileItem>
            <UserPanelAsideMobileItem
              path={"comments"}
              pageAddress={page}
              onClick={() => open(false)}
              type="admin"
            >
              <FaRegComments size={23} />
              <span>Comments</span>
            </UserPanelAsideMobileItem>
          </>
        )}
        <li>
          <Link
            onClick={logoutHandler}
            className="flex flex-wrap items-center gap-3 rounded-xl p-2.5 text-sm xxs:text-base xs:p-3.5"
          >
            <Logout size={23} />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
function OverLay() {
  const { open, isOpen } = useContext(UserPanelVerticalNavContext);

  return (
    <div
      onClick={() => open(false)}
      className={`fixed inset-0 z-10 h-dvh bg-black/40 transition-all duration-200 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } md:hidden`}
    ></div>
  );
}

UserPanelVerticalNav.Toggle = Toggle;
UserPanelVerticalNav.Window = Window;
UserPanelVerticalNav.OverLay = OverLay;
