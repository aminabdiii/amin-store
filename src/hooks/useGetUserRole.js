import { useQuery } from "@tanstack/react-query";
import { userRoleApi } from "../services/userApi";
import { useGetUser } from "./useGetUser";

export function useGetUserRole() {
  const { user } = useGetUser();
  const {
    data: userRole,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.id],
    queryFn: userRoleApi,
    enabled: !!user?.id,
    retry: false,
  });

  return { userRole, isLoading, error, refetch };
}
