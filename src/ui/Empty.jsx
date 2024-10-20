function Empty({ title, description }) {
  return (
    <div
      className={`col-span-3 flex w-full flex-col items-center justify-center gap-3 rounded-lg border bg-gray-50 p-5 text-center capitalize`}
    >
      <img src="/empty.png" alt="empty" className="w-[400px] px-1" />
      <h4 className="text-xl font-bold text-[#7957F7] vxs:text-2xl">{title}</h4>
      <p className="text-pretty text-sm font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default Empty;
