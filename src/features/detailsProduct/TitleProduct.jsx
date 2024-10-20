function TitleProduct({ children }) {
  return (
    <div>
      <h1 className="text-pretty text-base font-semibold md:text-[17px] md:leading-8 850:text-xl">
        {children}
      </h1>
    </div>
  );
}

export default TitleProduct;
