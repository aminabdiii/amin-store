import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useEffect } from "react";
import Swal from "sweetalert2";

function SecureComponent({ children }) {
  const { user, isLoading } = useGetUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user?.user_metadata?.userName && !isLoading) {
        navigate("/");
        Swal.fire({
          title: "you aren't log in",
          icon: "error",
        });
      }
    },
    [navigate, user, isLoading],
  );

  return !isLoading && user?.user_metadata?.userName && children;
}

export default SecureComponent;
