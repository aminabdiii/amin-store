import { useEffect } from "react";
import { useGetUser } from "../hooks/useGetUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectComponent({ children }) {
  const { user, isLoading } = useGetUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user?.user_metadata?.userName && !isLoading) {
        navigate("/");
        Swal.fire({
          title: "you are now logged in",
          icon: "error",
        });
      }
    },
    [navigate, user, isLoading],
  );

  return children;
}

export default ProtectComponent;
