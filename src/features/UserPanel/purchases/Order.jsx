import { CheckCircle, Close, Timer } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Order({ purchaseItem, type = "user", deliveryPurchase }) {
  const { isDelivered, products, totalPrice, delivery_date, created_at, id } =
    purchaseItem;
  const registredAt = created_at.slice(0, 10).split("-").reverse().join("/");

  function handleDelivery() {
    Swal.fire({
      title: "are you sure?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "yes",
    }).then((result) => {
      if (result.isConfirmed) deliveryPurchase({ id });
    });
  }

  return (
    <section className="flex w-full flex-col rounded-2xl bg-white">
      <div className="flex flex-col gap-5 border-b p-[18px] pb-5">
        <div
          className={`flex items-center justify-between gap-1 ${isDelivered ? "text-green-500" : "text-yellow-400"}`}
        >
          <div className="flex items-center gap-1">
            {isDelivered ? <CheckCircle color="inherit" /> : <Timer />}
            <h4 className="font-semibold text-black">
              {isDelivered ? "delivered" : "waiting"}
            </h4>
          </div>
          {type === "admin" && (
            <button
              onClick={handleDelivery}
              disabled={isDelivered}
              className={`rounded-xl border p-1 text-sm font-semibold text-white ${isDelivered ? "bg-gray-400" : "bg-green-400"}`}
            >
              {isDelivered ? "is Complete" : "Complete"}
            </button>
          )}
        </div>
        <div className="space-y-5 text-sm">
          <div className="space-x-1 font-medium text-neutral-500">
            <span>Delivery Date</span>
            <span className="font-semibold text-black">
              {delivery_date.split("-").reverse().join("/")}
            </span>
          </div>
          <div className="flex flex-col gap-3 xs:flex-row">
            <div className="space-x-1 font-medium">
              <span className="text-[12px] text-neutral-400">total price:</span>
              <span className="font-semibold">{totalPrice.toFixed(2)}</span>
            </div>
            <div className="space-x-1 font-medium">
              <span className="text-[12px] text-neutral-400">
                Date of registration:
              </span>
              <span className="font-semibold">{registredAt}</span>
            </div>
            <div className="space-x-1 font-medium">
              <span className="text-[12px] text-neutral-400">order:</span>
              <span className="font-semibold">{id}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 place-items-center gap-3 divide-x-2 py-2 xxs:grid-cols-3 sm:grid-cols-4 850:grid-cols-5 lg:grid-cols-6">
        {products.map((product) => {
          return (
            <Link
              to={`/DetailsProduct?productId=${product.id}`}
              key={product.id}
              title={product.title}
              className="relative flex w-full justify-center"
            >
              <img
                className="w-16 vxs:w-20"
                src={product.image}
                alt={product.title}
              />
              <span className="absolute left-2 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-xs font-medium text-white sm:h-7 sm:w-7">
                {product.count}
                <Close fontSize="5px" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Order;
