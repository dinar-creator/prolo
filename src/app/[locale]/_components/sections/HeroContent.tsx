import { getLocale, getTranslations } from "next-intl/server";
import { Button, TrackingInput } from "../components";
export default async function HeroContent() {
  const t = await getTranslations("homepage");
  const ctas = await getTranslations("ctas");
  const locale = await getLocale();

  return (
    <>
      <div>
        {/* Top - title */}
        <h2 className="mx-auto text-center text-2xl/tight font-bold text-white sm:w-[60%] sm:text-3xl/tight">
          {t("hero.title.first")} <span className="text-theme-blue">{t("hero.title.mid")}</span>{" "}
          {t("hero.title.last")}
        </h2>
      </div>

      {/* Buttom & Input */}
      <div className="hidden w-full max-w-[800px] sm:block sm:w-[90%]">
        {/* Button */}
        <Button
          text={ctas("createShipment")}
          href={`/${locale}/create-shipment/`}
          direction="forward"
          className="bg-white-hover/15 hover:bg-theme-blue hover:border-theme-blue mb-4 border border-white"
        />
        {/* Tracking Input */}
        <TrackingInput />
      </div>

      {/* Button */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:hidden">
        <Button
          text={ctas("createShipment")}
          href={`/${locale}/create-shipment/`}
          direction="forward"
          className="bg-white-hover/15 hover:bg-theme-blue hover:border-theme-blue min-w-[200px] border border-white"
        />
        <Button
          text={ctas("trackShipment")}
          href={`/${locale}/tracking/`}
          className="bg-theme-blue hover:bg-blue-hover min-w-[200px]"
          direction="forward"
        />
      </div>
    </>
  );
}
