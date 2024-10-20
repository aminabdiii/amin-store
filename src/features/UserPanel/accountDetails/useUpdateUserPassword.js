import { toast } from "react-toastify";
import { updateUserPassword } from "../../../services/userApi";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserPassword() {
  const { mutate: updatePassword, isPending: isUpdatingUserPassword } =
    useMutation({
      mutationFn: updateUserPassword,

      onSuccess: () => {
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
