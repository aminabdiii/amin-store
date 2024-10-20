function ProductContainer({ children }) {
  return (
    <div className="relative flex items-center justify-between gap-3 py-5">
      {children}
    </div>
  );
}

export default ProductContainer;
