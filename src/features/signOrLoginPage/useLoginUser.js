import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserApi } from "../../services/signInOrLoginApi";
import Swal from "sweetalert2";

export function useLoginUser() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUserApi,

    onSuccess: async (data) => {
      if (data.session && data.user) {
        await queryClient.cancelQueries({ queryKey: ["user"] });
        queryClient.setQueryData(["user"], data.user);
        queryClient.invalidateQueries({ queryKey: ["userRole"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
      Swal.fire({
        icon: "success",
        title: "logged in successfully",
        confirmButtonText: "thats great!",
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

  return { login, isPending };
}

export default useLoginUser;
