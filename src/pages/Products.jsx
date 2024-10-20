import { useAllProducts } from "../features/products/useProducts";
import ProductsBySortAndFiltering from "../features/productsByCategory/ProductsBySortAndFiltering";

function Products() {
  const { pages, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAllProducts();

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

export default Products;
