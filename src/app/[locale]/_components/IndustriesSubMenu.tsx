"use server";
import { getLocale } from "next-intl/server";
import Link from "next/link";

type Link = {
  text: string;
  link: string;
};

type IndustriesLinks = {
  title: string;
  links: Link[];
};
async function IndustriesSubMenu({ title, links }: IndustriesLinks) {
  const locale = await getLocale();
  return (
    <div className="flex w-full flex-wrap justify-between gap-2 text-white">
      <div className="flex basis-[45%] flex-col gap-1">
        <span className="mb-2 text-lg font-medium">{title}</span>
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

export default IndustriesSubMenu;
