import { useQuery } from "@tanstack/react-query";
import { getDetailProduct } from "../../services/productsApi";
import { useParams } from "react-router-dom";

export function useDetailsProduct() {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => getDetailProduct({ id: productId }),

    enabled: !!productId,
    retry: false,
  });

  return { product, isLoading, error, refetch };
}
