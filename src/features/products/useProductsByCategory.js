import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductsByCategory } from "../../services/productsApi";

const PRODUCTS_PER_SCROLL = 9;

export function useProductsByCategory() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { category } = params;

  const sort = searchParams.get("sort");
  const presale = searchParams.get("presale");
  const fastestShipping = searchParams.get("fastest-shipping");
  const availableProducts = searchParams.get("available-products");
  const discountProducts = searchParams.get("discount-products");

  const search = searchParams.get("s");

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        `product-${category}-${sort || "default"}`,
        presale,
        fastestShipping,
        availableProducts,
        discountProducts,
        search,
      ],
      queryFn: ({ pageParam = 1 }) =>
        getProductsByCategory({
          category,
          sort: sort || "rate",
          presale,
          availableProducts,
          discountProducts,
          search,
          pageParam,
        }),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === PRODUCTS_PER_SCROLL
          ? pages.length + 1
          : undefined;
      },
    });

  return {
    pages: data?.pages,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
