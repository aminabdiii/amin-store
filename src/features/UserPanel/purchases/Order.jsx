import { productPath } from "../../../routing/paths";
import { CheckCircle, Close, Timer } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatMoney } from "../../../utils/money";
import { nextOrderStatuses } from "../../../utils/orderStatus";
import { showDialog } from "../../../ui/dialogs/dialogService";
import ProductImage from "../../../ui/ProductImage";
function Order({ purchaseItem, type = "user", deliveryPurchase }) {
  const {
    status,
    items,
    total,
    deliveryDate,
    createdAt,
    id,
    currency,
    paymentStatus,
  } = purchaseItem;
  const [pending, setPending] = useState(false);
  async function changeStatus(nextStatus) {
    const result = await showDialog({
      title: `Change order status to ${nextStatus.toLowerCase()}?`,
      status: "question",
      confirmation: true,
      confirmLabel: "Update status",
    });
    if (!result) return;
    setPending(true);
    deliveryPurchase(
      { id, status: nextStatus },
      { onSettled: () => setPending(false) },
    );
  }
  return (
    <section className="flex w-full flex-col rounded-2xl bg-white">
      <div className="flex flex-col gap-5 border-b p-[18px] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div
            className={`flex items-center gap-1 ${status === "DELIVERED" ? "text-green-500" : "text-yellow-600"}`}
          >
            {status === "DELIVERED" ? <CheckCircle /> : <Timer />}
            <h4 className="font-semibold text-black">{status.toLowerCase()}</h4>
          </div>
          {type === "admin" && (
            <div className="flex gap-2">
              {nextOrderStatuses[status]?.map((nextStatus) => (
                <button
                  key={nextStatus}
                  disabled={pending}
                  onClick={() => changeStatus(nextStatus)}
                  className="rounded-xl bg-violet-500 p-2 text-sm font-semibold text-white disabled:bg-gray-400"
                >
                  {nextStatus.toLowerCase()}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3 text-sm text-neutral-500">
          <p>
            Delivery date:{" "}
            <strong className="text-black">
              {deliveryDate ? deliveryDate.slice(0, 10) : "Not available"}
            </strong>
          </p>
          <div className="flex flex-wrap gap-3">
            <p>
              Total price:{" "}
              <strong className="text-black">
                {formatMoney(total)} {currency}
              </strong>
            </p>
            <p>Registered: {createdAt.slice(0, 10)}</p>
            <p>Order: {id}</p>
          </div>
          <p>
            {paymentStatus === "LEGACY_UNKNOWN"
              ? "Historical payment status unavailable"
              : "Payment not collected"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 place-items-center gap-3 divide-x-2 py-2 xxs:grid-cols-3 sm:grid-cols-4 850:grid-cols-5 lg:grid-cols-6">
        {items.map((item) => {
          const content = (
            <>
              <ProductImage
                className="w-16 vxs:w-20"
                src={item.imageUrl}
                alt={item.title}
              />
              <span className="absolute left-2 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-xs font-medium text-white">
                {item.quantity}
                <Close fontSize="inherit" />
              </span>
            </>
          );
          return item.productId ? (
            <Link
              to={productPath(item.productId)}
              key={item.id}
              title={item.title}
              className="relative flex w-full justify-center"
            >
              {content}
            </Link>
          ) : (
            <div
              key={item.id}
              title={item.title}
              className="relative flex w-full justify-center"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default Order;
