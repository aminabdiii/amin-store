import { formatMoney, discountedPrice } from "../../utils/money";
import { productPath } from "../../routing/paths";
import { FaClockRotateLeft, FaDollarSign } from "react-icons/fa6";
import { HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";
import ProductImage from "../../ui/ProductImage";

function Product({ product }) {
  const {
    discount,
    id,
    images,
    shippingLeadDays,
    price,
    title,
    rating,
    isPreSale,
    isAvailable,
  } = product;

  const finallyPrice = discountedPrice(price, discount);

  return (
    <Link
      to={productPath(id)}
      className={`group relative flex h-full w-full min-w-0 flex-col justify-between gap-1 rounded-md border bg-white py-4 transition-all duration-200 hover:z-10 hover:shadow-md sm:flex-col ${isPreSale && isAvailable && "hover:shadow-orange-500"} ${isAvailable && !isPreSale && "hover:shadow-violet-500"} ${!isAvailable && "grayscale hover:shadow-gray-500"}`}
    >
      <div className="shrink-0 p-2">
        <ProductImage className="w-full" src={images?.[0]?.url} alt={title} />
      </div>
      <div className="flex !min-h-40 flex-1 flex-col justify-between gap-1 px-2 sm:mx-auto sm:w-11/12 sm:gap-6 sm:px-0">
        <div className="flex flex-col gap-y-3">
          <h4 className="line-clamp-2 min-h-[2.5em] overflow-hidden text-xs font-semibold !leading-[1.25] vxs:text-[11px] 450:text-sm">
            {title}
          </h4>
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium">
                {shippingLeadDays === 1 && isAvailable && "today"}
                {shippingLeadDays === 2 && isAvailable && "tomorrow"}
                {shippingLeadDays > 2 && isAvailable && "later"}
                {!isAvailable && "Out of stock"}
              </span>
              {isAvailable && <FaClockRotateLeft color="blue" size={14} />}
            </div>

            <div className="flex items-center gap-0.5 text-lg font-semibold text-yellow-400">
              <span>{rating || "-"}</span>
              <HiStar />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between pl-1">
            <span className="flex items-center gap-1 text-sm font-medium vxs:text-base xs:text-lg">
              <FaDollarSign className="text-green-400" />
              {formatMoney(finallyPrice)}
            </span>
            {discount > 0 && (
              <span className="animate-pulse rounded-full bg-red-500 px-1 py-px text-xs text-white xs:text-sm">
                {discount}%
              </span>
            )}
          </div>
          <span className="h-4 text-xs text-gray-400 line-through">
            {discount > 0 ? formatMoney(price) : "\u00a0"}
          </span>
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
