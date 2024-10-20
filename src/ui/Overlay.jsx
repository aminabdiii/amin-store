function Overlay({ className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-10 h-dvh bg-black/40 transition-all duration-200 md:hidden ${className}`}
    ></div>
  );
}

export default Overlay;
