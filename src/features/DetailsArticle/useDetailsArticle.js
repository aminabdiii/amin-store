import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDetailsArticle } from "../../services/articlesApi";

export function useDetailsArticle() {
  const { articleId: id } = useParams();

  const {
    data: detailsArticle,
    isLoading,
    error,
    refetch,
  } = useQuery({
    enabled: !!id,
    queryKey: [`article-${id}`],
    queryFn: () => getDetailsArticle({ id }),
  });

  return { detailsArticle, isLoading, error, refetch };
}
