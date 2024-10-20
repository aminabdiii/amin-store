import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function SorterForMDSize() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");

  function sortHandler(sortValue) {
    searchParams.set("sort", sortValue);
    setSearchParams(searchParams);
  }

  return (
    <div className="col-span-3 hidden h-16 rounded-md border bg-white pl-3 pr-2 text-sm shadow shadow-gray-300 md:flex md:items-center md:gap-5">
      <div className="flex items-center gap-1 font-medium">
        <HiOutlineArrowsUpDown size={23} /> :
      </div>
      <div className="flex items-center gap-5">
        <button onClick={() => sortHandler("rate")}>
          <span
            className={`flex h-16 items-center px-1 font-semibold ${sort === "rate" || !sort ? "border-y-[3px] border-violet-500" : ""}`}
          >
            most rate
          </span>
        </button>
        <button onClick={() => sortHandler("most-view")}>
          <span
            className={`flex h-16 items-center px-1 font-semibold ${sort === "most-view" && "border-y-[3px] border-violet-500"}`}
          >
            most view
          </span>
        </button>
        <button onClick={() => sortHandler("cheapest")}>
          <span
            className={`flex h-16 items-center px-1 font-semibold ${sort === "cheapest" && "border-y-[3px] border-violet-500"}`}
          >
            cheapest
          </span>
        </button>
        <button onClick={() => sortHandler("most-expensive")}>
          <span
            className={`flex h-16 items-center px-1 font-semibold ${sort === "most-expensive" && "border-y-[3px] border-violet-500"}`}
          >
            most expensive
          </span>
        </button>
        <button onClick={() => sortHandler("fastest-shipping")}>
          <span
            className={`flex h-16 items-center px-1 font-semibold ${sort === "fastest-shipping" && "border-y-[3px] border-violet-500"}`}
          >
            Fastest shipping
          </span>
        </button>
        <button onClick={() => sortHandler("newest")}>
          <span
            className={`flex h-16 items-center px-1 font-semibold ${sort === "newest" && "border-y-[3px] border-violet-500"}`}
          >
            newest
          </span>
        </button>
      </div>
    </div>
  );
}

export default SorterForMDSize;
