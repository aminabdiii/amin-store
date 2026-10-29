import { HiMinus, HiPlus, HiTrash } from "react-icons/hi2";
import { CircularProgress } from "@mui/material";
import { useUpdateProductCountFromCart } from "../cart/useUpdateProductCountFromCart";
import { useDeleteFromCart } from "../cart/useDeleteFromCart";
function CounterSection({ cartProducts, variantId }) {
  const item = cartProducts?.cartItems.find(
    (row) => row.variantId === variantId,
  );
  const { countUpdater, isPending: updating } = useUpdateProductCountFromCart();
  const { removeFromCartById, isPending: removing } = useDeleteFromCart();
  if (!item) return null;
  const loading = updating || removing;
  return (
    <div className="flex h-[36.5px] items-center justify-between overflow-hidden rounded border bg-violet-50">
      <button
        type="button"
        disabled={loading}
        className="h-full px-3"
        aria-label={item.quantity > 1 ? "Decrease quantity" : "Remove item"}
        onClick={() =>
          item.quantity > 1
            ? countUpdater({ variantId, quantity: item.quantity - 1 })
            : removeFromCartById({ variantId })
        }
      >
        {item.quantity > 1 ? <HiMinus size={20} /> : <HiTrash size={20} />}
      </button>
      <span className="font-extrabold">
        {loading ? <CircularProgress size={12} /> : item.quantity}
      </span>
      <button
        type="button"
        disabled={loading || item.quantity >= item.stock}
        className="h-full px-3"
        aria-label="Increase quantity"
        onClick={() => countUpdater({ variantId, quantity: item.quantity + 1 })}
      >
        <HiPlus size={20} />
      </button>
    </div>
  );
}
export default CounterSection;
