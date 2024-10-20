import { Skeleton } from "@mui/material";

function ProductLoaderSkeletonBox() {
  return (
    <div className="flex flex-col gap-5 border p-2">
      <Skeleton
        variant="rectangular"
        animation="wave"
        className="!w-full"
        height={258}
      />
      <div>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton animation="wave" width={50} />
        <Skeleton animation="wave" width={50} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between pl-2">
          <div className="flex gap-2">
            <Skeleton animation="wave" width={20} />
            <Skeleton animation="wave" width={90} />
          </div>
          <Skeleton animation="wave" width={40} />
        </div>
        <Skeleton animation="wave" width={90} />
      </div>
    </div>
  );
}

export default ProductLoaderSkeletonBox;
