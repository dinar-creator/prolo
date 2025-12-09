import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

type BlogCard = {
  thumbnail: string;
  heading: string;
  slug: string;
  date: string;
};

export default async function BlogPageCard({ thumbnail, heading, slug, date }: BlogCard) {
  const locale = await getLocale();
  const ctas = await getTranslations("ctas");

  return (
    <div className="flex w-full items-start justify-start gap-4 rounded-xl md:flex-col">
      {/* Image */}
      <div className="aspect-square h-[150px] rounded-xl md:aspect-auto md:w-full">
        <Image
          src={thumbnail}
          alt={`The image represents ${heading}`}
          width={300}
          height={250}
          className="h-full w-full rounded-xl object-cover"
          unoptimized
        />
      </div>
      <div>
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
        {/* Metadata */}
        <div className="mb-2">
          <span className="w-fit rounded-md px-1 py-1 text-xs text-gray-400/75">🗓️ {date}</span>
        </div>
        <div>
          <Button
            href={`/${locale}/blogs/${slug}`}
            text={ctas("readMore")}
            direction="forward"
            className="bg-theme-blue hover:bg-blue-hover text-white"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
