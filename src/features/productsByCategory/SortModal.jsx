import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

function SortModal({ isOpenSortModal, setIsOpenSortModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "default";
  function sortHandler(value) {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
    setIsOpenSortModal(false);
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 flex flex-col transition-transform md:hidden ${isOpenSortModal ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex items-center justify-between rounded-t-2xl bg-gray-100 p-3">
        <div className="flex items-center">
          <span className="text-xl capitalize">Sort By</span>
        </div>
        <div>
          <button className="p-2" onClick={() => setIsOpenSortModal(false)}>
            <HiOutlineXCircle size={24} />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col divide-y-2 bg-white text-start font-medium">
        <button
          onClick={() => sortHandler("rate")}
          className={`flex items-center justify-between p-5 text-start ${sort === "rate" ? "text-violet-500" : ""}`}
        >
          <span>rate</span>
          {sort === "rate" && (
            <span>
              <HiOutlineCheckCircle size={24} />
            </span>
          )}
        </button>
        <button
          onClick={() => sortHandler("most-view")}
          className={`flex items-center justify-between p-5 text-start ${sort === "most-view" ? "text-violet-500" : ""}`}
        >
          <span>most view</span>
          {sort === "most-view" && (
            <span>
              <HiOutlineCheckCircle size={24} />
            </span>
          )}
        </button>
        <button
          onClick={() => sortHandler("cheapest")}
          className={`flex items-center justify-between p-5 text-start ${sort === "cheapest" ? "text-violet-500" : ""}`}
        >
          <span>cheapest</span>
          {sort === "cheapest" && (
            <span>
              <HiOutlineCheckCircle size={24} />
            </span>
          )}
        </button>
        <button
          onClick={() => sortHandler("most-expensive")}
          className={`flex items-center justify-between p-5 text-start ${sort === "most-expensive" ? "text-violet-500" : ""}`}
        >
          <span>most expensive</span>
          {sort === "most-expensive" && (
            <span>
              <HiOutlineCheckCircle size={24} />
            </span>
          )}
        </button>
        <button
          onClick={() => sortHandler("fastest-shipping")}
          className={`flex items-center justify-between p-5 text-start ${sort === "fastest-shipping" ? "text-violet-500" : ""}`}
        >
          <span>Fastest shipping</span>
          {sort === "fastest-shipping" && (
            <span>
              <HiOutlineCheckCircle size={24} />
            </span>
          )}
        </button>
        <button
          onClick={() => sortHandler("newest")}
          className={`flex items-center justify-between p-5 text-start ${sort === "newest" ? "text-violet-500" : ""}`}
        >
          <span>newest</span>
          {sort === "newest" && (
            <span>
              <HiOutlineCheckCircle size={24} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default SortModal;
