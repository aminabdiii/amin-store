import { Outlet } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useGetUserCartItems } from "../features/cart/useGetUserCartItems";

import VerticalNav from "./VerticalNav";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  const { user, isLoading } = useGetUser();

  const { cartProducts, isLoading: gettingCartItems } = useGetUserCartItems({
    userId: user?.id,
  });
  const cartProductLength = cartProducts?.cart_items?.length;

  return (
    <>
      <header className="bg-white shadow md:sticky md:inset-x-0 md:top-0 md:z-20">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 p-3">
          <Logo />

          <VerticalNav>
            <VerticalNav.Toggle cartProductLength={cartProductLength} />
            <VerticalNav.Window
              user={user}
              cartProductLength={cartProductLength}
            />
            <VerticalNav.Overlay />
            <VerticalNav.CategoryModal />
          </VerticalNav>

          <Navbar
            user={user}
            isLoading={isLoading}
            cartProductLength={cartProductLength}
            gettingCartItems={gettingCartItems}
          />
        </div>
      </header>
      <main className="relative">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default AppLayout;
