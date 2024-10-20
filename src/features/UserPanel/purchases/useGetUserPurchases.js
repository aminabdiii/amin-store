import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetUser } from "../../../hooks/useGetUser";
import { getUserPurchases } from "../../../services/purchasesApi";

const purchasePerPage = 4;

export function useGetUserPurchases() {
  const { user } = useGetUser();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["purchases"],
      queryFn: ({ pageParam = 1 }) =>
        getUserPurchases({ userId: user?.id, purchasePerPage, pageParam }),
      getNextPageParam(lastPage, pages) {
        return lastPage.length === purchasePerPage
          ? pages.length + 1
          : undefined;
      },
    });

  return {
    purchasePages: data?.pages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
