function PageTitle({ category, length, categoryType = "product" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 capitalize tracking-wide xs:flex-row xs:justify-between">
      <h1 className="pb-3 text-center text-xl font-bold leading-8 text-gray-950">
        {category} {categoryType === "article" ? "articles" : "products"}
      </h1>
      <p className="font-medium text-gray-600">
        {length > 0 ? `${length} ${categoryType}s` : `no ${categoryType} found`}
      </p>
    </div>
  );
}

export default PageTitle;
