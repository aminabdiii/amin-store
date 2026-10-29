import { nextPage } from "../../../services/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetUser } from "../../../hooks/useGetUser";
import { getUserPurchases } from "../../../services/purchasesApi";

const purchasePerPage = 4;

export function useGetUserPurchases() {
  const { user } = useGetUser();

  const {
    data,
    error,
    refetch,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["purchases", user?.id],
    enabled: !!user?.id,
    queryFn: ({ pageParam = 1 }) =>
      getUserPurchases({ userId: user?.id, purchasePerPage, pageParam }),
    getNextPageParam: nextPage,
  });

  return {
    error,
    refetch,
    purchasePages: data?.pages.map((page) => page.data) ?? [],
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
