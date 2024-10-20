import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../services/productsApi";

const PRODUCTS_PER_SCROLL = 9;

export function useAllProducts() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const presale = searchParams.get("presale");
  const fastestShipping = searchParams.get("fastest-shipping");
  const availableProducts = searchParams.get("available-products");
  const discountProducts = searchParams.get("discount-products");
  const search = searchParams.get("s");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        `product-${sort || "rate"}`,
        presale,
        fastestShipping,
        availableProducts,
        discountProducts,
        search,
      ],
      queryFn: ({ pageParam = 1 }) =>
        getAllProducts({
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
