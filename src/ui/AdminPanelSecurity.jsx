import { Backdrop, CircularProgress } from "@mui/material";
import { useGetUserRole } from "../hooks/useGetUserRole";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminPanelSecurity({ children }) {
  const { userRole, isLoading } = useGetUserRole();

  if (isLoading)
    return (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  if (userRole.role !== "admin") {
    Swal.fire({ title: "you are not admin", icon: "info" });
    return <Navigate to={"/userPanel/accountDetails"} />;
  }

  return children;
}

export default AdminPanelSecurity;
