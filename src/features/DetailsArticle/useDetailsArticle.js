import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getDetailsArticle } from "../../services/articlesApi";

export function useDetailsArticle() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: detailsArticle, isLoading } = useQuery({
    queryKey: [`article-${id}`],
    queryFn: () => getDetailsArticle({ id }),
  });

  return { detailsArticle, isLoading };
}
