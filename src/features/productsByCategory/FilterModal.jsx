import { HiOutlineXCircle } from "react-icons/hi2";
import CheckBoxFilter from "./CheckBoxFilter";
import { HiX } from "react-icons/hi";

function FilterModal({ isOpenFilterModal, setIsOpenFilterModal }) {
  return (
    <div
      className={`fixed inset-0 z-[999] bg-white font-medium transition-all md:hidden ${isOpenFilterModal ? "visible opacity-100" : "invisible opacity-0"} `}
    >
      <div className="flex items-center justify-between bg-gray-100 p-3">
        <div className="flex items-center gap-4">
          <button
            className="rounded-full bg-violet-500 p-1 text-white"
            onClick={() => setIsOpenFilterModal(false)}
          >
            <HiX size={30} color="" />
          </button>
          <span className="text-lg font-semibold capitalize">filters</span>
        </div>
      </div>

      <div className="divide-y">
        <CheckBoxFilter filterParam="presale" title={"Pre-sale products"} />
        <CheckBoxFilter
          filterParam="available-products"
          title={"Available products"}
        />
        <CheckBoxFilter
          filterParam="discount-products"
          title={"Discount products"}
        />
      </div>
    </div>
  );
}

export default FilterModal;
