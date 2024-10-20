import { useQuery } from "@tanstack/react-query";
import { getLimitProducts } from "../../services/productsApi";

export function useLimitProducts({ limit }) {
  const { data: products, isLoading } = useQuery({
    queryKey: ["limit-products"],
    queryFn: () => getLimitProducts({ limit }),
  });

  return { products, isLoading };
}
