import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../../services/signInOrLoginApi";
import Swal from "sweetalert2";

export function useSignInUser() {
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: signInUser,

    onSuccess: () => {
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
