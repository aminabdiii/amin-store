import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllComments } from "../../../services/commentsApi";

const COMMENTS_PER_PAGE = 8;

export function useAllComments() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments"],
      queryFn: ({ pageParam = 1 }) =>
        getAllComments({ pageParam, COMMENTS_PER_PAGE }),
      getNextPageParam(lastPage, pages) {
        return lastPage.length === COMMENTS_PER_PAGE
          ? pages.length + 1
          : undefined;
      },
    });

  return {
    commentPage: data?.pages,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
