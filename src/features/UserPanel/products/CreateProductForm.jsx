import { useForm } from "react-hook-form";
import ProductsInputBox from "./ProductsInputBox";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { toast } from "react-toastify";
import { useUploadProductImages } from "./useUploadProductImages";
import { useInsertProduct } from "./useInertProduct";

function CreateProductForm({ categories }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const { uploadProductImage } = useUploadProductImages();
  const { insetNewProduct, isPending } = useInsertProduct();
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }

  function createProductHandler(values) {
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

    const otherImageLinks = [...values.otherImages].map(
      (file) =>
        `https://ddjggonagtvxnthvjxtr.supabase.co/storage/v1/object/public/products/otherImages/${values.title}/${file.name}`,
    );

    const generalImageLink = `https://ddjggonagtvxnthvjxtr.supabase.co/storage/v1/object/public/products/${values.image[0].name}`;

    const colors = values?.colors?.split(",").map((item) => item.trim());

    const guarantees = values?.guarantees
      ?.split(",")
      .map((item) => item.trim());

    const sizes = values?.sizes?.split(",").map((item) => item.trim());

    if (colors?.length && values.isDiffrentColors) {
      optionalValues.colors = colors;
    }
    if (guarantees?.length && values.isDiffrentWarranty) {
      optionalValues.warranty = guarantees;
    }
    if (sizes?.length && values.isDiffrentSizes) {
      optionalValues.sizes = sizes;
    }

    [...values.otherImages].map((file) => {
      uploadProductImage({
        path: `products/otherImages/${values.title}`,
        fileName: file.name,
        fileBody: file,
      });
    });
    uploadProductImage({
      path: "products",
      fileName: values.image[0].name,
      fileBody: values.image[0],
    });

    for (let key in optionalValues) {
      console.log(optionalValues);
      chooseFields.push({
        title: key,
        [key]: optionalValues[key],
      });
    }

    insetNewProduct(
      {
        title,
        postType: isPreSale ? 3 : postType,
        price,
        discount: discount ? discount : 0,
        image: generalImageLink,
        otherImages: otherImageLinks,
        category,
        description,
        isPreSale,
        isAvailable,
        chooseFields,
      },
      {
        onSuccess() {
          reset();
          toast.success("success uploading");
        },
      },
    );
  }

  function createProductErrorHandler(errors) {
    for (let error in errors) {
      toast.error(errors[error].message);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center md:justify-start">
        <button
          className="flex items-center gap-1 rounded-[27px] border-2 bg-violet-500 p-3 font-semibold capitalize text-white"
          onClick={handleOpen}
        >
          <span>
            <HiPlus size={20} />
          </span>
          <span>add new products</span>
        </button>
      </div>
      {open && (
        <form
          onSubmit={handleSubmit(
            createProductHandler,
            createProductErrorHandler,
          )}
          className="grid grid-cols-1 gap-5 rounded-lg bg-white p-3 capitalize will-change-contents xs:grid-cols-2"
        >
          <>
            {/* inputs */}
            <ProductsInputBox
              register={register("title", {
                required: "title field is required",
              })}
              title="title"
              type="text"
            />
            <ProductsInputBox
              register={register("price", {
                required: "price field is required",
              })}
              title="price"
              type="number"
            />
            <ProductsInputBox
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
                    value={category.title}
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
                  {...register("image", {
                    required: "generalImage field is required",
                  })}
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
                    required: "otherImages field is required",
                    validate: (files) =>
                      files.length >= 4 || "You must select at least 4 images",
                  })}
                />
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
                  className="scale-125 cursor-pointer accent-violet-500"
                  {...register("isPreSale")}
                  id="isPreSale"
                />
              </div>
            </div>

            {watch("isDiffrentColors") && (
              <ProductsInputBox
                title={"color"}
                type="text"
                register={register("colors", {
                  required: "color field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9, ]*$/,
                    message:
                      "The input can only contain letters, commas, spaces and numbers",
                  },
                })}
              />
            )}
            {watch("isDiffrentWarranty") && (
              <ProductsInputBox
                title={"warranty"}
                type="text"
                register={register("guarantees", {
                  required: "warranty field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9, ]*$/,
                    message:
                      "The input can only contain letters, commas, spaces and numbers",
                  },
                })}
              />
            )}
            {watch("isDiffrentSizes") && (
              <ProductsInputBox
                title={"size"}
                type="text"
                register={register("sizes", {
                  required: "size field is equired",
                  pattern: {
                    value: /^[a-zA-Z0-9, ]*$/,
                    message:
                      "The input can only contain letters, commas, spaces and numbers",
                  },
                })}
              />
            )}
          </>
          <>
            {/* buttons */}
            <div className="flex justify-center gap-5 font-semibold xs:col-span-2">
              <button
                disabled={isPending}
                className="basis-1/2 rounded-lg bg-violet-500 py-2 uppercase text-white xs:basis-1/4"
                type="submit"
              >
                submit
              </button>
              <button
                className="basis-1/2 rounded-lg bg-gray-300 py-2 uppercase xs:basis-1/4"
                onClick={handleClose}
                type="button"
              >
                close
              </button>
            </div>
          </>
        </form>
      )}
    </div>
  );
}

export default CreateProductForm;
