function Container({ children, className }) {
  return (
    <div
      className={`mx-auto mb-12 mt-8 flex max-w-7xl flex-col gap-5 px-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
