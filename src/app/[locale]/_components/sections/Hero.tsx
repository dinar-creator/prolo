"use client";
import { useTranslations } from "next-intl";
import { TrackingInput } from "../components";
import HeroLazyLogos from "../optimized/HeroLazyLogos";
import HeroLazySlider from "../optimized/HeroLazySlider";
// import HeroStatic from "../optimized/HeroStatic";

export default function Hero() {
  const t = useTranslations("homepage");

  return (
    <section
      id="#hero"
      className="sm:py-auto relative z-1 flex min-h-[600px] w-full flex-col items-center justify-center text-white"
    >
      {/* Overlay */}
      <div className="absolute inset-0 h-full w-full">
        <HeroLazySlider />
      </div>

      {/* HERO Content */}
      <div className="relative z-2 flex h-full min-h-[600px] w-full flex-col items-center justify-between gap-8 p-8 pt-23 pb-12 sm:gap-12 md:gap-12">
        {/* Top - title */}
        <div>
          <h2 className="mx-auto text-center text-3xl/tight font-bold text-white sm:w-[60%] sm:text-4xl/tight">
            {t("hero.title.first")} <span className="">{t("hero.title.mid")}</span>{" "}
            {t("hero.title.last")}
          </h2>
        </div>

        {/* Logos & Input Bar */}
        <div className="flex w-full flex-col-reverse items-center justify-center gap-4 md:flex-row md:justify-between">
          {/* Hero Logos */}
          <HeroLazyLogos />
          {/* Tracking Input */}
          <div className="w-full max-w-[500px]">
            <TrackingInput />
          </div>
        </div>
      </div>
    </section>
  );
}
