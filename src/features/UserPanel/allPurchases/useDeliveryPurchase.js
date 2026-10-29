import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deliveredPurchaseApi } from "../../../services/purchasesApi";
import { toast } from "react-toastify";

export function useDeliveryPurchase() {
  const queryClient = useQueryClient();

  const { mutate: deliveryPurchase, isPending } = useMutation({
    mutationFn: deliveredPurchaseApi,

    onSuccess() {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["allPurchases"] });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { deliveryPurchase, isPending };
}
