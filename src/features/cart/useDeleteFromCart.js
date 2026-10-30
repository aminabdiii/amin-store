import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemToCartApi } from "../../services/cartApi";
import { showDialog } from "../../ui/dialogs/dialogService";

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
      showDialog({
        title: error.message,
        status: "error",
      });
    },
  });

  return { removeFromCartById, isPending };
}
