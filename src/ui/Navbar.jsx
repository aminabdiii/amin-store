import {
  HiArrowRightEndOnRectangle,
  HiChevronDown,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

import styles from "/src/Styles/Navbar.module.css";
import SubMenuContainer from "./SubMenuContainer";
import { CircularProgress } from "@mui/material";

function Navbar({ user, isLoading, cartProductLength, gettingCartItems }) {
  return (
    <nav className="hidden md:block">
      <ul
        className="relative font-semibold text-gray-900 md:flex md:items-center md:gap-x-[23px] md:gap-y-5 md:text-sm md:uppercase xl:gap-x-8"
        id="desktop-nav"
      >
        <li>
          <Link className={`py-8 ${styles["animate-border"]}`} to="/products">
            products
          </Link>
        </li>
        <li className="group relative">
          <span
            className={`py-8 ${styles["animate-border"]} cursor-pointer select-none`}
          >
            <span className="p-0">
              categories{" "}
              <HiChevronDown className="inline transition-transform group-hover:-rotate-180" />
            </span>
          </span>
          <SubMenuContainer />
        </li>
        <li>
          <Link className={`py-8 ${styles["animate-border"]}`} to="/about-us">
            About Us
          </Link>
        </li>
        <li>
          <Link className={`py-8`} to="/cart">
            <div className="relative">
              <HiOutlineShoppingCart size={40} />
              {user?.id && (
                <span
                  className={`absolute -right-2 -top-2 rounded-full px-2 py-1 text-xs text-white ${gettingCartItems ? "animate-pulse bg-gray-500" : "bg-violet-500"}`}
                >
                  {user?.id && gettingCartItems ? "0" : cartProductLength}
                </span>
              )}
            </div>
          </Link>
        </li>
        <li className="max-w-[169px] text-sm">
          {isLoading && <CircularProgress color="secondary" />}

          {!isLoading && user?.user_metadata?.userName && (
            <Link className={`py-8 normal-case`} to="/userPanel">
              <div className="flex items-center gap-1 rounded-full bg-gray-100 px-5 py-2">
                <HiOutlineUser size={24} />
                {user.user_metadata.userName.slice(0, 12)}
              </div>
            </Link>
          )}
          {!isLoading && !user?.user_metadata?.userName && (
            <Link className={`py-8`} to="/login">
              <div className="flex items-center gap-1 rounded-full bg-gray-100 px-5 py-2">
                <HiArrowRightEndOnRectangle size={24} />
                Sign | Log in
              </div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
