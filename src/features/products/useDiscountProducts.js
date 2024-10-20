import { useQuery } from "@tanstack/react-query";
import { getDiscountProducts } from "../../services/productsApi";

export function useDiscountProducts() {
  const { data: discountProducts, isLoading } = useQuery({
    queryKey: ["discount-products"],
    queryFn: getDiscountProducts,
  });

  return { discountProducts, isLoading };
}
