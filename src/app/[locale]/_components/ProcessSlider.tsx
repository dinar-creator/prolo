"use client";

import { Icon } from "@iconify/react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useLocale } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProcessCard } from "./components";
type Props = {
  process: string[];
};

export default function ProcessSlider({ process }: Props) {
  const locale = useLocale();

  return (
    <div>
      <div className="relative h-full w-full">
        <div className="industries-slider-controls flex w-full items-center justify-end pb-4">
          <div className="test-custom-pagination px-4"></div>
          {/* Custom Navigation Buttons */}
          <div className="flex items-center justify-between gap-1">
            <div className="testPrev swiper-button flex size-8 cursor-pointer items-center justify-center rounded-full border transition duration-300">
              <Icon
                icon={locale === "en" ? "hugeicons:arrow-left-02" : "hugeicons:arrow-right-02"}
                className="size-4"
              />
            </div>
            <div className="testNext swiper-button flex size-8 cursor-pointer items-center justify-center rounded-full border transition duration-300">
              <Icon
                icon={locale === "en" ? "hugeicons:arrow-right-02" : "hugeicons:arrow-left-02"}
                className="size-4"
              />
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          breakpoints={{
            0: {
              slidesPerView: 2.2,
            },
            640: {
              slidesPerView: 3.2,
            },
            1024: {
              slidesPerView: 4.2,
            },
          }}
          spaceBetween={16}
          navigation={{
            nextEl: ".testNext",
            prevEl: ".testPrev",
          }}
          pagination={{ el: ".test-custom-pagination", clickable: true }}
          className="testimonial-swiper flex items-stretch"
        >
          {process.map((step, ind) => (
            <SwiperSlide key={ind} className="h-full">
              <ProcessCard ind={ind} text={step} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
