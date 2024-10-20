import { useQuery } from "@tanstack/react-query";
import { getCategorySubMenus } from "../services/categoriesApi";

export function useCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["submenu"],
    queryFn: getCategorySubMenus,
  });

  return { categories, isLoading };
}
