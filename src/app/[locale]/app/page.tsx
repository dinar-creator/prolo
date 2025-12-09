import { AppDownload } from "../_components/components";
// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";
// SEO for App Download Page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.appDownload.image;

  return {
    title: t.appDownload.title,
    description: t.appDownload.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}/app`,
      languages: {
        en: `${SITE_URL}/en/app`,
        ar: `${SITE_URL}/ar/app`,
      },
    },

    openGraph: {
      title: t.appDownload.title,
      description: t.appDownload.description,
      url: `${SITE_URL}/${locale}/app`,
      images: getSeoImages(imageUrl, "App Download Page"),
    },

    twitter: {
      card: "Prolo - App Download Page",
      title: t.appDownload.title,
      description: t.appDownload.description,
      images: getSeoImages(imageUrl, "App Download Page"),
    },
  };
}

export default function AppPage() {
  return (
    <div className="prolo-container">
      <div className="mt-70px flex min-h-[500px] w-full flex-col flex-wrap items-center justify-center">
        <AppDownload qr={false} />
      </div>
    </div>
  );
}
