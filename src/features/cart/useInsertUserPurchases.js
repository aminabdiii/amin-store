import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertUserPurchases } from "../../services/purchasesApi";
import { finishCheckout } from "../../utils/checkout";
import { useGetUser } from "../../hooks/useGetUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export function useInsertUserPurchases() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { user } = useGetUser();
  const { mutate: insertPurchases, isPending } = useMutation({
    mutationFn: insertUserPurchases,
    onSuccess: async () => {
      finishCheckout(user.id);
      await Promise.all([
        client.invalidateQueries({ queryKey: ["cart"] }),
        client.invalidateQueries({ queryKey: ["purchases"] }),
        client.invalidateQueries({
          predicate: (query) => String(query.queryKey[0]).startsWith("product"),
        }),
      ]);
      toast.success("Your order has been registered");
      navigate("/userPanel/purchases");
    },
    onError: (error) => toast.error(error.message),
  });
  return { insertPurchases, isPending };
}
