import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemToCartApi } from "../../services/cartApi";
import Swal from "sweetalert2";
import { useGetUser } from "../../hooks/useGetUser";

export function useDeleteFromCart() {
  const queryClient = useQueryClient();
  const { user } = useGetUser();

  const { mutate: removeFromCartById, isPending } = useMutation({
    mutationKey: ["cart"],
    mutationFn: ({ productId }) =>
      removeItemToCartApi({ userId: user?.id, productId }),

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
