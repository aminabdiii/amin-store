import { useMutation } from "@tanstack/react-query";
import { updateProductView } from "../../services/productsApi";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useUpdateProductView() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const { mutate: productViewUpdater, error } = useMutation({
    mutationKey: [`product-${productId}`],
    mutationFn: ({ view }) => updateProductView({ view, id: productId }),

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { productViewUpdater, error };
}
