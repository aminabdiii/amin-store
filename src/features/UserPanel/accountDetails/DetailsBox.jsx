function DetailsBox({ icon, title, value, backgroundColor }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl p-2 text-white`}
      style={{
        backgroundColor,
      }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
        {icon}
      </div>
      <div className="flex basis-3/4 flex-col gap-y-1">
        <span className="text-[13px] font-medium">{title}</span>
        <span className="text-[16px] font-semibold">{value}</span>
      </div>
    </div>
  );
}

export default DetailsBox;
