"use client";

import Link from "next/link";
// import { getLocale } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  title: string;
  description: string;
  link: string;
  slug?: string;
  num?: number | string;
};

export default function ServiceCard({ title, description, link, slug, num }: Props) {
  const ctas = useTranslations("ctas");
  const locale = useLocale();

  return (
    <div className="bg-base1 relative flex flex-col justify-between overflow-hidden rounded-xl p-4 lg:bg-white lg:p-2">
      {num && (
        <span className="absolute top-0 left-0 z-1 block text-[100px]/[90px] font-black text-gray-400/10">
          {num}
        </span>
      )}
      <div>
        <h3 className="text-xl font-medium lg:text-base">{title}</h3>
        <p className="text-lg lg:text-sm">{description}</p>
      </div>
      <div className="buttons relative z-2 mt-2 flex flex-wrap gap-2 lg:mt-2">
        <Link
          href={`/${locale}/get-a-quote${slug ? `/${slug}` : ""}`}
          className="bg-theme-blue hover:bg-blue-hover text-theme-white border-theme-blue hover:border-blue-hover cursor-pointer rounded-full border px-3 py-1 text-xs"
        >
          {ctas("getAQuote")}
        </Link>
        <Link
          href={`${link}`}
          className="hover:bg-white-hover cursor-pointer rounded-full border px-3 py-1 text-xs"
        >
          {ctas("learnMore")}
        </Link>
      </div>
    </div>
  );
}
