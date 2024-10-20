import { useQuery } from "@tanstack/react-query";
import { getDetailProduct } from "../../services/productsApi";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useDetailsProduct() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productId = searchParams.get("productId");
  const { data: product, isLoading } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => getDetailProduct({ id: productId }),

    retry: false,
    throwOnError() {
      navigate("/notfound");
    },
  });

  return { product, isLoading };
}
