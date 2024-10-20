import HeadingSection from "./HeadingSection";
import Product from "../products/Product";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { useLimitProducts } from "../products/useLimitProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Skeleton } from "@mui/material";

function LatestProducts() {
  const { products, isLoading } = useLimitProducts({ limit: 8 });

  return (
    <div id="last-products">
      <HeadingSection
        title="Latest Products"
        buttonTextContent="All Products"
        path="/products"
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

      {products?.length > 0 && !isLoading && (
        <Swiper
          className="mySwiper relative mt-5 !px-1 !pb-7"
          modules={[Autoplay, Pagination]}
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
          {products.length > 0 &&
            products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="main-swiper h-full hover:z-20"
              >
                <Product product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}

export default LatestProducts;
