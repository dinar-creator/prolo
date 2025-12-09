import { getLocale } from "next-intl/server";
import Image from "next/image";
type Props = {
  text: string;
  icon: string;
};
export default async function TimelineListItem({ icon, text }: Props) {
  const locale = await getLocale();
  return (
    <li className="w-full flex-row md:h-auto md:w-auto md:flex-col">
      <div className="upper">
        <div className="size-20">
          <Image
            src={icon}
            alt={text}
            width={60}
            height={60}
            className={`w-full ${locale === "ar" && "rotate-y-180"}`}
          />
        </div>
      </div>
      <div className="mid h-auto flex-col self-stretch md:h-10 md:flex-row">
        <div className="left"></div>
        <div className="between"></div>
        <div className="right"></div>
      </div>
      <div className="lower">
        <h3 className="timeline-black w-full py-4 font-medium md:w-fit md:max-w-[100px] md:px-4 md:py-0 md:text-center">
          {text}
        </h3>
      </div>
    </li>
  );
}
