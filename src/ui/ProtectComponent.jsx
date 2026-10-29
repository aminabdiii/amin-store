import { useGetUser } from "../hooks/useGetUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";
import QueryError from "./QueryError";
import { getReturnPath } from "../routing/paths";

function ProtectComponent({ children }) {
  const { user, isLoading, error, refetch } = useGetUser();
  const { state } = useLocation();
  if (isLoading) return <PageLoader />;
  if (error) return <QueryError onRetry={refetch} />;
  if (user?.id) return <Navigate to={getReturnPath(state)} replace />;
  return children || <Outlet />;
}

export default ProtectComponent;
