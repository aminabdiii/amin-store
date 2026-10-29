import QueryError from "../../../ui/QueryError";
import { Skeleton } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAdminProducts } from "../../../services/productsApi";

import UserPanelContainer from "../UserPanelContainer";
import AdminProductBox from "./AdminProductBox";
import CreateProductForm from "./CreateProductForm";
import { useCategories } from "../../../hooks/useCategories";
import { useInView } from "react-intersection-observer";

import LoadMoreButton from "../../../ui/LoadMoreButton";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

function AdminPanelProducts() {
  const { ref, inView } = useInView();
  const {
    data,
    error: productsError,
    refetch: refetchProducts,
    isLoading: isGetttingProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["admin-products"],
    queryFn: ({ pageParam = 1 }) => getAdminProducts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page < lastPage.meta.totalPages
        ? lastPage.meta.page + 1
        : undefined,
  });
  const pages = data?.pages?.map((page) => page.data) ?? [];

  useInfiniteScroll({ fetchNextPage, inView });

  const {
    categories,
    error: categoriesError,
    refetch: refetchCategories,
    isLoading: isGettingCategories,
  } = useCategories();

  const isLoading = isGetttingProducts || isGettingCategories;

  if (productsError || categoriesError)
    return (
      <QueryError
        onRetry={() => {
          refetchProducts();
          refetchCategories();
        }}
      />
    );

  if (isLoading) {
    return (
      <UserPanelContainer>
        <div className="flex justify-center md:justify-start">
          <Skeleton
            variant="rounded"
            animation="wave"
            height={51}
            width={200}
            className="rounded-[27px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 lg:gap-6">
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
        </div>
      </UserPanelContainer>
    );
  }

  return (
    <UserPanelContainer>
      <>
        <CreateProductForm categories={categories} />
      </>
      <>
        <div className="grid grid-cols-1 gap-3 xxs:grid-cols-2 xs:grid-cols-3 lg:gap-6">
          {pages.map((products) => {
            return products.map((product) => (
              <AdminProductBox key={product.id} product={product} />
            ));
          })}
          {hasNextPage && (
            <div
              className="col-span-1 flex w-full justify-center 450:col-span-2 md:col-span-3"
              ref={ref}
            >
              <LoadMoreButton
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          )}
        </div>
      </>
    </UserPanelContainer>
  );
}

export default AdminPanelProducts;
