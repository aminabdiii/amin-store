import { Close } from "@mui/icons-material";
import { FaDollarSign } from "react-icons/fa6";

function PriceSection({ count, price, discount }) {
  const finallyPrice = discount
    ? Math.floor(price - (price * discount) / 100)
    : price;
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-0.5 text-lg font-bold 450:text-xl sm:text-2xl">
        <FaDollarSign className="text-green-400" />
        <div className="flex gap-1.5 pb-px">
          {finallyPrice?.toFixed(2)}
          <div>
            <Close /> {count}
          </div>
        </div>
      </div>
      {discount > 0 && (
        <div>
          <span className="block pb-px text-[11px] font-semibold text-gray-400 line-through 450:text-sm">
            {price?.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}

export default PriceSection;
