import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../ui/dialogs/dialogService";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogOuting } = useMutation({
    mutationKey: ["user"],
    mutationFn: logoutApi,

    onSuccess: () => {
      navigate("/home", { replace: true });
      queryClient.clear();
      showDialog({
        title: "logout successfully",
        status: "success",
      });
    },
    onError: (error) => {
      showDialog({
        title: error.message,
        status: "error",
      });
    },
  });

  return { logout, isLogOuting };
}
