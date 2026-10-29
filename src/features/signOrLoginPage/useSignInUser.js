import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser } from "../../services/signInOrLoginApi";
import Swal from "sweetalert2";

export function useSignInUser() {
  const queryClient = useQueryClient();
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: signInUser,

    onSuccess: async (data) => {
      if (data.accessToken && data.user) {
        await queryClient.cancelQueries();
        queryClient.removeQueries({
          predicate: (query) => query.queryKey[0] !== "user",
        });
        queryClient.setQueryData(["user"], data.user);
        queryClient.invalidateQueries({ queryKey: ["userRole"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
      Swal.fire({
        title: "registration successfully",
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "something went wrong",
        text: error.message,
        icon: "error",
      });
    },
  });

  return { signIn, isPending };
}
