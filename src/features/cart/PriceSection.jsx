import { Close } from "@mui/icons-material";
import { FaDollarSign } from "react-icons/fa6";
import { formatMoney } from "../../utils/money";
function PriceSection({ quantity, price, netUnitPrice, discount }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-0.5 text-lg font-bold 450:text-xl sm:text-2xl">
        <FaDollarSign className="text-green-400" />
        <div className="flex gap-1.5 pb-px">
          {formatMoney(netUnitPrice)}
          <div>
            <Close /> {quantity}
          </div>
        </div>
      </div>
      {discount > 0 && (
        <span className="text-sm text-gray-400 line-through">
          {formatMoney(price)}
        </span>
      )}
    </div>
  );
}
export default PriceSection;
