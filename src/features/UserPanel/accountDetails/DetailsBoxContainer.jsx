function DetailsBoxContainer({ children }) {
  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export default DetailsBoxContainer;
