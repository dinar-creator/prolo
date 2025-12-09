import Link from "next/link";
import { Icon } from "@iconify/react";

type Link = {
  icon?: string;
  text: string;
  link: string;
};

type LinkSegment = {
  title: string;
  links: Link[];
};
export default async function FooterSocialIcons({ title, links }: LinkSegment) {
  return (
    <div>
      <h4 className="mt-4 mb-2 text-lg font-bold">{title}</h4>
      <ul className="flex gap-2">
        {links.map((link, ind) => (
          <li
            key={ind}
            className="w-fit cursor-pointer text-base hover:underline"
            title={link.text}
          >
            <Link href={link.link}>
              <Icon icon={link.icon || ""} className="size-6" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
