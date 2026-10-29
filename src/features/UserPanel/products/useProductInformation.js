import { useQuery } from "@tanstack/react-query";
import { getDetailProduct } from "../../../services/productsApi";

export function useProductInformation({ id }) {
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: () => getDetailProduct({ id }),
    queryKey: [`product-${id}`],
  });

  return { product, isLoading, error, refetch };
}
