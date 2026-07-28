"use client";

import { useTranslations, useLocale } from "next-intl";
import { Icon } from "@iconify/react";
import Link from "next/link";
import styles from "./HeroMarketPlace.module.css";
import Image from "next/image";
import { marketPlace, spaceLogo } from "../../images/images"; 

export default function HeroMarketPlace() {
  const t = useTranslations("homepage");
  const locale = useLocale();

  return (
    <div className="absolute start-4 top-24 z-10 w-[360px] max-w-[90vw] sm:start-8">
      <span className={`${styles.arrowWrap} inline-block`}>
        <Image
          src={"/images/Arrow.png"}
          alt=""
          width={200}
          height={200}
          className={`${styles.arrow} h-24 w-24 shrink-0 object-contain sm:h-28 sm:w-28`}
        />
      </span>

      <div className="relative">
        <div className={styles.glow} aria-hidden="true" />
        <div className={`${styles.card} rounded-2xl p-6`}>
          <span className="inline-block rounded-md bg-indigo-500 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
            {t("hero.marketplace.badge")}
          </span>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Image
                  src={spaceLogo}
                  alt="Space"
                  width={70}
                  height={28}
                  className="h-6 w-auto shrink-0 object-contain sm:h-7"
                />
                <h3 className="line-clamp-1 text-xl font-bold text-white">
                  {t("hero.marketplace.title")}
                </h3>
              </div>

              <p className="mt-2 line-clamp-4 text-sm leading-tight text-white/70">
                {t("hero.marketplace.description")}
              </p>
            </div>

            <Image
              src={marketPlace}
              alt="Marketplace illustration"
              width={120}
              height={120}
              className="h-16 w-16 shrink-0 object-contain sm:h-25 sm:w-25"
            />
          </div>

          <Link
            href={`/${locale}/marketplace`}
            className={`mt-6 flex w-60 items-center justify-between rounded-full px-5 py-3 text-sm font-semibold text-white ${styles.ctaButton}`}
          >
            {t("hero.marketplace.cta")}
            <Icon icon="mdi:arrow-right" className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}