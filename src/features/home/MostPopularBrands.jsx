import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { usePopularBrands } from "./usePopularBrands";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import HeadingSection from "./HeadingSection";
import { Skeleton } from "@mui/material";

function MostPopularBrands() {
  const { brands, isLoading } = usePopularBrands();

  return (
    <div>
      <HeadingSection title="Most Popular Brands" />

      {isLoading && (
        <div className="my-5 w-full">
          <Skeleton variant="rounded" animation="wave" className="!h-[150px]" />
        </div>
      )}

      {!isLoading && (
        <Swiper
          spaceBetween={24}
          modules={[Autoplay, FreeMode]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="my-5 cursor-grab rounded-md border border-slate-400/25 bg-white !px-6 !py-4 !shadow transition-all duration-300 active:cursor-grabbing active:ring-2 active:ring-violet-500"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            360: {
              slidesPerView: 2,
            },
            500: {
              slidesPerView: 3,
            },
            700: {
              slidesPerView: 4,
            },
            950: {
              slidesPerView: 5,
            },
            1050: {
              slidesPerView: 6,
            },
            1150: {
              slidesPerView: 7,
            },
          }}
        >
          {brands.length > 0 &&
            brands.map((brand) => {
              return (
                <SwiperSlide
                  className="main-swiper !flex w-full items-center justify-center border-x"
                  key={brand.id}
                >
                  <div className="flex h-[120px] w-[120px] items-center justify-center">
                    <img
                      src={brand.image}
                      alt={`brand-${brand.id}`}
                      className="w-full"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </div>
  );
}

export default MostPopularBrands;
