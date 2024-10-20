import { useQuery } from "@tanstack/react-query";
import { getAllFeatures } from "../../services/featuresApi";

export function useFeatures() {
  const { data: features, isLoading } = useQuery({
    queryKey: ["features"],
    queryFn: getAllFeatures,
  });

  return { features, isLoading };
}
