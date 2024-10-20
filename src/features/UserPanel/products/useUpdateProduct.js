import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductApi } from "../../../services/productsApi";
import { toast } from "react-toastify";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProduct } = useMutation({
    mutationFn: updateProductApi,

    onSuccess(data) {
      toast.success("update has been successfully");
      queryClient.invalidateQueries();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { updateProduct };
}
