function ProductsInputBox({ title, type, register, defaultValue }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-gray-900" htmlFor={title}>
        {title}
      </label>
      <input
        className="w-full rounded border p-2.5 text-sm font-medium text-neutral-500 outline-none"
        id={title}
        name={title}
        type={type}
        defaultValue={defaultValue}
        placeholder={`Enter product ${title}`}
        onWheel={(event) => event.preventDefault()}
        {...register}
      />
    </div>
  );
}

export default ProductsInputBox;
