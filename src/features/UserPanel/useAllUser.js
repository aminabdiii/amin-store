import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/userApi";

export function useAllUser() {
  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["allUser"],
    queryFn: getAllUsers,
  });

  return { allUsers, isLoading };
}
