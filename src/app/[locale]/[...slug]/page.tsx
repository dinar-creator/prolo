// app/[locale]/[...slug]/page.tsx
import { notFound } from "next/navigation";
// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";
// SEO for Not Found Page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.notFound.image;

  return {
    title: t.notFound.title,
    description: t.notFound.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
      },
    },

    openGraph: {
      title: t.notFound.title,
      description: t.notFound.description,
      url: `${SITE_URL}/${locale}`,
      images: getSeoImages(imageUrl, "404 Page Not Found"),
    },

    twitter: {
      card: "Prolo - App Download Page",
      title: t.notFound.title,
      description: t.notFound.description,
      images: getSeoImages(imageUrl, "404 Page Not Found"),
    },
  };
}

export default async function CatchAllPage() {
  notFound();
}
