import { useQuery } from "@tanstack/react-query";
import { getUserCartItems } from "../../services/cartApi";
import { useGetUser } from "../../hooks/useGetUser";

export function useGetUserCartItems() {
  const { user } = useGetUser();

  const {
    data: cartProducts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    enabled: !!user?.id,
    queryFn: () => getUserCartItems({ userId: user.id }),
  });

  return { cartProducts, isLoading, error, refetch };
}
