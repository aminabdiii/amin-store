import QueryError from "../ui/QueryError";
import { useProductsByCategory } from "../features/products/useProductsByCategory";
import ProductsBySortAndFiltering from "../features/productsByCategory/ProductsBySortAndFiltering";

function ProductsByCategoryPage() {
  const {
    pages,
    error,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductsByCategory();

  if (error && !pages) return <QueryError onRetry={refetch} />;

  return (
    <>
      {error && <QueryError onRetry={refetch} />}
      <ProductsBySortAndFiltering
        pages={pages}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}

export default ProductsByCategoryPage;
