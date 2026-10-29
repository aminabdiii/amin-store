import QueryError from "../../../ui/QueryError";
import { CircularProgress, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
import { HiUpload } from "react-icons/hi";
import { useProductInformation } from "./useProductInformation";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useUploadProductImages } from "./useUploadProductImages";
import { useUpdateProduct } from "./useUpdateProduct";
import { updateInventoryApi } from "../../../services/productsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ProductsInputBox from "./ProductsInputBox";
import { submitProductUpdate } from "./productPayload";

function EditProductModal({ onClose, isOpenEditModal }) {
  const [deletedImageList, setDeletedImageList] = useState([]);

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
  } = useForm();
  const {
    fields: optionGroups,
    append,
    remove,
    replace,
  } = useFieldArray({ control, name: "optionGroups" });
  const initialized = useRef();

  const {
    product,
    error: productError,
    refetch: refetchProduct,
    isLoading: gettingProductInformation,
  } = useProductInformation({ id: isOpenEditModal });
  const {
    categories,
    error: categoriesError,
    refetch: refetchCategories,
    isLoading: gettingCategories,
  } = useCategories();
  const { uploadProductImage } = useUploadProductImages();
  const { updateProduct } = useUpdateProduct();
  const queryClient = useQueryClient();
  const {
    mutate: updateInventory,
    isPending: isUpdatingInventory,
    isError: inventoryError,
    isSuccess: inventoryUpdated,
  } = useMutation({
    mutationFn: updateInventoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`product-${isOpenEditModal}`],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).startsWith("product"),
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const [inventoryDrafts, setInventoryDrafts] = useState({});

  useEffect(() => {
    if (product && initialized.current !== product.id) {
      initialized.current = product.id;
      replace(
        (product.options ?? []).map((option) => ({
          name: option.name,
          values: option.values.map((value) => value.value).join(", "),
        })),
      );
    }
  }, [product, replace]);
  const isLoading = gettingProductInformation || gettingCategories;

  if (isLoading) {
    return (
      <Modal open={!!isOpenEditModal} onClose={onClose}>
        <div className="absolute left-1/2 top-1/2 h-[80dvh] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-[27px] bg-white">
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress />
          </div>
        </div>
      </Modal>
    );
  }

  if (productError || categoriesError || !product)
    return (
      <Modal open={!!isOpenEditModal} onClose={onClose}>
        <div className="mx-auto my-20 max-w-xl bg-white p-4">
          <QueryError
            onRetry={() => {
              refetchProduct();
              refetchCategories();
            }}
          />
        </div>
      </Modal>
    );

  const {
    title,
    price,
    discount,
    category,
    shippingLeadDays,
    images = product.images ?? [],
    description,
    saleEnabled,
    isPreSale,
  } = product;
  const image = images[0]?.url;
  const otherImages = images.slice(1);
  async function editProductHandler(values) {
    const save = (payload) => updateProduct(payload);

    try {
      await submitProductUpdate({
        product,
        values,
        upload: (file) => uploadProductImage({ fileBody: file }),
        save,
        deletedImageUrls: deletedImageList,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  // error handler
  function editProductErrorHandler(errors) {
    for (let key in errors) {
      toast.error(errors[key].message);
    }
  }

  function adjustInventory(variantId) {
    const draft = inventoryDrafts[variantId] ?? {};
    const delta = Number(draft.delta);
    if (
      !Number.isInteger(delta) ||
      delta === 0 ||
      draft.reason?.trim().length < 3 ||
      !draft.reason?.trim()
    ) {
      toast.error("Enter an integer stock change and a reason.");
      return;
    }
    updateInventory({ variantId, delta, reason: draft.reason.trim() });
  }

  return (
    <Modal open={!!isOpenEditModal} onClose={onClose}>
      <div className="absolute left-1/2 top-1/2 h-[81dvh] w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-scroll bg-white p-3">
        <form
          onSubmit={handleSubmit(editProductHandler, editProductErrorHandler)}
          className="grid grid-cols-1 gap-5 rounded-lg bg-white p-3 capitalize will-change-contents xs:grid-cols-2"
        >
          <>
            <section className="rounded border p-3 xs:col-span-2">
              <h3 className="mb-2 font-semibold">Inventory</h3>
              <div className="grid gap-2">
                {(product.variants ?? []).map((variant) => (
                  <div
                    key={variant.id}
                    className="flex flex-wrap items-center gap-2 text-sm"
                  >
                    <span className="min-w-24">
                      Variant {variant.id}: {variant.stock}
                    </span>
                    <label
                      htmlFor={`inventory-delta-${variant.id}`}
                      className="sr-only"
                    >
                      Stock change for variant {variant.id}
                    </label>
                    <input
                      id={`inventory-delta-${variant.id}`}
                      className="w-24 rounded border p-1"
                      type="number"
                      step="1"
                      placeholder="± stock"
                      value={inventoryDrafts[variant.id]?.delta ?? ""}
                      onChange={(event) =>
                        setInventoryDrafts((drafts) => ({
                          ...drafts,
                          [variant.id]: {
                            ...drafts[variant.id],
                            delta: event.target.value,
                          },
                        }))
                      }
                    />
                    <label
                      htmlFor={`inventory-reason-${variant.id}`}
                      className="sr-only"
                    >
                      Reason for variant {variant.id}
                    </label>
                    <input
                      id={`inventory-reason-${variant.id}`}
                      className="min-w-40 flex-1 rounded border p-1"
                      placeholder="Reason"
                      value={inventoryDrafts[variant.id]?.reason ?? ""}
                      onChange={(event) =>
                        setInventoryDrafts((drafts) => ({
                          ...drafts,
                          [variant.id]: {
                            ...drafts[variant.id],
                            reason: event.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      type="button"
                      className="rounded bg-slate-700 px-2 py-1 text-white"
                      onClick={() => adjustInventory(variant.id)}
                    >
                      {isUpdatingInventory ? "saving" : "apply"}
                    </button>
                  </div>
                ))}
                {inventoryError && (
                  <p className="text-sm text-red-600">
                    Inventory update failed.
                  </p>
                )}
                {inventoryUpdated && (
                  <p className="text-sm text-green-600">Inventory updated.</p>
                )}
              </div>
            </section>
          </>
          <>
            {/* inputs */}
            <ProductsInputBox
              defaultValue={title}
              register={register("title", {
                required: "title field is required",
              })}
              title="title"
              type="text"
            />
            <ProductsInputBox
              defaultValue={price}
              register={register("price", {
                required: "price field is required",
              })}
              title="price"
              type="number"
            />
            <ProductsInputBox
              defaultValue={discount}
              register={register("discount", {
                required: false,
                max: {
                  value: 99,
                  message: "Discount cannot be more than 99",
                },
                min: {
                  value: 0,
                  message: "Discount cannot be less than 0",
                },
              })}
              title="discount"
              type="number"
            />
          </>
          <>
            {/* selectbox product category */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-900" htmlFor="category">
                category
              </label>
              <select
                defaultValue={category?.id ?? category}
                {...register("category", {
                  required: "category field is required",
                })}
                id="category"
                className="w-full cursor-pointer rounded border p-2.5 text-sm font-medium outline-none"
              >
                <option value="">select category</option>
                {categories.map((category) => (
                  <option
                    className="appearance-none"
                    key={category.id}
                    value={category.id}
                  >
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-900" htmlFor="postType">
                postType
              </label>
              <select
                defaultValue={shippingLeadDays}
                {...register("postType", {
                  required: "postType field is required",
                })}
                id="postType"
                className="w-full cursor-pointer rounded border p-2.5 text-sm font-medium outline-none"
              >
                <option value="">select postType</option>
                <option value={1}>today</option>
                <option value={2}>tomorrow</option>
                <option value={3}>Three days from now</option>
                {shippingLeadDays > 3 && (
                  <option value={shippingLeadDays}>
                    {shippingLeadDays} days
                  </option>
                )}
              </select>
            </div>
          </>

          <>
            {/* upload product images */}
            <div className="flex w-full flex-col justify-between gap-3 xs:col-span-2 xs:flex-row">
              <div className="relative basis-1/2 overflow-hidden rounded border bg-white py-3">
                <div className="flex w-full items-center justify-center gap-1 text-base font-medium">
                  <span>
                    <HiUpload size={20} />
                  </span>
                  <span>upload general image</span>
                </div>
                <input
                  className="absolute inset-0 cursor-default opacity-0"
                  type="file"
                  {...register("image")}
                />
              </div>
              <div className="relative basis-1/2 overflow-hidden rounded border bg-white py-3">
                <div className="flex w-full items-center justify-center gap-1 text-base font-medium">
                  <span>
                    <HiUpload size={20} />
                  </span>
                  <span>upload other images</span>
                </div>
                <input
                  className="absolute inset-0 cursor-default opacity-0"
                  type="file"
                  multiple
                  {...register("otherImages")}
                />
              </div>
            </div>
            <div className="flex w-full flex-col justify-between gap-3 xs:col-span-2 xs:flex-row">
              <div className="basis-1/2">
                <img src={image} className="h-14 w-14" alt={title} />
              </div>
              <div className="flex basis-1/2 flex-wrap gap-2">
                {otherImages?.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative h-14 w-14 ${deletedImageList.includes(image.url) ? "hidden" : "block"}`}
                  >
                    <img
                      src={image.url}
                      className="h-full w-full"
                      alt={`photo-${index}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setDeletedImageList((list) => [...list, image.url])
                      }
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/50 p-0.5"
                    >
                      <Close />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
          <>
            {/* description section */}
            <div className="flex flex-col gap-2 xs:col-span-2">
              <label
                className="font-semibold text-gray-900"
                htmlFor="description"
              >
                description
              </label>
              <textarea
                className="scrollbar w-full rounded border p-2.5 text-sm font-medium leading-8 text-neutral-500 outline-none"
                id="description"
                name="description"
                rows={10}
                defaultValue={description}
                placeholder={`Enter product description`}
                {...register("description", {
                  required: "description field is required",
                  minLength: {
                    value: 40,
                    message:
                      "Please provide a bit more information about your product.",
                  },
                })}
              />
            </div>
          </>
          <>
            {/* checkboxes */}
            <div className="xs grid w-full grid-cols-1 flex-wrap gap-5 text-xs xs:col-span-2 xs:grid-cols-2 xs:text-sm">
              <div className="flex min-h-8 w-full basis-auto select-none items-center gap-2 rounded-md bg-gray-100 p-1">
                <label
                  className="cursor-pointer font-semibold text-gray-900"
                  htmlFor="isAvailable"
                >
                  Sales enabled
                </label>
                <input
                  defaultChecked={saleEnabled}
                  type="checkbox"
                  className="scale-125 cursor-pointer accent-violet-500"
                  {...register("isAvailable")}
                  id="isAvailable"
                />
              </div>
              <div className="flex min-h-8 w-full basis-auto select-none items-center gap-2 rounded-md bg-gray-100 p-1">
                <label
                  className="cursor-pointer font-semibold text-gray-900"
                  htmlFor="isPreSale"
                >
                  is Presale?
                </label>
                <input
                  type="checkbox"
                  defaultChecked={isPreSale}
                  className="scale-125 cursor-pointer accent-violet-500"
                  {...register("isPreSale")}
                  id="isPreSale"
                />
              </div>
            </div>

            <div className="space-y-3 xs:col-span-2">
              <h3 className="font-semibold">Product options</h3>
              <p className="text-sm text-neutral-500">
                Options can only change before inventory or cart/order usage.
                Leave them unchanged for existing variants.
              </p>
              {optionGroups.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-2 xs:grid-cols-2"
                >
                  <ProductsInputBox
                    title={`Option ${index + 1} name`}
                    type="text"
                    register={register(`optionGroups.${index}.name`, {
                      required: "Enter an option name.",
                      pattern: {
                        value: /^[a-z][a-z0-9_]*$/,
                        message:
                          "Use lowercase letters, numbers and underscores.",
                      },
                    })}
                  />
                  <ProductsInputBox
                    title={`Option ${index + 1} values`}
                    type="text"
                    register={register(`optionGroups.${index}.values`, {
                      required: "Enter comma-separated values.",
                    })}
                  />
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() => remove(index)}
                  >
                    Remove option
                  </button>
                </div>
              ))}
              <button
                type="button"
                disabled={optionGroups.length >= 6}
                className="rounded border px-3 py-2"
                onClick={() => append({ name: "", values: "" })}
              >
                Add option
              </button>
            </div>
          </>
          <>
            {/* buttons */}
            <div className="flex justify-center gap-5 font-semibold xs:col-span-2">
              <button
                className="basis-1/2 rounded-lg bg-violet-500 py-2 uppercase text-white xs:basis-1/4"
                type="submit"
                disabled={isSubmitting}
              >
                submit
              </button>
              <button
                className="basis-1/2 rounded-lg bg-gray-300 py-2 uppercase xs:basis-1/4"
                onClick={onClose}
                type="button"
              >
                close
              </button>
            </div>
          </>
        </form>
      </div>
    </Modal>
  );
}

export default EditProductModal;
