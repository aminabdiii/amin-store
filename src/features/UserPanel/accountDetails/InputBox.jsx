function InputBox({
  title,
  defaultValue,
  isDisabled = false,
  id,
  className,
  register,
}) {
  return (
    <div className={`w-full space-y-3 ${className}`}>
      <label htmlFor={id} className="text-base font-medium">
        {title}
      </label>
      <input
        type="text"
        id={id}
        defaultValue={defaultValue}
        className={`h-12 w-full rounded-xl px-3 text-sm outline-none ring-gray-300 focus:ring-1 sm:h-14 sm:text-base ${isDisabled ? "cursor-not-allowed bg-gray-200" : "bg-gray-100"}`}
        disabled={isDisabled}
        placeholder={`enter your ${title}`}
        {...register}
      />
    </div>
  );
}

export default InputBox;
