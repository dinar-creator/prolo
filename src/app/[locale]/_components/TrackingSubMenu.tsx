import { getLocale } from "next-intl/server";
import { Button } from "./components";

type TrackAndShip = {
  track: {
    text: string;
    link: string;
  };
  ship: { text: string; link: string };
};
async function TrackingSubMenu({ track, ship }: TrackAndShip) {
  const locale = await getLocale();
  return (
    <div className="flex w-full flex-wrap items-center gap-4" dir={locale === "en" ? "ltr" : "rtl"}>
      <Button
        text={track.text}
        href={"/" + locale + track.link}
        direction="forward"
        className="border-theme-white text-theme-white hover:bg-blue-hover border"
      />
      <Button
        text={ship.text}
        href={"/" + locale + ship.link}
        direction="forward"
        className="border-theme-white text-theme-white hover:bg-blue-hover border"
      />
    </div>
  );
}

export default TrackingSubMenu;
