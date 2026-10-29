import { nextPage } from "../../../services/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPurchases } from "../../../services/purchasesApi";

const numPurchasePerPage = 4;

export function useAllPurchases() {
  const {
    data,
    error,
    refetch,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["allPurchases"],
    queryFn: ({ pageParam = 1 }) =>
      getAllPurchases({ pageParam, numPurchasePerPage }),
    getNextPageParam: nextPage,
  });

  return {
    error,
    refetch,
    pages: data?.pages.map((page) => page.data) ?? [],
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
