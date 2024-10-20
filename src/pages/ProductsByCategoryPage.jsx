import { useProductsByCategory } from "../features/products/useProductsByCategory";
import ProductsBySortAndFiltering from "../features/productsByCategory/ProductsBySortAndFiltering";

function ProductsByCategoryPage() {
  const { pages, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsByCategory();

  return (
    <ProductsBySortAndFiltering
      pages={pages}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}

export default ProductsByCategoryPage;
