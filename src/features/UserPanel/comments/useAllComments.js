import { nextPage } from "../../../services/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllComments } from "../../../services/commentsApi";

const COMMENTS_PER_PAGE = 8;

export function useAllComments() {
  const {
    data,
    error,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam = 1 }) =>
      getAllComments({ pageParam, COMMENTS_PER_PAGE }),
    getNextPageParam: nextPage,
  });

  return {
    error,
    refetch,
    commentPage: data?.pages.map((page) => page.data) ?? [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
