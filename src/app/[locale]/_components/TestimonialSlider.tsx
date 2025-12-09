"use client";
import { TestimonialCard } from "./components";
import { Icon } from "@iconify/react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useLocale, useMessages } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Testimony = {
  person: {
    name: string;
    title: string;
  };
  text: string;
  logo: string;
};

type TestimoinalCards = {
  title: string;
  cards: Testimony[];
};

export default function TestimonialSlider({ showHeading = false }: { showHeading?: boolean }) {
  const locale = useLocale();
  const messages = useMessages();
  const testimonials = messages.cards.testimonials as TestimoinalCards;

  return (
    <div>
      {showHeading && (
        <h4 className="my-2 text-center text-2xl font-medium sm:text-left">{testimonials.title}</h4>
      )}
      <div className="relative h-full w-full">
        <div className="industries-slider-controls flex w-full items-center justify-end py-4">
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
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3.2,
            },
          }}
          spaceBetween={16}
          navigation={{
            nextEl: ".testNext",
            prevEl: ".testPrev",
          }}
          pagination={{ el: ".test-custom-pagination", clickable: true }}
          className="testimonial-swiper"
        >
          {testimonials.cards.map((testimony, ind) => (
            <SwiperSlide key={ind}>
              <TestimonialCard text={testimony.text} person={testimony.person} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
