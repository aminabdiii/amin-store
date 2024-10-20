import {
  HiOutlineCreditCard,
  HiOutlineShoppingBag,
  HiTrash,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { useGetUserCartItems } from "./useGetUserCartItems";
import { FaDollarSign } from "react-icons/fa6";
import { Button } from "@mui/material";
import { useGetUser } from "../../hooks/useGetUser";
import { useDeleteFromCart } from "./useDeleteFromCart";
import { Navigate } from "react-router-dom";
import { useInsertUserPurchases } from "./useInsertUserPurchases";
import { useClearUserCart } from "./useClearUserCart";
import { useQueryClient } from "@tanstack/react-query";

import Container from "../../ui/Container";
import Loader from "../../ui/Loader";
import TopBarTitle from "./TopBarTitle";
import CounterSection from "../detailsProduct/CounterSection";
import Image from "./Image";
import ImageContainer from "./ImageContainer";
import ProductContainer from "./ProductContainer";
import PriceSection from "./PriceSection";
import PickedFeaturesSection from "./PickedFeaturesSection";
import ProductTitleLink from "./ProductTitleLink";
import CartSection from "./CartSection";
import Swal from "sweetalert2";
import EmptyCart from "./EmptyCart";

import _ from "lodash";

function Cart() {
  const queryClient = useQueryClient();
  const { cartProducts, isLoading } = useGetUserCartItems();
  const { user, isLoading: isGettingUser } = useGetUser();
  const { removeFromCartById, isPending } = useDeleteFromCart();
  const { insertPurchases } = useInsertUserPurchases();
  const { clearCart } = useClearUserCart();

  if (isLoading || isGettingUser)
    return (
      <Container>
        <Loader />
      </Container>
    );

  if (!cartProducts && !isLoading && !isGettingUser) {
    Swal.fire({
      icon: "info",
      title: "Please first log in or sign up to the website",
    });
    return <Navigate to="/sign-in" replace />;
  }

  const isEmptyCart = !cartProducts.cart_items.length;

  if (isEmptyCart) return <EmptyCart className={"min-h-[35rem]"} />;

  function removeClickHandler({ productId }) {
    Swal.fire({
      title: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: "yes",
    }).then((response) => {
      if (response.isConfirmed)
        removeFromCartById(
          { productId, userId: user.id },
          { onSuccess: () => toast.success("remove successfully") },
        );
    });
  }
  const totalPrice = _.reduce(
    cartProducts.cart_items,
    (acc, item) => (acc + item.price) * item.count,
    0,
  );
  const discountPrice = _.reduce(
    cartProducts.cart_items,
    (acc, item) =>
      (item.price - (item.price * item.discount) / 100) * item.count + acc,
    0,
  );
  const isHaveDiscount = _.some(
    cartProducts.cart_items,
    (item) => item.discount,
  );

  const calcDiscount = Math.floor(
    ((totalPrice - discountPrice) / totalPrice) * 100,
  );

  const cartItems = cartProducts.cart_items.sort((a, b) => b.price - a.price);

  function completePurchasesHandler() {
    let date = new Date();

    const deliveryDate = _.reduce(
      cartProducts.cart_items,
      (acc, data, _, array) => acc + data.postType / array.length,
      0,
    );

    date.setDate(date.getDate() + Math.floor(deliveryDate));

    insertPurchases(
      {
        delivery_date: date,
        products: cartProducts.cart_items,
        userId: user.id,
        totalPrice: discountPrice,
      },
      {
        onSuccess() {
          clearCart();
          queryClient.setQueryData(["cart"], cartProducts);
        },
      },
    );
  }

  return (
    <section className="mx-auto my-5 flex max-w-7xl flex-col gap-5 px-3 md:flex-row md:justify-between">
      <>
        <CartSection>
          <TopBarTitle
            title="shopping card"
            icon={<HiOutlineShoppingBag size={30} />}
          />
          <div className="flex min-h-[80dvh] flex-col gap-3 divide-y border">
            {cartItems.map((item) => {
              const {
                title,
                price,
                size,
                image,
                discount,
                colors,
                warranty,
                category,
                id,
                count,
              } = item;

              return (
                <ProductContainer key={title}>
                  <ImageContainer>
                    <Image
                      src={image}
                      alt={title}
                      path={`/DetailsProduct?productId=${id}`}
                    />
                    <CounterSection
                      cartProducts={cartProducts}
                      productId={id}
                      userId={user.id}
                    />
                  </ImageContainer>

                  <div className="flex h-full flex-grow flex-col gap-3 pr-3">
                    <ProductTitleLink
                      title={title}
                      path={`/DetailsProduct?productId=${id}`}
                    />
                    <PriceSection
                      count={count}
                      price={price}
                      discount={discount}
                    />
                    <PickedFeaturesSection
                      category={category}
                      color={colors}
                      size={size}
                      warranty={warranty}
                    />

                    <Button
                      onClick={() => removeClickHandler({ productId: id })}
                      disabled={isPending}
                      size="small"
                      variant="contained"
                      color="error"
                      className="!mt-2 !self-end !font-montserrat !text-[10px] 450:!text-base"
                      startIcon={
                        <HiTrash className="h-3 w-3 450:h-5 450:w-5" />
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </ProductContainer>
              );
            })}
          </div>
        </CartSection>
      </>
      <>
        <div className="sticky top-[100px] h-full basis-full md:basis-1/3 md:self-start">
          <>
            <TopBarTitle
              title="Payment information"
              icon={<HiOutlineCreditCard size={30} />}
            />
          </>
          <div className="border px-3 py-5">
            <>
              <div className="flex flex-col gap-6 border-b pb-5">
                <div className="flex items-center justify-between gap-2 text-gray-700">
                  <h4 className="text-sm font-semibold capitalize">
                    total price
                  </h4>
                  <span className="flex items-center gap-1 text-base font-semibold">
                    {totalPrice.toFixed(2)}
                    <FaDollarSign size={18} />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 text-red-500">
                  <h4 className="text-sm font-semibold capitalize">
                    discounted price ({calcDiscount}%)
                  </h4>
                  <span className="flex items-center gap-1 text-base font-semibold">
                    {discountPrice.toFixed(2)}
                    <FaDollarSign size={18} />
                  </span>
                </div>
              </div>
            </>
            <>
              <div className="flex items-center justify-between pt-5 text-gray-950">
                <h4 className="text-xl font-semibold capitalize">bill:</h4>
                <span className="flex items-center gap-1 text-2xl font-bold">
                  {isHaveDiscount
                    ? discountPrice.toFixed(2)
                    : totalPrice.toFixed(2)}
                  <FaDollarSign size={18} />
                </span>
              </div>
            </>
            <>
              <div>
                <Button
                  onClick={completePurchasesHandler}
                  size="large"
                  variant="contained"
                  className="!mt-5 w-full !rounded-full !bg-green-400 !font-montserrat !text-[10px] 450:!text-base"
                >
                  Complete Purchase
                </Button>
              </div>
            </>
          </div>
        </div>
      </>
    </section>
  );
}

export default Cart;
