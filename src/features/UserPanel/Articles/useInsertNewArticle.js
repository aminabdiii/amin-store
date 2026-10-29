import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertNewArticleApi } from "../../../services/articlesApi";
import { toast } from "react-toastify";

export function useInsertNewArticle() {
  const queryClient = useQueryClient();

  const { mutateAsync: insertNewArticle } = useMutation({
    mutationFn: insertNewArticleApi,

    onSuccess() {
      toast.success("insert new article has been successfully");
      queryClient.invalidateQueries({ queryKey: ["latestArticles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { insertNewArticle };
}
