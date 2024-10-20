function Offer({ discount }) {
  return (
    <div
      className={`absolute left-2 top-2 z-10 flex h-7 w-14 items-center justify-center rounded-xl bg-red-500`}
    >
      <span className="block pb-0.5 text-center font-sans font-bold uppercase text-red-50">
        {discount}%
      </span>
    </div>
  );
}

export default Offer;
