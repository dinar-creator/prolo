"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import StorageRequestForm from "./StorageRequestForm";
import ShippingRequestForm from "./ShippingRequestForm";
import { useState } from "react";
import Image from "next/image";

export default function Marketplace() {
  const t = useTranslations("marketplace");
  const [selected, setSelected] = useState<"storage" | "shipping">("storage");

  return (
    <main className="mx-auto max-w-5xl px-4 pt-28 pb-16">
      <section className="from-theme-blue to-theme-blue/50 relative overflow-hidden rounded-3xl bg-gradient-to-r p-8 text-white sm:p-10 rtl:bg-gradient-to-l">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-white">{t("hero.badge")}</p>

            <div className="mt-3 flex items-center gap-2">
              <Image
                src={"/images/space-logo-new.svg"}
                alt="Space"
                width={70}
                height={28}
                className="h-7 w-auto shrink-0 object-contain sm:h-8"
              />
              <h1 className="font-heading text-3xl leading-tight font-black sm:text-4xl">
                {t("hero.title")}
              </h1>
            </div>

            <p className="font-heading sm:text-md mt-2 text-base font-bold text-white">
              {t("hero.subtitle")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80">{t("hero.description")}</p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <Image
              src={"/images/market-header.png"}
              alt="Marketplace"
              width={80}
              height={80}
              className="h-50 w-50 object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-theme-blue text-2xl font-extrabold sm:text-3xl">
          {t("value.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
          {t("value.description")}
        </p>
      </section>

      <section className="mt-10 text-center">
        <h2 className="font-heading text-theme-blue text-2xl font-extrabold sm:text-3xl">
          {t("needs.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
          {t("needs.description")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setSelected("storage")}
            className={`group flex w-40 flex-col items-center justify-center gap-3 rounded-2xl border py-6 shadow-sm transition-all duration-200 ${
              selected === "storage"
                ? "border-theme-blue bg-theme-blue shadow-md shadow-gray-300/60"
                : "border-gray-200 bg-white hover:border-rose-300 hover:shadow-md hover:shadow-gray-300/60"
            }`}
          >
            <Icon
              icon="solar:home-2-linear"
              className={`h-7 w-7 transition-colors ${
                selected === "storage" ? "text-white" : "text-gray-900 group-hover:text-rose-500"
              }`}
            />
            <span
              className={`font-heading font-semibold transition-colors ${
                selected === "storage" ? "text-white" : "text-gray-900 group-hover:text-rose-500"
              }`}
            >
              {t("needs.storage")}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelected("shipping")}
            className={`group flex w-40 flex-col items-center justify-center gap-3 rounded-2xl border py-6 shadow-sm transition-all duration-200 ${
              selected === "shipping"
                ? "border-theme-blue bg-theme-blue shadow-md shadow-gray-300/60"
                : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md hover:shadow-gray-300/60"
            }`}
          >
            <Icon
              icon="solar:delivery-linear"
              className={`h-7 w-7 transition-colors ${
                selected === "shipping" ? "text-white" : "text-gray-900 group-hover:text-purple-500"
              }`}
            />
            <span
              className={`font-heading font-semibold transition-colors ${
                selected === "shipping" ? "text-white" : "text-gray-900 group-hover:text-purple-500"
              }`}
            >
              {t("needs.shipping")}
            </span>
          </button>
        </div>
      </section>

      <section className="mt-10">
        {selected === "storage" ? <StorageRequestForm /> : <ShippingRequestForm />}
      </section>
    </main>
  );
}
