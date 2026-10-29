import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemToCartApi } from "../../services/cartApi";
import Swal from "sweetalert2";

export function useDeleteFromCart() {
  const queryClient = useQueryClient();

  const { mutate: removeFromCartById, isPending } = useMutation({
    mutationKey: ["cart"],
    mutationFn: removeItemToCartApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      Swal.fire({
        title: error.message,
        icon: "error",
      });
    },
  });

  return { removeFromCartById, isPending };
}
