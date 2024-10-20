import { useMutation } from "@tanstack/react-query";
import { uploadProductImageApi } from "../../../services/uploadProductImageApi";

export function useUploadProductImages() {
  const { mutate: uploadProductImage } = useMutation({
    mutationFn: uploadProductImageApi,
  });

  return { uploadProductImage };
}
