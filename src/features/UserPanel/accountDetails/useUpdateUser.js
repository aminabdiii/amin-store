import { useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../../services/userApi";
import { toast } from "react-toastify";

export function useUpdateUser() {
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUserApi,

    onSuccess: () => {
      toast.success("user updated successfully", { autoClose: 2700 });
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 2700 });
    },
  });

  return { updateUser, isUpdatingUser };
}
