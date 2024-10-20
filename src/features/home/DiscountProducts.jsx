import { Swiper, SwiperSlide } from "swiper/react";
import { useDiscountProducts } from "../products/useDiscountProducts";
import { Autoplay, Grid, Pagination } from "swiper/modules";
import { Skeleton } from "@mui/material";

import HeadingSection from "./HeadingSection";
import Product from "../products/Product";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

function DiscountProducts() {
  const { discountProducts, isLoading } = useDiscountProducts();

  return (
    <div>
      <HeadingSection
        title="Discount Products"
        path="/products?discount-products=true"
        buttonTextContent="discounts"
      />
      {isLoading && (
        <div className="grid grid-cols-1 gap-5 vxs:grid-cols-2 sm:grid-cols-3 850:grid-cols-4">
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-[300px] sm:!h-[320px] 850:!h-[400px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!hidden !h-[300px] vxs:!block sm:!h-[320px] 850:!h-[400px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!hidden !h-[300px] sm:!block sm:!h-[320px] 850:!h-[400px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!hidden !h-[300px] sm:!h-[320px] 850:!block 850:!h-[400px]"
          />
        </div>
      )}
      {!isLoading && (
        <Swiper
          className="mySwiper relative mt-5 !px-1 !pb-7"
          modules={[Autoplay, Pagination, Grid]}
          grid={{ fill: "column", rows: 1 }}
          spaceBetween={20}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            380: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            850: {
              slidesPerView: 4,
            },
          }}
        >
          {discountProducts.length > 0 &&
            discountProducts.map((product) => (
              <SwiperSlide key={product.id} className="main-swiper hover:z-20">
                <Product product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}

export default DiscountProducts;
