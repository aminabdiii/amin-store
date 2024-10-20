import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCommentsByProductIdApi } from "../../services/commentsApi";

export function useGetCommentsByProductId() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const { data: comments, isLoading } = useQuery({
    queryKey: [`comments-${productId}`],
    queryFn: () => getCommentsByProductIdApi({ productId }),
  });

  return { comments, isLoading };
}
