import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "../../../services/commentsApi";
import { toast } from "react-toastify";

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,

    onSuccess(data) {
      toast.success("deleted Comment has been successfully");
      queryClient.invalidateQueries();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { deleteComment };
}
