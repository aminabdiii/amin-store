import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPurchases } from "../../../services/purchasesApi";

const numPurchasePerPage = 4;

export function useAllPurchases() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["allPurchases"],
      queryFn: ({ pageParam = 1 }) =>
        getAllPurchases({ pageParam, numPurchasePerPage }),
      getNextPageParam(lastPage, pages) {
        return lastPage.length === numPurchasePerPage
          ? pages.length + 1
          : undefined;
      },
    });

  return {
    pages: data?.pages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
