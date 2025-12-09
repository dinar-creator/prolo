import Link from "next/link";
import { Navbar, LanguageToggle } from "../components";
import { getLocale } from "next-intl/server";
import { Icon } from "@iconify/react";

export default async function Header() {
  const locale = await getLocale();

  return (
    <header
      dir="ltr"
      className="absolute top-4 left-0 z-10 hidden h-10 w-full items-center justify-center gap-1 md:flex"
    >
      <Navbar />

      {/* Contact Page Link */}
      <Link
        href={`/${locale}/contact`}
        className="text-theme-white bg-theme-blue hover:bg-blue-hover flex h-10 w-[50px] items-center justify-center rounded-r-full transition duration-300"
      >
        <Icon icon={`hugeicons:customer-support`} className="size-6" />
      </Link>
      {/* Language */}
      <div className="absolute right-4">
        <LanguageToggle />
      </div>
    </header>
  );
}
