function UserPanelContainer({ children }) {
  return (
    <div className="min-h-dvh basis-3/4 space-y-10 self-stretch bg-gray-100 p-6 md:rounded-[27px]">
      {children}
    </div>
  );
}

export default UserPanelContainer;
