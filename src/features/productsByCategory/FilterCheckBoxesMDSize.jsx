import CheckBoxFilter from "./CheckBoxFilter";

function FilterCheckBoxesMDSize() {
  return (
    <div className="hidden md:flex md:flex-col md:gap-5">
      <CheckBoxFilter
        title={"Pre-sale products"}
        className="border text-xl shadow shadow-gray-300 lg:hidden"
        filterParam="presale"
      />
      <CheckBoxFilter
        title={"Available products"}
        className="border text-xl shadow shadow-gray-300 lg:hidden"
        filterParam="available-products"
      />
      <CheckBoxFilter
        title={"Discount products"}
        className="border text-xl shadow shadow-gray-300 lg:hidden"
        filterParam="discount-products"
      />
    </div>
  );
}

export default FilterCheckBoxesMDSize;
