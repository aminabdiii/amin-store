import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmUserCommentApi } from "../../../services/commentsApi";
import { toast } from "react-toastify";

export function useConfirmUserComment() {
  const queryClient = useQueryClient();

  const { mutate: confirmComment } = useMutation({
    mutationFn: confirmUserCommentApi,

    onSuccess() {
      toast.success("The desired comment has been successfully confirmed");
      queryClient.invalidateQueries();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { confirmComment };
}
