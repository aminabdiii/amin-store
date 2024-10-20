import { ArrowCircleRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

function EmptyCart({ className }) {
  return (
    <section
      className={`mx-auto my-5 flex max-w-7xl flex-col items-center justify-center gap-10 border bg-gray-50 px-3 font-medium capitalize ${className}`}
    >
      <img
        src="empty-cart.png"
        alt="empty-cart"
        className="w-10/12 max-w-[280px]"
      />
      <h3 className="text-lg xxs:text-xl vxs:text-2xl">
        your shopping cart is empty
      </h3>
      <Link
        to={"/products"}
        className="rounded-full bg-violet-500 p-3 text-base text-white xxs:text-lg vxs:text-xl"
      >
        products page <ArrowCircleRight />
      </Link>
    </section>
  );
}

export default EmptyCart;
