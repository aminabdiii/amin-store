function FeatureItem({ feature }) {
  const { title, description, shadowColor, image } = feature;

  return (
    <div
      className={`flex min-h-[114px] w-full items-center gap-x-6 rounded-md bg-white p-3 sm:flex-col sm:gap-4 sm:px-4 sm:py-6 md:gap-6`}
      style={{
        boxShadow: `0 2px 6px -1.2px ${shadowColor}`,
      }}
    >
      <div className="w-[70px] sm:w-[118px]">
        <img src={image} className="w-full" alt="FAST SHIPPING" />
      </div>
      <div className="flex w-3/4 flex-col gap-4 sm:w-full">
        <h3 className="text-start text-sm font-bold sm:text-center sm:text-lg md:text-xl">
          {title}
        </h3>
        <p className="line-clamp-3 text-[11px] !leading-relaxed text-neutral-600 sm:line-clamp-none sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureItem;
