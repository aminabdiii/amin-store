export function selectVariant(variants, selection) {
  return variants.find(
    (variant) =>
      Object.keys(variant.options).length === Object.keys(selection).length &&
      Object.entries(variant.options).every(
        ([name, value]) => selection[name] === value,
      ),
  );
}
