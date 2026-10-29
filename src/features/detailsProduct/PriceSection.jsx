import { formatMoney, discountedPrice } from "../../utils/money";
import { FaDollarSign } from "react-icons/fa6";

function PriceSection({ discount, price }) {
  const finallyPrice = discountedPrice(price, discount);

  return (
    <div className="flex flex-col gap-1 md:gap-5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-lg font-bold xs:text-xl md:text-2xl">
          <span>
            <FaDollarSign className="text-green-400" />
          </span>
          <span>{formatMoney(finallyPrice)}</span>
        </div>
        {discount > 0 && (
          <div className="flex gap-2 text-sm font-semibold text-gray-400 line-through md:text-lg">
            <span>{formatMoney(price)}</span>
          </div>
        )}
      </div>
      {discount > 0 && (
        <span className="inline-block animate-pulse text-xs font-semibold capitalize text-red-500">
          {discount}% Off on your purchase
        </span>
      )}
    </div>
  );
}

export default PriceSection;
