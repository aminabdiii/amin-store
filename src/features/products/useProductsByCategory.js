import { nextPage } from "../../services/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductsByCategory } from "../../services/productsApi";

export function useProductsByCategory() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { category } = params;

  const sort = searchParams.get("sort");
  const presale = searchParams.get("presale");
  const fastestShipping = searchParams.get("fastest-shipping");
  const availableProducts = searchParams.get("available-products");
  const discountProducts = searchParams.get("discount-products");

  const search = searchParams.get("s");

  const {
    data,
    error,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      `product-${category}-${sort || "default"}`,
      presale,
      fastestShipping,
      availableProducts,
      discountProducts,
      search,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getProductsByCategory({
        category,
        sort: sort || "rate",
        presale,
        availableProducts,
        discountProducts,
        search,
        pageParam,
      }),
    getNextPageParam: nextPage,
  });

  return {
    pages: data?.pages.map((page) => page.data),
    isLoading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
