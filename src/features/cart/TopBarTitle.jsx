function TopBarTitle({ icon, title }) {
  return (
    <h2 className="base-gradient flex items-center gap-2 text-nowrap rounded-t-3xl bg-gradient-to-br px-4 py-3 font-bold capitalize text-white">
      {icon}
      <span>{title}</span>
    </h2>
  );
}

export default TopBarTitle;
