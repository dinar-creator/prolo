import { getLocale } from "next-intl/server";
import Link from "next/link";

type Link = {
  text: string;
  link: string;
};

type ServicesLinks = {
  individualServices: {
    title: string;
    links: Link[];
  };
  commercialSectorServices: {
    title: string;
    links: Link[];
  };
};
async function ServicesSubMenu({ individualServices, commercialSectorServices }: ServicesLinks) {
  const locale = await getLocale();
  return (
    <div className="flex w-full flex-col flex-wrap justify-between gap-2 text-white sm:flex-row">
      <div className="flex basis-1 flex-col gap-2 sm:basis-[45%]">
        <span className="mb-2 text-lg font-medium">{individualServices.title}</span>
        {individualServices.links.map(link => (
          <Link
            key={link.link}
            href={"/" + locale + link.link}
            className="hover:text-white-hover text-base font-normal transition duration-300 hover:underline"
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className="flex basis-1 flex-col gap-1 sm:basis-[45%]">
        <span className="mb-2 text-lg font-medium">{commercialSectorServices.title}</span>
        {commercialSectorServices.links.map(link => (
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

export default ServicesSubMenu;
