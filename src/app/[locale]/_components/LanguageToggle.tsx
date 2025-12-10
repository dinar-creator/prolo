"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Icon } from "@iconify/react";
export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLocale = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const isArabic = currentLocale === "ar";

  return (
    <>
      <Icon
        onClick={toggleLocale}
        icon="hugeicons:globe-02"
        className="text-theme-white size-7 cursor-pointer sm:hidden"
      />
      <button
        onClick={toggleLocale}
        className={`bg-theme-blue text-theme-white hover:bg-blue-hover hidden h-10 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-base font-medium transition duration-300 sm:flex`}
      >
        <Icon icon="hugeicons:globe-02" className="size-6" />
        <span className={`sm:hidden md:inline-block`}>{!isArabic ? "ع" : "En"}</span>
      </button>
    </>
  );
}
