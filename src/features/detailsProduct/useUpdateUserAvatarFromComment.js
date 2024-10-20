import { useMutation } from "@tanstack/react-query";
import { updateUserAvatarFromComment } from "../../services/commentsApi";

export function useUpdateUserAvatarFromComment() {
  const { mutate: updateUserCommentsAvatar } = useMutation({
    mutationFn: ({ useravatar, userId }) =>
      updateUserAvatarFromComment({ useravatar, userId }),

    onError(error) {
      console.error(error.message);
    },
  });

  return { updateUserCommentsAvatar };
}
