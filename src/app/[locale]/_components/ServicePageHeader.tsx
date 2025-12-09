import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "./components";

type Props = {
  textCenter?: boolean;
  heading: string;
  description?: string;
  slug?: string;
  image: string;
};
export default async function ServicePageHeader({
  textCenter = true,
  heading,
  description,
  slug,
  image,
}: Props) {
  const locale = await getLocale();
  const ctas = await getTranslations("ctas");
  console.log(textCenter);
  return (
    <div
      style={{
        backgroundImage: `url('${image}')`,
      }}
      className={`service-header relative flex h-auto w-full items-center justify-center bg-cover bg-center bg-no-repeat pt-40 pb-10`}
    >
      {/* Dark Overlay */}
      <div className="bg-theme-blue absolute inset-0 opacity-60"></div>

      <div
        className={`service-content prolo-container relative z-1 flex w-full flex-col items-start justify-center text-white`}
      >
        <h2 className={`text-3xl font-bold md:text-4xl`}>{heading}</h2>
        {description && (
          <p className="mt-4 w-full max-w-[600px] text-xs sm:text-sm">{description}</p>
        )}
        <Button
          text={ctas("getAQuote")}
          direction="forward"
          href={`/${locale}/get-a-quote${slug ? `/${slug}` : ""}`}
          className="bg-theme-blue hover:bg-blue-hover mt-4 border border-white/50"
        />
      </div>
    </div>
  );
}
