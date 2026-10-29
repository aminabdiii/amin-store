import QueryError from "../ui/QueryError";
import { useAllProducts } from "../features/products/useProducts";
import ProductsBySortAndFiltering from "../features/productsByCategory/ProductsBySortAndFiltering";

function Products() {
  const {
    pages,
    error,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllProducts();

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

export default Products;
