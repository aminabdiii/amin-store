import { FaClockRotateLeft, FaDollarSign } from "react-icons/fa6";
import { HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";

function Product({ product }) {
  const {
    discount,
    id,
    image,
    postType,
    price,
    title,
    rate,
    isPreSale,
    isAvailable,
  } = product;

  const finallyPrice = discount
    ? Math.floor(price - (price * discount) / 100)
    : price;

  return (
    <Link
      to={`/DetailsProduct?productId=${id}`}
      className={`group relative flex h-[inherit] w-full flex-col justify-between gap-1 rounded-md border bg-white py-4 transition-all duration-200 hover:z-10 hover:shadow-md sm:flex-col ${isPreSale && isAvailable && "hover:shadow-orange-500"} ${isAvailable && !isPreSale && "hover:shadow-violet-500"} ${!isAvailable && "grayscale hover:shadow-gray-500"}`}
    >
      <div className="flex justify-center p-2">
        <img
          className="!w-[400px]"
          src={image || "no-image.webp"}
          alt={title}
        />
      </div>
      <div className="flex !min-h-40 flex-col justify-between gap-1 px-2 sm:mx-auto sm:h-full sm:w-11/12 sm:gap-6 sm:px-0">
        <div className="flex flex-col gap-y-3">
          <h4 className="line-clamp-2 overflow-hidden text-xs font-semibold vxs:text-[11px] 450:text-sm">
            {title}
          </h4>
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium">
                {postType === 1 && isAvailable && "today"}
                {postType === 2 && isAvailable && "tomorrow"}
                {postType === 3 && isAvailable && "later"}
                {!isAvailable && "Out of stock"}
              </span>
              {isAvailable && <FaClockRotateLeft color="blue" size={14} />}
            </div>

            <div className="flex items-center gap-0.5 text-lg font-semibold text-yellow-400">
              <span>{rate ? rate : "-"}</span>
              <HiStar />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between pl-1">
            <span className="flex items-center gap-1 text-sm font-medium vxs:text-base xs:text-lg">
              <FaDollarSign className="text-green-400" />
              {finallyPrice.toLocaleString() + ".00"}
            </span>
            {discount > 0 && (
              <span className="animate-pulse rounded-full bg-red-500 px-1 py-px text-xs text-white xs:text-sm">
                {discount}%
              </span>
            )}
          </div>
          {discount > 0 ? (
            <span className="text-xs text-gray-400 line-through">
              {price.toLocaleString() + ".00"}
            </span>
          ) : (
            <div className="w-full select-none text-white">_</div>
          )}
        </div>
      </div>
      {isPreSale && isAvailable && (
        <span className="absolute left-2 top-2 text-sm font-bold capitalize text-orange-400">
          PreSale
        </span>
      )}
      {!isAvailable && (
        <span className="absolute left-2 top-2 text-sm font-bold capitalize text-gray-900">
          out of stock
        </span>
      )}
    </Link>
  );
}

export default Product;
