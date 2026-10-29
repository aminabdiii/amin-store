import { Button, Skeleton } from "@mui/material";
import { Navigate } from "react-router-dom";
import {
  HiOutlineCreditCard,
  HiOutlineShoppingBag,
  HiTrash,
} from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa6";
import QueryError from "../../ui/QueryError";
import { productPath } from "../../routing/paths";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetUserCartItems } from "./useGetUserCartItems";
import { useDeleteFromCart } from "./useDeleteFromCart";
import { useInsertUserPurchases } from "./useInsertUserPurchases";
import { useClearUserCart } from "./useClearUserCart";
import { checkoutKey } from "../../utils/checkout";
import { formatMoney } from "../../utils/money";
import TopBarTitle from "./TopBarTitle";
import CounterSection from "../detailsProduct/CounterSection";
import Image from "./Image";
import ImageContainer from "./ImageContainer";
import ProductContainer from "./ProductContainer";
import PriceSection from "./PriceSection";
import ProductTitleLink from "./ProductTitleLink";
import CartSection from "./CartSection";
import EmptyCart from "./EmptyCart";
import Swal from "sweetalert2";
function Cart() {
  const {
    cartProducts,
    isLoading,
    error: cartError,
    refetch: refetchCart,
  } = useGetUserCartItems();
  const {
    user,
    isLoading: gettingUser,
    error: userError,
    refetch: refetchUser,
  } = useGetUser();
  const { removeFromCartById, isPending: removing } = useDeleteFromCart();
  const { insertPurchases, isPending: checkingOut } = useInsertUserPurchases();
  const { clearCart, isPending: clearing } = useClearUserCart();
  if (userError) return <QueryError onRetry={refetchUser} />;
  if (cartError) return <QueryError onRetry={refetchCart} />;
  if (isLoading || gettingUser)
    return (
      <section className="mx-auto my-5 max-w-7xl p-3">
        <Skeleton variant="rounded" height={400} />
      </section>
    );
  if (!user) return <Navigate to="/login" replace />;
  if (!cartProducts) return <QueryError onRetry={refetchCart} />;
  const { cartItems, total, requiresResolution, currency } = cartProducts;
  // Ambiguous migrated carts may have no canonical rows; show their resolution action first.
  if (requiresResolution)
    return (
      <section className="mx-auto my-5 max-w-7xl space-y-4 p-5">
        <p role="alert">
          Some saved cart options could not be matched. Clear this cart and
          select your items again before ordering.
        </p>
        <Button
          onClick={() => clearCart()}
          disabled={clearing}
          variant="contained"
        >
          Clear saved cart
        </Button>
      </section>
    );
  if (!cartItems.length) return <EmptyCart className="min-h-[35rem]" />;
  function remove(variantId) {
    Swal.fire({
      title: "Remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) removeFromCartById({ variantId });
    });
  }
  const unavailable = cartItems.some((item) => !item.isAvailable);
  return (
    <section className="mx-auto my-5 flex max-w-7xl flex-col gap-5 px-3 md:flex-row md:justify-between">
      <CartSection>
        <TopBarTitle
          title="shopping cart"
          icon={<HiOutlineShoppingBag size={30} />}
        />
        <div className="flex min-h-[40vh] flex-col gap-3 divide-y border">
          {cartItems.map((item) => (
            <ProductContainer key={item.variantId}>
              <ImageContainer>
                <Image
                  src={item.imageUrl || "/no-image.webp"}
                  alt={item.title}
                  path={productPath(item.productId)}
                />
                <CounterSection
                  cartProducts={cartProducts}
                  variantId={item.variantId}
                />
              </ImageContainer>
              <div className="flex h-full flex-grow flex-col gap-3 pr-3">
                <ProductTitleLink
                  title={item.title}
                  path={productPath(item.productId)}
                />
                <PriceSection
                  quantity={item.quantity}
                  price={item.price}
                  netUnitPrice={item.netUnitPrice}
                  discount={item.discount}
                />
                <div className="text-sm">
                  {Object.entries(item.options).map(([name, value]) => (
                    <p key={name}>
                      {name}: <strong>{value}</strong>
                    </p>
                  ))}
                </div>
                <p className="font-semibold">
                  Line total: {formatMoney(item.lineTotal)} {currency}
                </p>
                {!item.isAvailable && (
                  <p role="alert" className="text-red-600">
                    This item is unavailable in the selected quantity. Reduce
                    its quantity or remove it.
                  </p>
                )}
                <Button
                  onClick={() => remove(item.variantId)}
                  disabled={removing || checkingOut}
                  size="small"
                  variant="contained"
                  color="error"
                  className="!mt-2 !self-end !font-montserrat"
                  startIcon={<HiTrash />}
                >
                  Delete
                </Button>
              </div>
            </ProductContainer>
          ))}
        </div>
      </CartSection>
      <div className="sticky top-[100px] h-full basis-full md:basis-1/3 md:self-start">
        <TopBarTitle
          title="Order information"
          icon={<HiOutlineCreditCard size={30} />}
        />
        <div className="border px-3 py-5">
          <div className="flex items-center justify-between text-gray-950">
            <h4 className="text-xl font-semibold">Total</h4>
            <span className="flex items-center gap-1 text-2xl font-bold">
              {formatMoney(total)}
              <FaDollarSign size={18} />
            </span>
          </div>
          <p className="mt-3 text-sm text-neutral-500">
            {currency} · Discounts included. Payment has not been collected.
          </p>
          <Button
            onClick={() =>
              insertPurchases({
                idempotencyKey: checkoutKey(user.id, cartItems),
              })
            }
            disabled={checkingOut || unavailable}
            variant="contained"
            className="!mt-5 w-full !rounded-full !bg-green-400 !font-montserrat"
          >
            {checkingOut ? "Placing order…" : "Complete Purchase"}
          </Button>
        </div>
      </div>
    </section>
  );
}
export default Cart;
