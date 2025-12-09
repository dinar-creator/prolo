import {
  Subscription,
  FooterLinkSegment,
  FooterSocialIcons,
  FooterContactLinkSegment,
  AppDownload,
} from "./components";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { satoshi } from "../../fonts/fonts";
import Link from "next/link";
import Image from "next/image";

type Link = {
  icon?: string;
  text: string;
  link: string;
};

type LinkSegment = {
  title: string;
  links: Link[];
};

type FooterData = {
  cr: string;
  cta: { title: string };
  footerText: string;
  quickLinks: LinkSegment;
  support: LinkSegment;
  socialMedia: LinkSegment;
  contact: LinkSegment;
};
export default async function Footer() {
  const locale = await getLocale();
  const footer = await getTranslations("footer");
  const messages = await getMessages();

  const footerData = JSON.parse(JSON.stringify(messages.footer)) as FooterData;

  const { quickLinks, support, contact, socialMedia } = footerData;

  const individualServices = messages.links.services.individualServices as LinkSegment;
  const commercialSectorServices = messages.links.services.commercialSectorServices as LinkSegment;
  const industries = messages.links.industries as LinkSegment;

  return (
    <footer className="bg-theme-blue mt-6 pt-6 text-white">
      {/* Links */}
      <div className="prolo-container grid-cols- section-spacing grid gap-6 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Col 01 */}
        <div>
          {/* Logo */}
          <div className="mb-4">
            <Link href={`/${locale}`}>
              <Image src={"/logo-white.svg"} alt="Prolo Logo" width={150} height={150} />
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-6">
            <FooterContactLinkSegment
              showTitle={false}
              title={contact.title}
              links={contact.links}
            />
          </div>

          <div className="mt-4">
            <FooterSocialIcons links={socialMedia.links} title={socialMedia.title} />
          </div>
        </div>
        {/* Col 02 */}
        <div>
          <FooterLinkSegment title={quickLinks.title} links={quickLinks.links} />
        </div>

        {/* Col 03 */}
        <div>
          <div className="hidden">
            <FooterLinkSegment title={individualServices.title} links={individualServices.links} />
            <div className="mt-4">
              <FooterLinkSegment
                title={commercialSectorServices.title}
                links={commercialSectorServices.links}
              />
            </div>
          </div>
          <AppDownload />
        </div>

        {/* Col 04 */}
        <div>
          {/* Subscription Form*/}
          <Subscription />
          <div className="hidden">
            <FooterLinkSegment title={industries.title} links={industries.links} />
          </div>
          <div className="mt-4">
            <FooterLinkSegment title={support.title} links={support.links} />
          </div>
        </div>
      </div>

      {/* Big Nane */}
      <p
        dir="ltr"
        className={`hidden py-0 text-center text-[10vw] font-black text-white/20 lg:hidden ${satoshi.className}`}
      >
        PROLO LOGISTICS
      </p>

      {/* Copyright Line */}
      <p className="flex w-full flex-col flex-wrap items-center justify-center gap-2 border-t border-gray-400/40 py-2 text-center text-sm">
        <span>{footer("footerText")}</span> <span>{footerData.cr}</span>
      </p>
    </footer>
  );
}
