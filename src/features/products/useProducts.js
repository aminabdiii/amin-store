import { nextPage } from "../../services/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../services/productsApi";

export function useAllProducts() {
  const [searchParams] = useSearchParams();
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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      `product-${sort || "rate"}`,
      presale,
      fastestShipping,
      availableProducts,
      discountProducts,
      search,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getAllProducts({
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
