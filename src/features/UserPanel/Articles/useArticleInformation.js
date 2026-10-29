import { useQuery } from "@tanstack/react-query";
import { getDetailsArticle } from "../../../services/articlesApi";

export function useArticleInformation({ articleId }) {
  const {
    data: articleInformation,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`article-${articleId}`],
    queryFn: () => getDetailsArticle({ id: articleId }),
  });

  return { articleInformation, isLoading, error, refetch };
}
