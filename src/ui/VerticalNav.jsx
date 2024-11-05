import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import {
  HiArrowRightEndOnRectangle,
  HiBars3BottomRight,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineSquares2X2,
  HiOutlineSwatch,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";

import Loader from "./Loader";
import SubMenuItem from "./SubMenuItem";

const NavbarContext = createContext();

function VerticalNav({ children }) {
  const [isOpen, setOpenId] = useState(false);
  const [isOpenModalCategory, setIsOpenModalCategory] = useState(false);

  const open = setOpenId;

  return (
    <NavbarContext.Provider
      value={{ isOpen, open, isOpenModalCategory, setIsOpenModalCategory }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
function Toggle({ cartProductLength }) {
  const { open } = useContext(NavbarContext);
  return (
    <div className="absolute right-2 flex gap-x-5 md:hidden">
      <Link className="relative" to="/cart">
        <HiOutlineShoppingCart className="h-9 w-9 xs:h-10 xs:w-10" />
        <span className="absolute -right-2 -top-2 rounded-full bg-violet-500 px-2 text-white">
          {cartProductLength}
        </span>
      </Link>

      <button onClick={() => open((open) => !open)}>
        <HiBars3BottomRight className="h-9 w-9 xs:h-10 xs:w-10" />
      </button>
    </div>
  );
}
function Window({ user, cartProductLength }) {
  const { isOpen, open, setIsOpenModalCategory } = useContext(NavbarContext);

  return (
    <div
      className={`fixed left-0 top-0 z-30 w-8/12 rounded-br-2xl bg-white shadow-xl transition-all ease-in xs:w-1/2 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:hidden`}
    >
      <h1 className="base-gradient bg-gradient-to-r bg-clip-text py-5 text-center text-2xl font-bold text-transparent">
        AMiN STORE
      </h1>
      <ul className="divide-y capitalize" onClick={() => open(false)}>
        <li>
          {user?.user_metadata?.userName ? (
            <Link
              className="flex flex-wrap items-center gap-3 p-4 xs:p-5"
              to="/userPanel"
            >
              <HiOutlineUser size={23} />
              <span>{user.user_metadata.userName}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex flex-wrap items-center gap-3 p-4 xs:p-5"
            >
              <HiArrowRightEndOnRectangle size={23} />
              <span>Sign | Log in</span>
            </Link>
          )}
        </li>
        <li>
          <Link
            to="/home"
            className="flex flex-wrap items-center gap-3 p-4 xs:p-5"
          >
            <HiOutlineHome size={23} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="flex flex-wrap items-center gap-3 p-4 xs:p-5"
          >
            <HiOutlineSquares2X2 size={23} />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <span
            onClick={() => setIsOpenModalCategory(true)}
            className="flex cursor-pointer flex-wrap items-center gap-3 p-4 xs:p-5"
          >
            <HiOutlineSwatch size={23} />
            <span>Categories</span>
          </span>
        </li>
        <li>
          <Link
            to="/cart"
            className="flex flex-wrap items-center justify-between gap-3 p-4 xs:p-5"
          >
            <span className="flex items-center gap-3">
              <HiOutlineShoppingBag size={23} />
              cart
            </span>
            <span className="rounded-full bg-violet-500 px-2 text-white">
              {cartProductLength}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            className="flex flex-wrap items-center justify-between gap-3 p-4 xs:p-5"
          >
            <span className="flex items-center gap-3">
              <HiOutlineUsers size={23} />
              About us
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function CategoryModal() {
  const { categories, isLoading } = useCategories();

  const { isOpenModalCategory, setIsOpenModalCategory } =
    useContext(NavbarContext);

  return (
    <div
      className={`fixed left-0 right-0 top-[60.2px] z-20 flex h-auto w-auto translate-y-5 justify-center overflow-hidden rounded-2xl border border-y-2 border-y-violet-500 bg-white shadow-xl transition-all duration-200 group-hover:z-10 group-hover:translate-y-0 md:hidden ${isOpenModalCategory ? `visible opacity-100` : `invisible opacity-0`} w-full scale-[.95]`}
      id="CategoryModal"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <ul
          className="grid w-full grid-cols-2 text-[11px] leading-none vxs:text-xs sm:grid-cols-3"
          onClick={() => setIsOpenModalCategory(false)}
        >
          {categories.length > 0 &&
            categories.map((subMenu) => {
              return <SubMenuItem key={subMenu.id} subMenu={subMenu} />;
            })}
        </ul>
      )}
    </div>
  );
}

function Overlay() {
  const { open, isOpen, isOpenModalCategory, setIsOpenModalCategory } =
    useContext(NavbarContext);

  return createPortal(
    <div
      onClick={() => {
        open(false);
        setIsOpenModalCategory(false);
      }}
      className={`fixed inset-0 z-10 h-dvh bg-black/40 transition-all duration-200 ${
        isOpen || isOpenModalCategory
          ? "visible opacity-100"
          : "invisible opacity-0"
      } md:hidden`}
    ></div>,
    document.body,
  );
}

VerticalNav.Toggle = Toggle;
VerticalNav.Window = Window;
VerticalNav.Overlay = Overlay;
VerticalNav.CategoryModal = CategoryModal;

export default VerticalNav;
