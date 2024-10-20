import { useMutation } from "@tanstack/react-query";
import { clearUserCart } from "../../services/cartApi";
import { useGetUser } from "../../hooks/useGetUser";

export function useClearUserCart() {
  const { user } = useGetUser();

  const { mutate: clearCart } = useMutation({
    mutationFn: () => clearUserCart({ userId: user?.id }),
  });

  return { clearCart };
}
