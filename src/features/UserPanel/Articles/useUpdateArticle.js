import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticleApi } from "../../../services/articlesApi";
import { toast } from "react-toastify";

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  const { mutate: updateArticle } = useMutation({
    mutationFn: updateArticleApi,

    onSuccess(data) {
      queryClient.invalidateQueries();
      toast.success("article update has been successfully");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { updateArticle };
}
