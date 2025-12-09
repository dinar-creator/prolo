"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

type Link = {
  text: string;
  link: string;
};
import LanguageToggle from "../LanguageToggle";

import TrackingSubMenuClient from "../TrackingSubMenuClient";
import ServicesSubMenuClient from "../ServicesSubMenuClient";
import IndustriesSubMenuClient from "../IndustriesSubMenuClient";
import { useLocale, useMessages, useTranslations } from "next-intl";
import Link from "next/link";
import { useScrollDirection } from "../../_hooks/useScrollDirection";

export default function ResposiveHeader() {
  const locale = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [openTrackingSub, setOpenTrackingSub] = useState<boolean>(false);
  const [openServicesSub, setOpenServicesSub] = useState<boolean>(false);
  const [openIndustriesSub, setOpenIndustriesSub] = useState<boolean>(false);
  const scrollDirection = useScrollDirection();

  const messages = useMessages();
  const links = JSON.parse(JSON.stringify(messages.links));
  const ctas = useTranslations("ctas");

  const divRef = useRef<HTMLDivElement>(null);

  function openMenu(): void {
    setOpen(true);
  }

  function closeMenu(): void {
    setOpen(false);
    setOpenSub(false);
  }

  function handleMenu(): void {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleSubMenu(item: "tracking" | "services" | "industries"): void {
    setOpenSub(true);

    if (item === "tracking") {
      setOpenTrackingSub(true);
    }

    if (item === "services") {
      setOpenServicesSub(true);
    }

    if (item === "industries") {
      setOpenIndustriesSub(true);
    }
  }

  function closeSubMenu() {
    setOpenSub(false);
    setOpenTrackingSub(false);
    setOpenServicesSub(false);
    setOpenIndustriesSub(false);
  }

  // Close menu when page is refreshed
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (scrollDirection === "down") {
      closeMenu();
    }
  }, [scrollDirection]);

  return (
    <>
      <header
        className="bg-theme-blue absolute top-0 left-0 z-21 flex h-[50px] w-full items-center justify-center px-4 py-2 shadow-2xl md:hidden"
        dir="ltr"
      >
        <nav className="relative flex w-full items-center justify-between">
          <div>
            <Link href={`/${locale}/`} aria-label="Home">
              <Image
                src={"/logo-white.svg"}
                width={40}
                height={40}
                alt="Prolo | Professional Logistics Logo"
                className="h-auto w-20"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Link href={"/" + locale + "/contact"} aria-label="Contact">
              <Icon
                icon={"hugeicons:customer-support"}
                className="text-theme-white size-7 cursor-pointer"
              />
            </Link>
            <Icon
              icon={!open ? "hugeicons:menu-01" : "hugeicons:cancel-01"}
              className="text-theme-white size-7 cursor-pointer"
              onClick={handleMenu}
            />
          </div>
        </nav>
      </header>
      <div
        dir="ltr"
        className={`bg-theme-blue absolute top-[50px] left-0 z-20 w-full overflow-hidden transition-all duration-300 md:hidden ${open ? "h-dvh" : "h-0"}`}
      >
        {/* Internal Container */}
        {/* Main Menu */}
        <div
          className={`flex h-full w-[200%] transition duration-300 ${openSub ? "translate-x-[-50%]" : "translate-x-[0%]"}`}
          ref={divRef}
          aria-hidden
        >
          <div className="flex h-full w-[50%] p-4">
            <ul className="mt-6 w-full" dir={locale === "ar" ? "rtl" : "ltr"}>
              {/* Home */}
              <li>
                <Link
                  href={`/${locale}`}
                  className="bg- my-2 flex w-full items-center justify-between rounded-xl bg-[#121486] px-4 py-2 text-white"
                >
                  <span>{links.home.text}</span>
                  <Icon icon={"hugeicons:home-12"} className="size-6" />
                </Link>
              </li>

              <li>
                <Link
                  href={`/${locale}${links.trackAndShip?.ship?.link}`}
                  className="bg- my-2 flex w-full items-center justify-between rounded-xl bg-[#121486] px-4 py-2 text-white"
                >
                  <span>{links.trackAndShip?.ship?.text}</span>
                  <Icon icon={"hugeicons:link-circle-02"} className="size-6" />
                </Link>
              </li>
              <li
                className="bg- my-2 flex w-full items-center justify-between rounded-xl bg-[#121486] px-4 py-2 text-white"
                onClick={() => handleSubMenu("services")}
              >
                <span>{links.services.title}</span>
                <Icon
                  icon={locale === "en" ? "hugeicons:arrow-right-01" : "hugeicons:arrow-left-01"}
                  className="size-6"
                />
              </li>
              <li
                className="bg- my-2 flex w-full items-center justify-between rounded-xl bg-[#121486] px-4 py-2 text-white"
                onClick={() => handleSubMenu("industries")}
              >
                <span>{links.industries.title}</span>
                <Icon
                  icon={locale === "en" ? "hugeicons:arrow-right-01" : "hugeicons:arrow-left-01"}
                  className="size-6"
                />
              </li>
              <li>
                <Link
                  href={`/${locale + links.blogs.link}`}
                  className="bg- my-2 flex w-full items-center justify-between rounded-xl bg-[#121486] px-4 py-2 text-white"
                >
                  <span>{links.blogs.text}</span>
                  <Icon icon={"hugeicons:link-circle-02"} className="size-6" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Sub Menu */}
          <div
            className="relative flex h-full w-[50%] flex-col p-4"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <span
              className="bg- my-2 flex w-full items-center justify-between rounded-xl bg-[#121486] px-4 py-2 text-white"
              onClick={closeSubMenu}
              dir="ltr"
            >
              <Icon icon={"hugeicons:arrow-left-01"} className="size-6" />
              {ctas("back")}
            </span>
            {openTrackingSub && (
              <TrackingSubMenuClient
                track={links.trackAndShip.track as Link}
                ship={links.trackAndShip.ship as Link}
              />
            )}
            {openServicesSub && (
              <ServicesSubMenuClient
                individualServices={links?.services.individualServices}
                commercialSectorServices={links?.services.commercialSectorServices}
              />
            )}
            {openIndustriesSub && (
              <IndustriesSubMenuClient
                title={links.industries.title}
                links={links.industries.links as Link[]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
