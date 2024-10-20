import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../../services/signInOrLoginApi";
import Swal from "sweetalert2";

export function useLoginUser() {
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUserApi,

    onSuccess: () => {
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
