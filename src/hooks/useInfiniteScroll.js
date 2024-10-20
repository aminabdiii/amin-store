import { useEffect } from "react";

function useInfiniteScroll({ fetchNextPage, inView }) {
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);
}

export default useInfiniteScroll;
