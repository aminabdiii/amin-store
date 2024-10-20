import { CircularProgress, Modal } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
import { HiUpload } from "react-icons/hi";
import { useProductInformation } from "./useProductInformation";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useUploadProductImages } from "./useUploadProductImages";
import { useUpdateProduct } from "./useUpdateProduct";

import ProductsInputBox from "./ProductsInputBox";

function EditProductModal({ onClose, isOpenEditModal }) {
  const [deletedImageList, setDeletedImageList] = useState([]);

  const { handleSubmit, register, watch } = useForm();

  const { product, isLoading: gettingProductInformation } =
    useProductInformation({ id: isOpenEditModal });
  const { categories, isLoading: gettingCategories } = useCategories();
  const { uploadProductImage } = useUploadProductImages();
  const { updateProduct } = useUpdateProduct();

  const isLoading = gettingProductInformation || gettingCategories;

  if (isLoading) {
    return (
      <Modal open={isOpenEditModal} onClose={onClose}>
        <div className="absolute left-1/2 top-1/2 h-[80dvh] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-[27px] bg-white">
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress />
          </div>
        </div>
      </Modal>
    );
  }

  const {
    id,
    title,
    price,
    discount,
    category,
    postType,
    image,
    otherImages,
    description,
    isAvailable,
    isPreSale,
    chooseFields,
  } = product;

  function getChooseValues(checkValue) {
    return chooseFields.find((field) => field.title.includes(checkValue))?.[
      checkValue
    ];
  }

  function editProductHandler(values) {
    let chooseFields = [];
    const {
      title,
      postType,
      price,
      discount,
      category,
      description,
      isAvailable,
      isPreSale,
    } = values;

    const optionalValues = {};

    const otherImageLinks = [...values.otherImages]?.map(
      (file) =>
        `https://ddjggonagtvxnthvjxtr.supabase.co/storage/v1/object/public/products/otherImages/${values.title}/${file.name}`,
    );

    const generalImageLink = `https://ddjggonagtvxnthvjxtr.supabase.co/storage/v1/object/public/products/${values.image[0]?.name}`;

    // split chooseFields inputs
    const colors = values.colors?.split(",").map((item) => item.trim());
    const guarantees = values.guarantees?.split(",").map((item) => item.trim());
    const sizes = values?.sizes?.split(",").map((item) => item.trim());

    // add to optionalValues object
    if (colors?.length && watch("isDiffrentColors")) {
      optionalValues.colors = colors;
    }
    if (guarantees?.length && watch("isDiffrentWarranty")) {
      optionalValues.warranty = guarantees;
    }
    if (sizes?.length && watch("isDiffrentSizes")) {
      optionalValues.sizes = sizes;
    }

    // upload image
    [...values.otherImages]?.map((file) => {
      uploadProductImage({
        path: `products/otherImages/${values.title}`,
        fileName: file.name,
        fileBody: file,
      });
    });
    if (values.image.length) {
      uploadProductImage({
        path: "products",
        fileName: values.image[0].name,
        fileBody: values.image[0],
      });
    }

    // push optionalValues to chooseFields Array
    for (let key in optionalValues) {
      chooseFields.push({
        title: key,
        [key]: optionalValues[key],
      });
    }

    // otherImages - deletedImageList = finalyOtherImages
    const finalyOtherImages =
      otherImages?.filter((image) => !deletedImageList.includes(image)) || [];

    updateProduct({
      id,
      title,
      postType: isPreSale ? 3 : postType,
      price,
      discount: discount ? discount : 0,
      image: values.image.length ? generalImageLink : image,
      otherImages: [...finalyOtherImages, ...otherImageLinks],
      category,
      description,
      isPreSale,
      isAvailable,
      chooseFields,
    });
  }

  // error handler
  function editProductErrorHandler(errors) {
    for (let key in errors) {
      toast.error(errors[key].message);
    }
  }

  return (
    <Modal open={isOpenEditModal} onClose={onClose}>
      <div className="absolute left-1/2 top-1/2 h-[81dvh] w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-scroll bg-white p-3">
        <form
          onSubmit={handleSubmit(editProductHandler, editProductErrorHandler)}
          className="grid grid-cols-1 gap-5 rounded-lg bg-white p-3 capitalize will-change-contents xs:grid-cols-2"
        >
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
                defaultValue={category}
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
                    value={category.path.toLowerCase().split("-").join(" ")}
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
                defaultValue={postType}
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
                  {...register("otherImages", {
                    validate: (files) => {
                      if (
                        files.length +
                          (otherImages?.length || 0) -
                          deletedImageList.length <
                        4
                      )
                        return "You must select at least 4 images";
                    },
                  })}
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
                    key={image}
                    className={`relative h-14 w-14 ${deletedImageList.some((img) => img === image) ? "hidden" : "block"}`}
                  >
                    <img
                      src={image}
                      className="h-full w-full"
                      alt={`photo-${index}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setDeletedImageList((list) => [...list, image])
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
                  is Available
                </label>
                <input
                  defaultChecked={isAvailable}
                  type="checkbox"
                  className="scale-125 cursor-pointer accent-violet-500"
                  {...register("isAvailable")}
                  id="isAvailable"
                />
              </div>
              <div className="flex min-h-8 w-full basis-auto select-none items-center gap-2 rounded-md bg-gray-100 p-1">
                <label
                  className="cursor-pointer font-semibold text-gray-900"
                  htmlFor="isDiffrentColors"
                >
                  Does it come in different colors?
                </label>
                <input
                  type="checkbox"
                  defaultChecked={getChooseValues("colors")}
                  className="scale-125 cursor-pointer accent-violet-500"
                  {...register("isDiffrentColors")}
                  id="isDiffrentColors"
                />
              </div>
              <div className="flex min-h-8 w-full basis-auto select-none items-center gap-2 rounded-md bg-gray-100 p-1">
                <label
                  className="cursor-pointer font-semibold text-gray-900"
                  htmlFor="isDiffrentWarranty"
                >
                  Does your product come with a warranty?
                </label>
                <input
                  type="checkbox"
                  defaultChecked={getChooseValues("warranty")}
                  className="scale-125 cursor-pointer accent-violet-500"
                  {...register("isDiffrentWarranty")}
                  id="isDiffrentWarranty"
                />
              </div>
              <div className="flex min-h-8 w-full basis-auto select-none items-center gap-2 rounded-md bg-gray-100 p-1">
                <label
                  className="cursor-pointer font-semibold text-gray-900"
                  htmlFor="isDiffrentSizes"
                >
                  Does your product come in different sizes?
                </label>
                <input
                  type="checkbox"
                  defaultChecked={getChooseValues("size")}
                  className="scale-125 cursor-pointer accent-violet-500"
                  {...register("isDiffrentSizes")}
                  id="isDiffrentSizes"
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

            {watch("isDiffrentColors") || getChooseValues("colors") ? (
              <ProductsInputBox
                title={"color"}
                type="text"
                defaultValue={getChooseValues("colors")}
                register={register("colors", {
                  required: "color field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9, ]*$/,
                    message:
                      "The input can only contain letters, commas, spaces and numbers",
                  },
                })}
              />
            ) : (
              ""
            )}
            {watch("isDiffrentWarranty") || getChooseValues("warranty") ? (
              <ProductsInputBox
                title={"warranty"}
                type="text"
                defaultValue={getChooseValues("warranty")}
                register={register("guarantees", {
                  required: "warranty field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9, ]*$/,
                    message:
                      "The input can only contain letters, commas, spaces and numbers",
                  },
                })}
              />
            ) : (
              ""
            )}
            {watch("isDiffrentSizes") || getChooseValues("size") ? (
              <ProductsInputBox
                title={"size"}
                type="text"
                defaultValue={getChooseValues("size")}
                register={register("sizes", {
                  required: "size field is equired",
                  pattern: {
                    value: /^[a-zA-Z0-9, ]*$/,
                    message:
                      "The input can only contain letters, commas, spaces and numbers",
                  },
                })}
              />
            ) : (
              ""
            )}
          </>
          <>
            {/* buttons */}
            <div className="flex justify-center gap-5 font-semibold xs:col-span-2">
              <button
                className="basis-1/2 rounded-lg bg-violet-500 py-2 uppercase text-white xs:basis-1/4"
                type="submit"
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
