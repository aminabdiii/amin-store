import { useMutation } from "@tanstack/react-query";
import { updateProductView } from "../../services/productsApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useUpdateProductView() {
  const { productId } = useParams();

  const { mutate: productViewUpdater, error } = useMutation({
    mutationKey: [`product-${productId}`],
    mutationFn: () => updateProductView({ id: productId }),

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { productViewUpdater, error };
}
