import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCommentsByProductIdApi } from "../../services/commentsApi";

export function useGetCommentsByProductId() {
  const { productId } = useParams();
  const {
    data: comments = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    enabled: !!productId,
    queryKey: [`comments-${productId}`],
    queryFn: () => getCommentsByProductIdApi({ productId }),
  });

  return { comments, isLoading, error, refetch };
}
