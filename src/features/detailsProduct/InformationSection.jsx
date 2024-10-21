import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { AddShoppingCart, Login, Share } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useUpdateProductView } from "./useUpdateProductView";
import { useAddItemToCart } from "../cart/useAddItemToCart";
import { useGetUserCartItems } from "../cart/useGetUserCartItems";

import ItemLoader from "../../ui/ItemLoader";
import DescriptionSection from "./DescriptionSection";
import PriceSection from "./PriceSection";
import CounterSection from "./CounterSection";
import TitleProduct from "./TitleProduct";

function handleShare(event) {
  event.preventDefault();
  navigator.share({ url: location.href });
}

function InformationSection({ product, userId }) {
  const {
    discount,
    id,
    price,
    title,
    description,
    chooseFields,
    isAvailable,
    view,
  } = product;

  const { addToCart, isPending: isAddingToCart } = useAddItemToCart();

  const { cartProducts, isLoading } = useGetUserCartItems();

  const { productViewUpdater } = useUpdateProductView();

  useEffect(
    function () {
      productViewUpdater({ view: view + 1 });
    },
    [productViewUpdater, view],
  );

  const [isSelected, setIsSelected] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function addToCartFn(values) {
    if (!isAvailable) return;
    addToCart(
      {
        product: {
          ...product,
          description: null,
          otherImages: null,
          chooseFields: null,
          created_at: null,
          colors: null,
          ...values,
        },
      },
      {
        onSuccess: () => {
          setIsSelected(true);
        },
      },
    );
    reset();
  }

  const isInCartItem = cartProducts?.cart_items.some(
    (product) => product.id === id,
  );

  return (
    <form
      onSubmit={handleSubmit(addToCartFn)}
      className="flex h-full w-full flex-col gap-5 md:flex-grow md:justify-between md:gap-6"
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <TitleProduct>{title}</TitleProduct>

          <PriceSection discount={discount} price={price} />

          <div className="flex flex-col gap-3">
            <h4 className="font-bold">Choosing</h4>

            <div className="grid w-full grid-cols-1 gap-5 450:grid-cols-2 md:grid-cols-1 md:gap-6 lg:grid-cols-2">
              {chooseFields?.length > 0 &&
                chooseFields.map((field) => {
                  return (
                    <FormControl
                      key={field.title}
                      className="!font-montserrat focus:!outline-violet-500"
                      color="secondary"
                      size="small"
                    >
                      <InputLabel
                        id="demo-select-small-label"
                        className="!font-montserrat"
                      >
                        {field.title}
                      </InputLabel>
                      <Select
                        {...register(field.title, { required: true })}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label={field.title}
                        disabled={!isAvailable}
                        className={`!font-montserrat ${!isAvailable && "bg-gray-100"}`}
                      >
                        {field[field.title].map((item) => (
                          <MenuItem
                            key={item}
                            className="!font-montserrat"
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[field.title] && (
                        <span className="p-2 text-xs font-semibold text-red-500">
                          this field is required!
                        </span>
                      )}
                    </FormControl>
                  );
                })}
            </div>
          </div>
        </div>

        <DescriptionSection>{description}</DescriptionSection>
      </div>

      <div className="grid grid-cols-1 gap-3 vxs:grid-cols-2 md:grid-cols-1 850:grid-cols-2">
        <div className="flex justify-center gap-3">
          <Button
            type="button"
            variant="contained"
            className="w-full !bg-violet-500 !font-montserrat"
            startIcon={<Share />}
            onClick={handleShare}
          >
            share
          </Button>
        </div>
        {userId && !isInCartItem && !isLoading && (
          <Button
            type="submit"
            variant="contained"
            className={`${isAvailable ? "!bg-green-400" : "!bg-gray-400 !text-white"} !font-montserrat`}
            disabled={isAddingToCart || isSelected || !isAvailable}
            startIcon={isAvailable ? <AddShoppingCart /> : ""}
          >
            {isAvailable ? "Add to card" : "out of stock"}
          </Button>
        )}
        {isLoading && <ItemLoader />}

        {userId && isInCartItem && !isLoading && (
          <CounterSection
            cartProducts={cartProducts}
            userId={userId}
            productId={id}
            setIsSelected={setIsSelected}
          />
        )}

        {!userId && (
          <Link
            to={"/login"}
            className="flex h-[36.5px] w-full items-center justify-center gap-2 rounded !bg-green-400 p-3 font-medium text-white"
          >
            <Login size={20} />
            First log in
          </Link>
        )}
      </div>
    </form>
  );
}

export default InformationSection;
