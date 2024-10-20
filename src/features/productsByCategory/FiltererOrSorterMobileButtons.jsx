import { HiOutlineArrowsUpDown, HiOutlineFunnel } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function FiltererOrSorterMobileButtons({
  setIsOpenFilterModal,
  setIsOpenSortModal,
}) {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex justify-between gap-5 text-sm md:hidden">
      <button
        onClick={() => setIsOpenSortModal((isOpen) => !isOpen)}
        className="flex h-12 basis-1/2 items-center justify-center gap-2 rounded-md bg-gray-50 font-bold uppercase shadow shadow-gray-400"
      >
        <span>
          <HiOutlineArrowsUpDown size={23} />
        </span>
        <span>{searchParams.get("sort") || "default"}</span>
      </button>
      <button
        onClick={() => setIsOpenFilterModal((isOpen) => !isOpen)}
        className="flex h-12 basis-1/2 items-center justify-center gap-2 rounded-md bg-gray-50 font-bold uppercase shadow shadow-gray-400"
      >
        <span>
          <HiOutlineFunnel size={23} />
        </span>
        <span>filter</span>
      </button>
    </div>
  );
}

export default FiltererOrSorterMobileButtons;
