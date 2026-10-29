import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUserPassword } from "../../../services/userApi";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserPassword() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { mutate: updatePassword, isPending: isUpdatingUserPassword } =
    useMutation({
      mutationFn: updateUserPassword,

      onSuccess: () => {
        client.clear();
        navigate("/login", { replace: true });
        toast.success("user password updated successfully", {
          autoClose: 2700,
        });
      },
      onError: (error) => {
        toast.error(error.message, { autoClose: 2700 });
      },
    });

  return { updatePassword, isUpdatingUserPassword };
}
