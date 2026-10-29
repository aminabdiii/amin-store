import { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { AddShoppingCart, Login, Share } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useUpdateProductView } from "./useUpdateProductView";
import { useAddItemToCart } from "../cart/useAddItemToCart";
import { useGetUserCartItems } from "../cart/useGetUserCartItems";
import { selectVariant } from "../../utils/variants";
import DescriptionSection from "./DescriptionSection";
import PriceSection from "./PriceSection";
import CounterSection from "./CounterSection";
import TitleProduct from "./TitleProduct";
function InformationSection({ product, userId }) {
  const {
    discount,
    price,
    title,
    description,
    options = [],
    variants = [],
    isAvailable,
  } = product;
  const { addToCart, isPending } = useAddItemToCart();
  const { cartProducts, isLoading } = useGetUserCartItems();
  const { productViewUpdater } = useUpdateProductView();
  const viewedId = useRef();
  useEffect(() => {
    if (viewedId.current !== product.id) {
      viewedId.current = product.id;
      productViewUpdater();
    }
  }, [product.id, productViewUpdater]);
  const [selection, setSelection] = useState({});
  useEffect(() => {
    setSelection({});
  }, [product.id]);
  const variant = selectVariant(variants, selection);
  const inCart =
    variant &&
    cartProducts?.cartItems.some((item) => item.variantId === variant.id);
  const canAdd = isAvailable && variant?.stock > 0;
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (canAdd) addToCart({ variantId: variant.id, quantity: 1 });
      }}
      className="flex h-full w-full flex-col gap-5 md:flex-grow md:justify-between md:gap-6"
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <TitleProduct>{title}</TitleProduct>
          <PriceSection discount={discount} price={price} />
          <div className="flex flex-col gap-3">
            <h4 className="font-bold">Choosing</h4>
            <div className="grid w-full grid-cols-1 gap-5 450:grid-cols-2 md:grid-cols-1 md:gap-6 lg:grid-cols-2">
              {options.map((option) => (
                <FormControl key={option.name} size="small" color="secondary">
                  <InputLabel id={`option-${option.name}`}>
                    {option.name}
                  </InputLabel>
                  <Select
                    labelId={`option-${option.name}`}
                    label={option.name}
                    value={selection[option.name] || ""}
                    disabled={!isAvailable}
                    onChange={(event) =>
                      setSelection((previous) => ({
                        ...previous,
                        [option.name]: event.target.value,
                      }))
                    }
                  >
                    {option.values.map((value) => (
                      <MenuItem key={value.id} value={value.value}>
                        {value.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
            </div>
            {!variant && options.length > 0 && (
              <p className="text-sm text-neutral-500">
                Choose an option for each field.
              </p>
            )}
            {variant?.stock === 0 && (
              <p role="status">This option is out of stock.</p>
            )}
          </div>
        </div>
        <DescriptionSection>{description}</DescriptionSection>
      </div>
      <div className="grid grid-cols-1 gap-3 vxs:grid-cols-2 md:grid-cols-1 850:grid-cols-2">
        <Button
          type="button"
          variant="contained"
          className="!bg-violet-500 !font-montserrat"
          startIcon={<Share />}
          onClick={() => navigator.share?.({ url: location.href })}
        >
          share
        </Button>
        {userId ? (
          inCart ? (
            <CounterSection
              cartProducts={cartProducts}
              variantId={variant.id}
            />
          ) : (
            <Button
              type="submit"
              variant="contained"
              className="!bg-green-400 !font-montserrat"
              disabled={isPending || isLoading || !canAdd}
              startIcon={<AddShoppingCart />}
            >
              {isAvailable ? "Add to cart" : "Out of stock"}
            </Button>
          )
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded bg-green-400 p-3 font-medium text-white"
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
