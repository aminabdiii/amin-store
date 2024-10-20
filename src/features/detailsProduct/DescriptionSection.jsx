function DescriptionSection({ children }) {
  return (
    <div className="border-y">
      <p className="scrollbar max-h-44 overflow-y-auto text-pretty break-words px-3 text-sm leading-loose text-[#374151] shadow md:min-h-48 md:text-sm md:leading-8 850:text-base 850:leading-8">
        {children}
      </p>
    </div>
  );
}

export default DescriptionSection;
