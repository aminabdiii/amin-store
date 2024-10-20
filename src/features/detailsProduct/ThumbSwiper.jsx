import { useState } from "react";
import { FreeMode, Keyboard, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Offer from "../../ui/Offer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function ThumbSwiper({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { discount, image, title, otherImages, isAvailable } = product;

  return (
    <div
      className={`relative flex w-full max-w-md flex-grow flex-col gap-y-3 rounded-sm p-3 shadow md:max-w-sm 850:max-w-md`}
    >
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs, Keyboard]}
        keyboard={true}
        className="mySwiper2 w-full cursor-grab active:cursor-grabbing"
      >
        <SwiperSlide className="main-swiper !flex !justify-center">
          <img src={image} alt={`${title}-1`} />
        </SwiperSlide>
        {otherImages?.length > 0 &&
          otherImages?.map((image) => (
            <SwiperSlide
              key={image}
              className="main-swiper !flex !justify-center"
            >
              <img src={image} />
            </SwiperSlide>
          ))}
      </Swiper>
      {otherImages?.length > 0 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-full"
        >
          <SwiperSlide className="!flex cursor-pointer !justify-center">
            <img src={image} alt={`${title}-1`} />
          </SwiperSlide>

          {otherImages?.map((image) => (
            <SwiperSlide
              className="!flex cursor-pointer !justify-center"
              key={image}
            >
              <img src={image} alt={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {discount > 0 && isAvailable && <Offer discount={discount} />}
      {!isAvailable && (
        <span className="absolute left-2 top-2 z-20 rounded-xl bg-gray-600 px-2 py-0.5 text-white">
          Out of stock
        </span>
      )}
    </div>
  );
}

export default ThumbSwiper;
