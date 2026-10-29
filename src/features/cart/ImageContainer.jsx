function ImageContainer({ children }) {
  return (
    <div className="flex h-full w-1/3 max-w-32 shrink-0 flex-col gap-3 px-3 xxs:max-w-36 xs:max-w-52 md:max-w-56">
      {children}
    </div>
  );
}

export default ImageContainer;
