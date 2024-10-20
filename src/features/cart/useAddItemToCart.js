import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCartApi } from "../../services/cartApi";
import Swal from "sweetalert2";
import { useGetUser } from "../../hooks/useGetUser";
import { toast } from "react-toastify";

export function useAddItemToCart() {
  const { user } = useGetUser();

  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: ({ product }) =>
      addItemToCartApi({ userId: user?.id, product }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("added successfully!", {
        autoClose: 3600,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    },
  });

  return { addToCart, isPending };
}
