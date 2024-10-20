import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deliveredPurchaseApi } from "../../../services/purchasesApi";
import { toast } from "react-toastify";

export function useDeliveryPurchase() {
  const queryClient = useQueryClient();

  const { mutate: deliveryPurchase } = useMutation({
    mutationFn: deliveredPurchaseApi,

    onSuccess() {
      toast.success("The desired order is delivered");
      queryClient.invalidateQueries(["allPurchases", "purchases"]);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { deliveryPurchase };
}
