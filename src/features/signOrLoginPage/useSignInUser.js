import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser } from "../../services/signInOrLoginApi";
import { showDialog } from "../../ui/dialogs/dialogService";

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
      showDialog({
        title: "registration successfully",
        status: "success",
      });
    },
    onError: (error) => {
      showDialog({
        title: "something went wrong",
        description: error.message,
        status: "error",
      });
    },
  });

  return { signIn, isPending };
}
