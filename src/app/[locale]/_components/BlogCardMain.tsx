import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { getLocale, getTranslations } from "next-intl/server";

type BlogCard = {
  thumbnail: string;
  heading: string;
  slug: string;
  date: string;
};

export default async function BlogCardMain({ thumbnail, heading, slug, date }: BlogCard) {
  const locale = await getLocale();
  const ctas = await getTranslations("ctas");

  return (
    <div className="w-full">
      {/* Image */}
      <div className="bg-base1 h-[250px] w-full rounded-xl">
        <Image
          src={thumbnail}
          alt={`Image which represents ${heading}`}
          width={300}
          height={250}
          className="h-full w-full rounded-xl object-cover"
          unoptimized
        />
      </div>
      {/* Metadata */}
      <div className="my-2">
        <span className="bg-base1 w-fit rounded-md px-3 py-1 text-xs">🗓️ {date}</span>
      </div>
      {/* title */}
      <div className="w-full">
        <h3 className="text-xl font-medium">
          <Link
            href={`/${locale}/blogs/${slug}`}
            className="hover:text-theme-blue block w-full transition-colors hover:underline"
          >
            {heading}
          </Link>
        </h3>
      </div>
      <div className="mt-2">
        <Button
          href={`/${locale}/blogs/${slug}`}
          text={ctas("readMore")}
          direction="forward"
          className="bg-theme-blue hover:bg-blue-hover text-white"
          size="sm"
        />
      </div>
    </div>
  );
}
