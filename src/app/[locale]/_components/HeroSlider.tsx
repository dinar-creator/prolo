"use client";

// components/HeroSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

export default function HeroSlider() {
  return (
    <div className="h-full w-full">
      <div className="hero-slider-controls absolute bottom-0 left-0 z-10 flex w-full items-center justify-center">
        <div className="hero-custom-pagination flex items-center justify-center py-4"></div>
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="hero-slider relative z-1 h-full w-full"
        pagination={{ el: ".hero-custom-pagination", clickable: true }}
      >
        <SwiperSlide className="relative">
          <div className="relative h-full w-full">
            <Image
              src={"/images/hero/hero-one.png"}
              alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
              className="relative z-[-1] h-full w-full object-cover"
              fill
              loading="lazy"
              priority={false}
              fetchPriority="low"
              decoding="async"
              unoptimized
            />

            {/* <div className="absolute top-15 right-4 w-25 md:top-18 md:w-30">
              <Image
                src={"/logo-white.svg"}
                alt=""
                width={160}
                height={80}
                className="h-auto w-full"
              />
            </div> */}
            <div className="absolute inset-0 z-2 bg-black/10"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative h-full w-full">
            <Image
              src={"/images/hero/hero-two.png"}
              alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
              className="relative z-[-1] h-full w-full object-cover"
              fill
              loading="lazy"
              priority={false}
              fetchPriority="low"
              decoding="async"
            />

            {/* <div className="absolute bottom-10 left-4 w-25 md:w-30">
              <Image
                src={"/logo-white.svg"}
                alt=""
                width={160}
                height={80}
                className="h-auto w-full"
                unoptimized
              />
            </div> */}
            <div className="absolute inset-0 z-2 bg-black/10"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative h-full w-full">
            <Image
              src={"/images/hero/hero-three.png"}
              alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
              className="relative z-[-1] h-full w-full object-cover"
              fill
              loading="lazy"
              priority={false}
              fetchPriority="low"
              decoding="async"
              unoptimized
            />

            {/* <div className="absolute bottom-10 left-4 w-25 md:w-30">
              <Image
                src={"/logo-white.svg"}
                alt=""
                width={160}
                height={80}
                className="h-auto w-full"
              />
            </div> */}
            <div className="absolute inset-0 z-2 bg-black/10"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
