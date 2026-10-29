import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearUserCart } from "../../services/cartApi";
import { toast } from "react-toastify";
export function useClearUserCart() {
  const client = useQueryClient();
  const { mutate: clearCart, isPending } = useMutation({
    mutationFn: clearUserCart,
    onSuccess: () => client.invalidateQueries({ queryKey: ["cart"] }),
    onError: (error) => toast.error(error.message),
  });
  return { clearCart, isPending };
}
