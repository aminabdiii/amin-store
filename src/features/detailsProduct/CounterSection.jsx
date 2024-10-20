import { HiMinus, HiPlus, HiTrash } from "react-icons/hi2";
import { useUpdateProductCountFromCart } from "../cart/useUpdateProductCountFromCart";
import { CircularProgress } from "@mui/material";
import { useDeleteFromCart } from "../cart/useDeleteFromCart";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function CounterSection({ userId, cartProducts, productId, setIsSelected }) {
  const { countUpdater, isPending: isUpdating } =
    useUpdateProductCountFromCart();
  const [count, setCount] = useState(1);

  useEffect(
    function () {
      const productCount = cartProducts?.cart_items.find(
        (item) => item.id === productId,
      )?.count;
      setCount(productCount);
    },
    [cartProducts?.cart_items, productId],
  );

  const { removeFromCartById, isPending: isDeleting } = useDeleteFromCart();

  const loading = isUpdating || isDeleting;

  function deleteItemFromCart(event) {
    event.preventDefault();

    removeFromCartById(
      { productId: productId, userId },
      {
        onSuccess: () => {
          {
            setIsSelected ? setIsSelected(false) : "";
          }
          toast.success("removed successfully", {
            position: "top-right",
            autoClose: 3600,
          });
        },
      },
    );
  }

  function increaseCount() {
    setCount((count) => count + 1);

    countUpdater({ count: count + 1, userId, productId });
  }
  function decreaseCount() {
    if (count <= 1) return;
    setCount((count) => count - 1);
    countUpdater({ count: count - 1, userId, productId });
  }

  return (
    <div className="flex h-[36.5px] items-center justify-between overflow-hidden rounded border bg-violet-50">
      <div className="h-full">
        {count > 1 ? (
          <button
            type="button"
            disabled={loading}
            className="h-full px-3"
            onClick={decreaseCount}
          >
            <HiMinus size={20} />
          </button>
        ) : (
          <button
            className="h-full px-3"
            type="button"
            onClick={deleteItemFromCart}
          >
            <HiTrash size={20} />
          </button>
        )}
      </div>
      <span className="font-extrabold">
        {loading ? <CircularProgress size={12} /> : count}
      </span>
      <div className="h-full">
        <button
          disabled={loading}
          className="h-full px-3"
          onClick={increaseCount}
        >
          <HiPlus size={20} />
        </button>
      </div>
    </div>
  );
}

export default CounterSection;
