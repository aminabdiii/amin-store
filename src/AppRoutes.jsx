import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useOutletContext } from "react-router-dom";
import NotFound from "./ui/NotFound";
import PageLoader from "./ui/PageLoader";
import SecureComponent from "./ui/SecureComponent";
import ProtectComponent from "./ui/ProtectComponent";
import AdminPanelSecurity from "./ui/AdminPanelSecurity";
import LegacyDetailRedirect from "./routing/LegacyDetailRedirect";
import ProductRoute from "./routing/ProductRoute";
import { articlePath, panelPath, productPath } from "./routing/paths";

const AppLayout = lazy(() => import("./ui/AppLayout"));
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductsByCategoryPage = lazy(
  () => import("./pages/ProductsByCategoryPage"),
);
const SignInPage = lazy(() => import("./pages/SignInPage"));
const Articles = lazy(() => import("./pages/Articles"));
const DetailsProductPage = lazy(() => import("./pages/DetailsProductPage"));
const DetailsArticlePage = lazy(() => import("./pages/DetailsArticlePage"));
const Products = lazy(() => import("./pages/Products"));
const LogIn = lazy(() => import("./features/signOrLoginPage/LogIn"));
const UserPanelPage = lazy(() => import("./pages/UserPanelPage"));
const AccountDetails = lazy(
  () => import("./features/UserPanel/accountDetails/AccountDetails"),
);
const FavoriteList = lazy(
  () => import("./features/UserPanel/favoriteList/FavoriteList"),
);
const Purchases = lazy(
  () => import("./features/UserPanel/purchases/Purchases"),
);
const Users = lazy(() => import("./features/UserPanel/users/Users"));
const AdminPanelProducts = lazy(
  () => import("./features/UserPanel/products/AdminPanelProducts"),
);
const AdminArticlesPage = lazy(
  () => import("./features/UserPanel/Articles/AdminArticlesPage"),
);
const AdminPanelAllPurchases = lazy(
  () => import("./features/UserPanel/allPurchases/AdminPanelAllPurchases"),
);
const AdminPanelComments = lazy(
  () => import("./features/UserPanel/comments/AdminPanelComments"),
);

function AccountRoute() {
  const { user, cartItemsLength } = useOutletContext();
  return <AccountDetails user={user} cartItemsLength={cartItemsLength} />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="products" element={<Products />} />
          <Route
            path="products/category/:category"
            element={<ProductsByCategoryPage />}
          />
          <Route
            path="products/:productId"
            element={
              <ProductRoute>
                <DetailsProductPage />
              </ProductRoute>
            }
          />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:articleId" element={<DetailsArticlePage />} />
          <Route
            path="DetailsProduct"
            element={
              <LegacyDetailRedirect
                parameter="productId"
                buildPath={productPath}
              />
            }
          />
          <Route
            path="DetailsArticle"
            element={
              <LegacyDetailRedirect parameter="id" buildPath={articlePath} />
            }
          />
        </Route>
        <Route path="about-us" element={<AboutUs />} />
        <Route element={<SecureComponent />}>
          <Route path="userPanel" element={<UserPanelPage />}>
            <Route index element={<Navigate to={panelPath()} replace />} />
            <Route path="accountDetails" element={<AccountRoute />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="favoriteList" element={<FavoriteList />} />
            <Route element={<AdminPanelSecurity />}>
              <Route path="users" element={<Users />} />
              <Route path="products" element={<AdminPanelProducts />} />
              <Route path="articles" element={<AdminArticlesPage />} />
              <Route path="allPurchases" element={<AdminPanelAllPurchases />} />
              <Route path="comments" element={<AdminPanelComments />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route element={<ProtectComponent />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
