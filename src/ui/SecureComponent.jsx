import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import PageLoader from "./PageLoader";
import QueryError from "./QueryError";

function SecureComponent({ children }) {
  const { user, isLoading, error, refetch } = useGetUser();
  const location = useLocation();
  if (isLoading) return <PageLoader />;
  if (error) return <QueryError onRetry={refetch} />;
  if (!user?.id)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return children || <Outlet />;
}

export default SecureComponent;
