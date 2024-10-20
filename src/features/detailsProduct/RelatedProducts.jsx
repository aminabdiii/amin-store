import { Skeleton } from "@mui/material";
import HeadingSection from "../home/HeadingSection";
import Product from "../products/Product";
import { useRelatedProducts } from "./useRelatedProducts";
import Empty from "../../ui/Empty";

function RelatedProducts({ category, expectProductId }) {
  const { relatedProducts, isLoading } = useRelatedProducts({
    category,
    expectProductId,
  });

  if (isLoading) {
    return (
      <div className="space-y-5">
        <HeadingSection title="Related Products" />
        <div className="grid grid-cols-1 gap-5 vxs:grid-cols-2 sm:grid-cols-3 850:grid-cols-4">
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-[300px] sm:!h-[320px] 850:!h-[400px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!hidden !h-[300px] vxs:!block sm:!h-[320px] 850:!h-[400px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!hidden !h-[300px] sm:!block sm:!h-[320px] 850:!h-[400px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!hidden !h-[300px] sm:!h-[320px] 850:!block 850:!h-[400px]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <HeadingSection title="Related Products" />

      <div className="grid grid-cols-1 gap-5 vxs:grid-cols-2 sm:grid-cols-3 850:grid-cols-4">
        {relatedProducts.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </div>
      {!relatedProducts.length && (
        <div className="w-full">
          <Empty
            title={"no related products"}
            description={
              "There are currently no related products recommended for this item"
            }
          />
        </div>
      )}
    </div>
  );
}

export default RelatedProducts;
