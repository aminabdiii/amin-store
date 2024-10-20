import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogOuting } = useMutation({
    mutationKey: ["user"],
    mutationFn: logoutApi,

    onSuccess: () => {
      navigate("/Home");
      queryClient.clear();
      Swal.fire({
        title: "logout successfully",
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: error.message,
        icon: "error",
      });
    },
  });

  return { logout, isLogOuting };
}
