import { Navigate, Outlet } from "react-router-dom";
import { useGetUserRole } from "../hooks/useGetUserRole";
import { panelPath } from "../routing/paths";
import PageLoader from "./PageLoader";
import QueryError from "./QueryError";

function AdminPanelSecurity({ children }) {
  const { userRole, isLoading, error, refetch } = useGetUserRole();
  if (isLoading) return <PageLoader />;
  if (error) return <QueryError onRetry={refetch} />;
  if (userRole?.role !== "ADMIN") return <Navigate to={panelPath()} replace />;
  return children || <Outlet />;
}

export default AdminPanelSecurity;
