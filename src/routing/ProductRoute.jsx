import { Fragment } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { categoryPath } from "./paths";
import PageLoader from "../ui/PageLoader";
import QueryError from "../ui/QueryError";

function ProductRoute({ children }) {
  const { productId } = useParams();
  const { search, hash } = useLocation();
  const { categories, isLoading, error, refetch } = useCategories();
  if (isLoading) return <PageLoader />;
  if (error) return <QueryError onRetry={refetch} />;
  if (categories?.some(({ path }) => path === productId)) {
    return (
      <Navigate replace to={`${categoryPath(productId)}${search}${hash}`} />
    );
  }
  // Reset product-specific form and counter state when navigating to a related product.
  return <Fragment key={productId}>{children}</Fragment>;
}

export default ProductRoute;
