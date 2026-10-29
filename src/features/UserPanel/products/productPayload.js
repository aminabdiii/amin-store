export function buildProductUpdatePayload({
  product,
  values,
  uploadedImages = [],
  deletedImageUrls = [],
}) {
  const images = product.images ?? [];
  const options = (product.options ?? []).map((option) => ({
    name: option.name,
    values: option.values.map((value) =>
      typeof value === "string" ? value : value.value,
    ),
  }));
  const nextOptions = values.optionGroups
    ? values.optionGroups.map((option) => ({
        name: option.name.trim(),
        values: [
          ...new Set(
            option.values
              .split(",")
              .map((value) => value.trim())
              .filter(Boolean),
          ),
        ],
      }))
    : options;
  const imageIds = [
    ...(values.image?.[0] ? [uploadedImages[0]?.id] : [images[0]?.id]),
    ...images
      .slice(1)
      .filter((image) => !deletedImageUrls.includes(image.url))
      .map((image) => image.id),
    ...(values.image?.[0] ? uploadedImages.slice(1) : uploadedImages).map(
      (image) => image.id,
    ),
  ].filter(Boolean);
  return {
    id: product.id,
    title: values.title,
    price: String(values.price),
    discount: values.discount ? Number(values.discount) : 0,
    categoryId: Number(values.category),
    shippingLeadDays: Number(values.postType) || 1,
    description: values.description,
    isPreSale: values.isPreSale,
    saleEnabled: values.isAvailable,
    imageIds,
    ...(JSON.stringify(options) !== JSON.stringify(nextOptions)
      ? { options: nextOptions }
      : {}),
  };
}

export async function submitProductUpdate({
  product,
  values,
  upload,
  save,
  deletedImageUrls = [],
}) {
  const files = [values.image?.[0], ...(values.otherImages ?? [])].filter(
    Boolean,
  );
  const uploadedImages = [];
  for (const file of files) uploadedImages.push(await upload(file));
  return save(
    buildProductUpdatePayload({
      product,
      values,
      uploadedImages,
      deletedImageUrls,
    }),
  );
}
