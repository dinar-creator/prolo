"use client";
import { IndutsryCard } from "./components";
import { Icon } from "@iconify/react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useLocale, useMessages } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Industry {
  icon: string;
  name: string;
  description: string;
  link: string;
}

export default function IndustriesSlider() {
  const locale = useLocale();
  const messages = useMessages();
  const industries = messages.industries as Industry[];

  return (
    <div className="relative h-full w-full">
      <div className="industries-slider-controls flex w-full items-center justify-end py-4">
        {/* Custom Pagination Bullets */}
        <div className="custom-pagination px-4"></div>
        {/* Custom Navigation Buttons */}
        <div className="flex items-center justify-between gap-1">
          <div className="prevEl swiper-button flex size-8 cursor-pointer items-center justify-center rounded-full border transition duration-300">
            <Icon
              icon={locale === "en" ? "hugeicons:arrow-left-02" : "hugeicons:arrow-right-02"}
              className="size-4"
            />
          </div>
          <div className="nextEl swiper-button flex size-8 cursor-pointer items-center justify-center rounded-full border transition duration-300">
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
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 3.2,
          },
          1024: {
            slidesPerView: 4.2,
          },
        }}
        spaceBetween={16}
        navigation={{
          nextEl: ".nextEl",
          prevEl: ".prevEl",
        }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        className="industries-swiper"
      >
        {industries.map((industry: Industry) => (
          <SwiperSlide key={industry.link}>
            <IndutsryCard
              icon={industry.icon}
              title={industry.name}
              description={industry.description}
              link={"/" + locale + industry.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
