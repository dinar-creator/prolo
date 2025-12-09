import { getTranslations } from "next-intl/server";
import { Button } from "./components";
import Image from "next/image";

type BlogCardProps = {
  title: string;
  link: string;
  image: string;
};

export default async function BlogCard({ title, link, image }: BlogCardProps) {
  const ctas = await getTranslations("ctas");

  return (
    <div className="relative h-[300px] overflow-hidden rounded-xl">
      <div className="absolute inset-0 flex items-end bg-linear-to-t from-black to-transparent p-6 pb-8">
        <div className="flex h-[150px] w-full flex-col items-start justify-between">
          <h3 className="mb-6 text-lg font-bold text-white">{title}</h3>
          <Button
            href={link}
            text={ctas("readMore")}
            direction="forward"
            className="hover:bg-theme-blue border border-white text-white"
          />
        </div>
      </div>
      <Image
        src={image}
        height={426}
        width={300}
        className="h-full w-full object-cover"
        alt="Blog one image"
      />
    </div>
  );
}
