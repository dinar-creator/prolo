"use client";
import { useLocale } from "next-intl";
import Link from "next/link";

type Link = {
  text: string;
  link: string;
};

type IndustriesLinks = {
  title: string;
  links: Link[];
};
function IndustriesSubMenuClient({ title, links }: IndustriesLinks) {
  const locale = useLocale();
  return (
    <div className="flex w-full flex-wrap justify-between gap-2 text-white">
      <div className="flex basis-[100%] flex-col gap-1 sm:basis-[45%]">
        <span className="text-lg font-medium">{title}</span>
        {links.map(link => (
          <Link
            key={link.link}
            href={"/" + locale + link.link}
            className="hover:text-white-hover text-base font-normal transition duration-300 hover:underline"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default IndustriesSubMenuClient;
