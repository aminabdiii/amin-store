import { useMutation } from "@tanstack/react-query";
import { insertUserPurchases } from "../../services/purchasesApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useInsertUserPurchases() {
  const navigation = useNavigate();

  const { mutate: insertPurchases } = useMutation({
    mutationFn: insertUserPurchases,

    onSuccess() {
      toast.success("Your order has been registered", { autoClose: 2000 });
      navigation("/userPanel/purchases");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { insertPurchases };
}
