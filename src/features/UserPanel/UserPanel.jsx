import {
  HiOutlineBookOpen,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import { FaRegComments } from "react-icons/fa6";

import { Link, useParams } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetUserCartItems } from "../cart/useGetUserCartItems";
import { HiOutlineHeart } from "react-icons/hi";
import { useLogout } from "./useLogout";
import { Skeleton } from "@mui/material";
import { useGetUserRole } from "../../hooks/useGetUserRole";

import Logo from "../../ui/Logo";
import UserPanelVerticalNav from "./UserPanelVerticalNav";
import AccountDetails from "./accountDetails/AccountDetails";
import Swal from "sweetalert2";
import FavoriteList from "./favoriteList/FavoriteList";
import Purchases from "./purchases/Purchases";
import Users from "./users/Users";
import AdminPanelSecurity from "../../ui/AdminPanelSecurity";
import AdminPanelProducts from "./products/AdminPanelProducts";
import AdminArticlesPage from "./Articles/AdminArticlesPage";
import UserPanelAsideItem from "../../ui/UserPanelAsideItem";
import AdminPanelAllPurchases from "./allPurchases/AdminPanelAllPurchases";
import AdminPanelComments from "./comments/AdminPanelComments";

function UserPanel() {
  const { user, isLoading: isLoadingUser } = useGetUser();
  const { cartProducts, isLoading: isLoadingCart } = useGetUserCartItems();

  const { userRole, isLoading: gettingUserRole } = useGetUserRole();

  const isLoading = isLoadingUser || isLoadingCart || gettingUserRole;

  const params = useParams();
  const { logout } = useLogout();

  const { page } = params;

  if (isLoading) {
    return (
      <div>
        <div className="p-3 shadow md:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Skeleton variant="rounded" width={130.75} height={56} />
            <Skeleton variant="rounded" width={36} height={36} />
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row md:justify-between md:gap-6 md:px-8 md:py-7">
          <section className="hidden basis-1/4 md:flex md:flex-col md:gap-5">
            <div className="py-5">
              <Skeleton
                variant="rounded"
                animation="wave"
                className="!h-[80px]"
              />
            </div>

            <div className="flex flex-col gap-4 capitalize">
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
              <Skeleton variant="rounded" animation="wave" height={48} />
            </div>
          </section>
          <section className="min-h-dvh basis-3/4 space-y-10 self-stretch bg-gray-100 p-6 md:rounded-[27px]"></section>
        </div>
      </div>
    );
  }

  const isAdmin = userRole.role === "admin";

  const cartItemsLength = cartProducts?.cart_items?.length;

  function logoutHandler(event) {
    event.preventDefault();
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
    <div className="relative">
      <div className="p-3 shadow md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <UserPanelVerticalNav>
            <UserPanelVerticalNav.Toggle />
            <UserPanelVerticalNav.Window isAdmin={isAdmin} />
            <UserPanelVerticalNav.OverLay />
          </UserPanelVerticalNav>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col md:flex-row md:justify-between md:gap-6 md:px-8 md:py-7">
        <section className="sticky top-7 hidden h-full basis-1/4 md:flex md:flex-col md:gap-5">
          <div>
            <Link
              to={"/home"}
              className="base-gradient block bg-gradient-to-r from-40% bg-clip-text py-5 text-center text-2xl font-bold text-transparent 850:text-[28px] lg:text-4xl"
            >
              AMiN STORE
            </Link>
          </div>
          <ul className="flex flex-col gap-4 text-sm font-medium capitalize">
            <UserPanelAsideItem path={"accountDetails"} pageAddress={page}>
              <HiOutlineUser size={21} />
              account details
            </UserPanelAsideItem>
            <UserPanelAsideItem path={"purchases"} pageAddress={page}>
              <HiOutlineShoppingBag size={21} />
              Purchases
            </UserPanelAsideItem>
            <UserPanelAsideItem path={"favoriteList"} pageAddress={page}>
              <HiOutlineHeart size={21} />
              Favorite List
            </UserPanelAsideItem>

            {isAdmin && (
              <>
                <UserPanelAsideItem
                  path={"users"}
                  pageAddress={page}
                  type="admin"
                >
                  <HiOutlineUsers size={21} />
                  users
                </UserPanelAsideItem>
                <UserPanelAsideItem
                  path={"products"}
                  pageAddress={page}
                  type="admin"
                >
                  <HiOutlineSquares2X2 size={21} />
                  products
                </UserPanelAsideItem>
                <UserPanelAsideItem
                  path={"articles"}
                  pageAddress={page}
                  type="admin"
                >
                  <HiOutlineBookOpen size={21} />
                  articles
                </UserPanelAsideItem>
                <UserPanelAsideItem
                  path={"allPurchases"}
                  pageAddress={page}
                  type="admin"
                >
                  <HiOutlineShoppingCart size={21} />
                  allPurchases
                </UserPanelAsideItem>
                <UserPanelAsideItem
                  path={"comments"}
                  pageAddress={page}
                  type="admin"
                >
                  <FaRegComments size={21} />
                  Comments
                </UserPanelAsideItem>
              </>
            )}
            <li>
              <button
                onClick={logoutHandler}
                className="flex w-full flex-wrap items-center gap-3 rounded-xl p-2 xs:p-3 850:text-base"
              >
                <Logout size={21} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </section>
        {page === "accountDetails" && (
          <AccountDetails user={user} cartItemsLength={cartItemsLength} />
        )}
        {page === "purchases" && <Purchases />}
        {page === "favoriteList" && <FavoriteList />}
        {page === "users" && (
          <AdminPanelSecurity>
            <Users />
          </AdminPanelSecurity>
        )}
        {page === "products" && (
          <AdminPanelSecurity>
            <AdminPanelProducts />
          </AdminPanelSecurity>
        )}
        {page === "articles" && (
          <AdminPanelSecurity>
            <AdminArticlesPage />
          </AdminPanelSecurity>
        )}
        {page === "allPurchases" && (
          <AdminPanelSecurity>
            <AdminPanelAllPurchases />
          </AdminPanelSecurity>
        )}
        {page === "comments" && (
          <AdminPanelSecurity>
            <AdminPanelComments />
          </AdminPanelSecurity>
        )}
      </div>
    </div>
  );
}

export default UserPanel;
