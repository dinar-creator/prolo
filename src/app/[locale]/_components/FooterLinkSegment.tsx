import { getLocale } from "next-intl/server";
import Link from "next/link";

type LinkItem = {
  icon?: string;
  text: string;
  link: string;
};

type LinkSegment = {
  title: string;
  links: LinkItem[];
  showTitle?: boolean;
};

export default async function FooterLinkSegment({ showTitle = true, title, links }: LinkSegment) {
  const locale = await getLocale();

  return (
    <div>
      {showTitle && <h4 className="mb-2 text-lg font-bold">{title}</h4>}
      <ul className="flex flex-col gap-2">
        {links.map((linkItem: LinkItem, ind: number) => (
          <li key={ind} className="w-fit cursor-pointer text-base hover:underline">
            <Link href={"/" + locale + linkItem.link} className="flex gap-4">
              {linkItem.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
