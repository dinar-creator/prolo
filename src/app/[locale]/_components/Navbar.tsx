import Image from "next/image";
import Link from "next/link";
import { getLocale, getMessages } from "next-intl/server";
import { NavItem, ServicesSubMenu, IndustriesSubMenu } from "../_components/components";

type Link = {
  text: string;
  link: string;
};

export default async function Navbar() {
  const locale = await getLocale();
  const messages = await getMessages();
  const links = JSON.parse(JSON.stringify(messages.links));

  return (
    <nav className="bg-theme-blue text-theme-white relative flex items-center justify-center gap-6 rounded-l-full px-4 py-0 text-sm">
      <div className="relative cursor-pointer text-base text-[24px] font-black">
        <Link href={`/${locale}`}>
          <Image
            src={"/logo-white.svg"}
            alt="Prolo | Professional Logistics Service"
            width={95}
            height={40}
            className="h-10 w-[95px]"
          />
        </Link>
      </div>
      <ul
        className="flex w-full items-center justify-center gap-4"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {/* Home */}
        <li>
          <Link
            href={`/${locale}`}
            className="text-theme-white hover:text-white-hover static cursor-pointer text-base transition duration-300"
          >
            {links.home.text}
          </Link>
        </li>
        {/* Ship */}
        <li>
          <Link
            href={`/${locale}${links.trackAndShip?.ship?.link}`}
            className="text-theme-white hover:text-white-hover static cursor-pointer text-base transition duration-300"
          >
            {links.trackAndShip?.ship?.text}
          </Link>
        </li>
        {/* Services */}
        <li>
          <NavItem text={links.services.title}>
            <ServicesSubMenu
              individualServices={links?.services.individualServices}
              commercialSectorServices={links?.services.commercialSectorServices}
            />
          </NavItem>
        </li>
        {/* Industries */}
        <li>
          <NavItem text={links.industries.title}>
            <IndustriesSubMenu
              title={links.industries.title}
              links={links.industries.links as Link[]}
            />
          </NavItem>
        </li>
        {/* Blogs */}
        <li>
          <Link
            href={`/${locale}/blogs`}
            className="text-theme-white hover:text-white-hover static cursor-pointer text-base transition duration-300"
          >
            {links.blogs.text}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
