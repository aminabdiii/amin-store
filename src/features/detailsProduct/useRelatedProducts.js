import { useQuery } from "@tanstack/react-query";
import { getRelatedProducts } from "../../services/productsApi";

export function useRelatedProducts({ category, expectProductId }) {
  const { data: relatedProducts, isLoading } = useQuery({
    queryKey: [`related_products_${category}-${expectProductId}`],
    queryFn: () => getRelatedProducts({ category, expectProductId }),
  });

  return { relatedProducts, isLoading };
}
