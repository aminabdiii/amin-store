import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "../../../services/userApi";
import { toast } from "react-toastify";

export function useUploadAvatar() {
  const { mutate: avatarUploader, isPending: isUploading } = useMutation({
    mutationFn: uploadAvatar,

    onSuccess: () => {
      toast.success("uploaded successflly", {
        autoClose: 3600,
      });
    },
    onError: (error) => {
      toast.error(error, {
        autoClose: 3600,
      });
    },
  });

  return { avatarUploader, isUploading };
}
