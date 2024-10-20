import { useQuery } from "@tanstack/react-query";
import { userRoleApi } from "../services/userApi";

export function useGetUserRole() {
  const { data: userRole, isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: userRoleApi,

    retry: false,
  });

  return { userRole, isLoading };
}
