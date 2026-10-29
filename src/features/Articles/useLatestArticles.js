import { useQuery } from "@tanstack/react-query";
import { getLatestArticles } from "../../services/articlesApi";

export function useLatestArticles() {
  const {
    data: latestArticles,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["latestArticles"],
    queryFn: getLatestArticles,
  });

  return { latestArticles, isLoading, error, refetch };
}
