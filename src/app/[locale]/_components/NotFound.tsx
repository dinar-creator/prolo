import Image from "next/image";
import { Button } from "../_components/components";

import { getLocale, getMessages } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const linkMessages = (await getMessages()).links;

  const isArabic = locale === "ar";

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Image
        src="/images/not-found/not-found.png"
        alt="404 error icon"
        width={200}
        height={200}
        priority
      />

      <h1 className="mt-6 text-3xl font-bold text-gray-800">
        {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
      </h1>

      <p className="mt-2 text-gray-600">
        {isArabic
          ? "عذرًا، الصفحة التي تبحث عنها غير موجودة."
          : "Sorry, the page you’re looking for doesn’t exist."}
      </p>

      <Button
        href={`/${locale}`}
        text={linkMessages?.home?.text}
        direction="forward"
        className="bg-theme-blue hover:bg-blue-hover mt-6 text-white"
      />
    </main>
  );
}
