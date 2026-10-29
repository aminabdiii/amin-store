import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../services/userApi";

export function useGetUser() {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  return { user, isLoading, error, refetch };
}
