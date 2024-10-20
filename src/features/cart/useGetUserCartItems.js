import { useQuery } from "@tanstack/react-query";
import { getUserCartItems } from "../../services/cartApi";
import { useGetUser } from "../../hooks/useGetUser";

export function useGetUserCartItems() {
  const userToken = localStorage.getItem("sb-ddjggonagtvxnthvjxtr-auth-token");
  const { user } = useGetUser();

  const { data: cartProducts, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      if (!userToken) return null;
      return getUserCartItems({ userId: user.id });
    },
  });

  return { cartProducts, isLoading };
}
