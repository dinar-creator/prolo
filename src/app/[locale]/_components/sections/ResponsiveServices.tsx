"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { ServiceCard } from "../components";
interface ServiceItem {
  name: string;
  description: string;
  link: string;
}

type Props = {
  individualServices: {
    title: string;
    cards: ServiceItem[];
  };
  commercialSectorServices: {
    title: string;
    cards: ServiceItem[];
  };
};

export default function ResponsiveServices({
  individualServices,
  commercialSectorServices,
}: Props) {
  const locale = useLocale();
  const [indTab, setIndTab] = useState<boolean>(false);

  return (
    <div className="prolo-container lg:hidden">
      {/* Buttons */}
      <div className="bg-base1/70 flex w-full items-center justify-between rounded-full p-2">
        <button
          className={`w-[49%] px-6 py-3 ${
            indTab ? "bg-theme-blue text-theme-white hover:bg-blue-hover" : "hover:bg-white-hover"
          } cursor-pointer rounded-full text-sm font-bold transition duration-300 sm:text-base md:text-lg`}
          onClick={() => setIndTab(true)}
        >
          {individualServices.title}
        </button>
        <button
          className={`w-[49%] px-6 py-3 ${
            !indTab ? "bg-theme-blue text-theme-white hover:bg-blue-hover" : "hover:bg-white-hover"
          } cursor-pointer rounded-full text-sm font-bold transition duration-300 sm:text-base md:text-lg`}
          onClick={() => setIndTab(false)}
        >
          {commercialSectorServices.title}
        </button>
      </div>

      {/* Tab: Individual Services */}
      <div
        className={`${
          !indTab && "hidden"
        } mt-4 grid w-full grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-2 md:mt-8 md:grid-cols-3`}
      >
        {individualServices.cards.map((service, ind) => (
          <ServiceCard
            key={service.link}
            title={service.name}
            description={service.description}
            link={`/${locale}${service.link}`}
            num={ind + 1}
          />
        ))}
      </div>
      {/* Tab: Enterprise Services */}
      <div
        className={`${
          indTab && "hidden"
        } mt-4 grid w-full grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-2 md:mt-8 md:grid-cols-3`}
      >
        {commercialSectorServices.cards.map((service, ind) => (
          <ServiceCard
            key={service.link}
            title={service.name}
            description={service.description}
            link={`/${locale}${service.link}`}
            num={ind + 1}
          />
        ))}
      </div>
    </div>
  );
}
