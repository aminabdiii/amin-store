import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../../services/userApi";
import { toast } from "react-toastify";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,

    onSuccess() {
      toast.success("the desired user has been successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["allUser"],
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { deleteUser };
}
