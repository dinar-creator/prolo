import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Button } from "./components";
import { Icon } from "@iconify/react";
type PageTitleProps = {
  hidePara?: boolean;
  heading: string;
  description: string;
  image: string;
  icon?: string;
  cta?: boolean;
};

export default async function PageHeader({
  hidePara = false,
  heading,
  description,
  image,
  icon,
  cta = false,
}: PageTitleProps) {
  const locale = await getLocale();
  const ctas = await getTranslations("ctas");

  return (
    <div className="prolo-container">
      <div
        className={`bg-theme-blue mt-[70px] mb-5 flex w-full items-center justify-between rounded-xl p-6 text-center text-white sm:rounded-2xl sm:p-8 ${locale === "en" ? "sm:text-left" : "sm:text-right"}`}
      >
        <div className="w-full sm:w-[60%]">
          <h2 className="text-3xl font-bold">{heading}</h2>
          {!hidePara && <p className="mt-2 text-sm sm:text-base">{description}</p>}
          <div className="mt-6 flex w-full items-center justify-center sm:justify-start">
            {" "}
            {cta && (
              <Button
                text={ctas("getAQuote")}
                href={`/${locale}/get-a-quote`}
                direction="forward"
                className="hover:bg-blue-hover border border-white text-white"
              />
            )}
          </div>
        </div>
        <div className="hidden sm:block">
          {icon ? (
            <Icon icon={icon} className={`h-[200px] w-auto ${locale === "ar" && "rotate-y-180"}`} />
          ) : (
            <Image
              src={image}
              width={70}
              height={70}
              alt={`3D icon representing ${heading}`}
              className="h-[250px] w-auto"
              unoptimized
            />
          )}
        </div>
      </div>
    </div>
  );
}
