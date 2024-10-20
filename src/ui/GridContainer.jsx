function GridContainer({ children, className }) {
  return (
    <div
      className={`my-5 grid grid-cols-1 xs:grid-cols-2 ${className} md:grid-cols-3 lg:grid-cols-4`}
    >
      {children}
    </div>
  );
}

export default GridContainer;
