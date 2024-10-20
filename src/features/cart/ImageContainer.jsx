function ImageContainer({ children }) {
  return (
    <div className="flex h-full max-w-32 flex-col gap-3 px-3 xxs:max-w-36 xs:max-w-52 md:max-w-56">
      {children}
    </div>
  );
}

export default ImageContainer;
