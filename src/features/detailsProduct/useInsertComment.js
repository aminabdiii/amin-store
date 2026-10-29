import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCommentApi } from "../../services/commentsApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function useInsertComment() {
  const queryClient = useQueryClient();
  const { productId } = useParams();
  const { mutate: insertComment } = useMutation({
    mutationFn: ({ ...commentInfo }) =>
      insertCommentApi({ ...commentInfo, productId }),

    onSuccess() {
      toast.success(
        "Your comment has been submitted. It will be displayed after review.",
        { autoClose: 5000 },
      );
      queryClient.invalidateQueries({ queryKey: [`comments-${productId}`] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { insertComment };
}
