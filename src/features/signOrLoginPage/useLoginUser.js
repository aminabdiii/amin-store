import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserApi } from "../../services/signInOrLoginApi";
import { showDialog } from "../../ui/dialogs/dialogService";

export function useLoginUser() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUserApi,

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
        status: "success",
        title: "logged in successfully",
        confirmLabel: "thats great!",
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

  return { login, isPending };
}

export default useLoginUser;
