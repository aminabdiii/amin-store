import { useMutation } from "@tanstack/react-query";
import { uploadProductImageApi } from "../../../services/uploadProductImageApi";

export function useUploadProductImages() {
  const { mutateAsync: uploadProductImage } = useMutation({
    mutationFn: uploadProductImageApi,
  });

  return { uploadProductImage };
}
