import { CircularProgress } from "@mui/material";
import { HiChevronDown } from "react-icons/hi2";

function LoadMoreButton({ fetchNextPage, isFetchingNextPage }) {
  return (
    <button
      onClick={() => fetchNextPage()}
      className="flex items-center gap-1 rounded-full bg-violet-500 px-3 py-1 text-lg font-semibold capitalize text-white transition-all hover:opacity-90"
    >
      <span>load more</span>
      {isFetchingNextPage ? (
        <CircularProgress size={18} color="inherit" />
      ) : (
        <HiChevronDown />
      )}
    </button>
  );
}

export default LoadMoreButton;
