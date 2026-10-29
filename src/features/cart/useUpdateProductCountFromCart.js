import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductCountFromCart } from "../../services/cartApi";
import { toast } from "react-toastify";

export function useUpdateProductCountFromCart() {
  const queryClient = useQueryClient();
  const { mutate: countUpdater, isPending } = useMutation({
    mutationFn: updateProductCountFromCart,

    onSuccess: () => {
      toast.success("success", { autoClose: 1000 });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { countUpdater, isPending };
}
