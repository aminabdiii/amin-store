import { CircularProgress, Skeleton } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { HiChevronDown } from "react-icons/hi2";
import { useInView } from "react-intersection-observer";

import Container from "../../ui/Container";
import ProductLoaderSkeletonBox from "../../ui/ProductLoaderSkeletonBox";
import Product from "../products/Product";
import PageTitle from "../../ui/PageTitle";
import SearchBox from "./SearchBox";
import FiltererOrSorterMobileButtons from "./FiltererOrSorterMobileButtons";
import CheckBoxFilter from "./CheckBoxFilter";
import SorterForMDSize from "./SorterForMDSize";
import FilterCheckBoxesMDSize from "./FilterCheckBoxesMDSize";
import FilterModal from "./FilterModal";
import Overlay from "../../ui/Overlay";
import SortModal from "./SortModal";
import Empty from "../../ui/Empty";

import _ from "lodash";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function ProductsBySortAndFiltering({
  pages,
  isLoading,
  fetchNextPage = () => {},
  hasNextPage,
  isFetchingNextPage,
}) {
  const params = useParams();
  const [isOpenSortModal, setIsOpenSortModal] = useState(false);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const { ref, inView } = useInView();

  useInfiniteScroll({ fetchNextPage, inView });

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center gap-2.5 xs:flex-row xs:justify-between">
          <Skeleton width={224} height={44} animation="wave" />
          <Skeleton width={91} height={24} animation="wave" />
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-5 lg:hidden">
            <Skeleton animation="wave" variant="rounded" height={64} />
            <Skeleton animation="wave" variant="rounded" height={64} />
            <Skeleton animation="wave" variant="rounded" height={64} />
            <Skeleton animation="wave" variant="rounded" height={64} />
            <Skeleton animation="wave" variant="rounded" height={64} />
          </div>
          <div className="flex justify-between gap-5 md:hidden">
            <Skeleton
              animation="wave"
              variant="rounded"
              height={48}
              className="basis-1/2"
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={48}
              className="basis-1/2"
            />
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="hidden lg:flex lg:basis-1/4 lg:flex-col lg:gap-5">
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!w-full"
              height={64}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!w-full"
              height={64}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!w-full"
              height={64}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!w-full"
              height={64}
            />
          </div>
          <div className="grid w-full grid-cols-1 gap-5 vxs:grid-cols-2 md:flex-grow md:basis-3/4 md:grid-cols-3">
            <div className="!col-span-3 hidden lg:block">
              <Skeleton animation="wave" variant="rounded" height={64} />
            </div>
            <ProductLoaderSkeletonBox />
            <ProductLoaderSkeletonBox />
            <ProductLoaderSkeletonBox />
            <ProductLoaderSkeletonBox />
            <ProductLoaderSkeletonBox />
            <ProductLoaderSkeletonBox />
          </div>
        </div>
      </Container>
    );
  }

  const calculateProducts = _.reduce(
    pages,
    (acc, page) => acc + page.length,
    0,
  );

  const isHaveProduct = _.reduce(
    pages,
    (acc, pageProducts) => acc + pageProducts.length,
    0,
  );

  return (
    <Container className="relative">
      <PageTitle category={params.category} length={calculateProducts} />

      <div className="mt-5 flex flex-col gap-5">
        <>
          <SearchBox className="h-12 md:h-16 lg:hidden" />
        </>
        <>
          <FiltererOrSorterMobileButtons
            setIsOpenFilterModal={setIsOpenFilterModal}
            setIsOpenSortModal={setIsOpenSortModal}
          />
        </>
        <>
          <FilterCheckBoxesMDSize />
        </>
      </div>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:justify-between">
        <section className={`hidden lg:flex lg:basis-1/4 lg:flex-col lg:gap-5`}>
          <>
            <SearchBox className="h-16" />
          </>
          <>
            <CheckBoxFilter
              className="border text-sm shadow shadow-gray-300"
              filterParam="presale"
              title={"Pre-sale products"}
            />
            <CheckBoxFilter
              className="border text-sm shadow shadow-gray-300"
              filterParam="available-products"
              title={"Available products"}
            />
            <CheckBoxFilter
              className="border text-sm shadow shadow-gray-300"
              filterParam="discount-products"
              title={"Discount products"}
            />
          </>
        </section>
        <>
          <section className="grid w-full grid-cols-1 gap-5 vxs:grid-cols-2 md:flex-grow md:basis-3/4 md:grid-cols-3">
            <>
              <SorterForMDSize />
            </>
            <>
              {pages.map((products) =>
                products.map((product) => (
                  <Product product={product} key={product.id} />
                )),
              )}
              {!isHaveProduct && (
                <Empty
                  title={"Nothing found"}
                  description={`we couldn'nt find what you searched for. try search again`}
                />
              )}
            </>

            {/* load more button */}
            <>
              {hasNextPage && (
                <div
                  className="col-span-1 flex w-full justify-center 450:col-span-2 md:col-span-3"
                  ref={ref}
                >
                  <button
                    onClick={() => fetchNextPage()}
                    className="flex items-center gap-1 rounded-full bg-violet-500 px-4 py-3 text-lg font-semibold capitalize text-white transition-all hover:opacity-90"
                  >
                    <span>load more</span>
                    {isFetchingNextPage ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <HiChevronDown />
                    )}
                  </button>
                </div>
              )}
            </>

            {!hasNextPage && pages[0].length > 0 && (
              <p className="col-span-1 flex w-full justify-center font-medium vxs:col-span-2 md:col-span-3">
                All products were displayed
              </p>
            )}
          </section>
        </>
      </div>

      {createPortal(
        <>
          <FilterModal
            isOpenFilterModal={isOpenFilterModal}
            setIsOpenFilterModal={setIsOpenFilterModal}
          />
          <Overlay
            onClick={() => setIsOpenSortModal(false)}
            className={`${isOpenSortModal ? "visible opacity-100" : "invisible opacity-0"}`}
          />
        </>,
        document.querySelector("#root"),
      )}
      <SortModal
        isOpenSortModal={isOpenSortModal}
        setIsOpenSortModal={setIsOpenSortModal}
      />
    </Container>
  );
}

export default ProductsBySortAndFiltering;
