import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import ScrollTop from "./ui/ScrollTop";
import NotFound from "./ui/NotFound";

import "react-toastify/dist/ReactToastify.css";

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
const PageLoader = lazy(() => import("./ui/PageLoader"));
const LogIn = lazy(() => import("./features/signOrLoginPage/LogIn"));
const ProtectComponent = lazy(() => import("./ui/ProtectComponent"));
const UserPanelPage = lazy(() => import("./pages/UserPanelPage"));
const SecureComponent = lazy(() => import("./ui/SecureComponent"));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: 2,
        // refetchOnWindowFocus: "always",
        refetchOnMount: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        draggable={true}
        stacked
        autoClose={3000}
        closeButton={true}
      />
      <BrowserRouter>
        <ScrollTop />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />

              <Route
                path="/products/:category"
                element={<ProductsByCategoryPage />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/DetailsProduct" element={<DetailsProductPage />} />
              <Route path="/DetailsArticle" element={<DetailsArticlePage />} />
            </Route>
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/userPanel"
              element={
                <Navigate to="/userPanel/accountDetails" replace={true} />
              }
            />
            <Route
              path="/userPanel/:page"
              element={
                <SecureComponent>
                  <UserPanelPage />
                </SecureComponent>
              }
            />
            <Route
              path="/sign-in"
              element={
                <ProtectComponent>
                  <SignInPage />
                </ProtectComponent>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectComponent>
                  <LogIn />
                </ProtectComponent>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="NotFound" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
