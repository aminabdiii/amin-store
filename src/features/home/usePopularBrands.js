import { useQuery } from "@tanstack/react-query";
import { getPopularBrands } from "../../services/popularBrandsApi";

export function usePopularBrands() {
  const { data: brands, isLoading } = useQuery({
    queryKey: ["popular-brands"],
    queryFn: getPopularBrands,
  });

  return { brands, isLoading };
}
