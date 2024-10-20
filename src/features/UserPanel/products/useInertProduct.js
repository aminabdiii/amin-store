import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertNewProductApi } from "../../../services/productsApi";
import { toast } from "react-toastify";

export function useInsertProduct() {
  const queryClient = useQueryClient();

  const { mutate: insetNewProduct, isPending } = useMutation({
    mutationFn: insertNewProductApi,
    onSuccess() {
      toast.success("create new product has been successfully");
      queryClient.invalidateQueries();
    },
  });

  return { insetNewProduct, isPending };
}
