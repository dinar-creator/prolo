import TrackingPageInput from "../_components/TrackingPageInput";
// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";

// SEO for Tracking Page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.trackingPage.image;

  return {
    title: t.trackingPage.title,
    description: t.trackingPage.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}/tracking`,
      languages: {
        en: `${SITE_URL}/en/tracking`,
        ar: `${SITE_URL}/ar/tracking`,
      },
    },

    openGraph: {
      title: t.trackingPage.title,
      description: t.trackingPage.description,
      url: `${SITE_URL}/${locale}/tracking`,
      images: getSeoImages(imageUrl, "Track Shipment Page"),
    },

    twitter: {
      card: "summary_large_image",
      title: t.trackingPage.title,
      description: t.trackingPage.description,
      images: getSeoImages(imageUrl, "Track Shipment Page"),
    },
  };
}

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[70px]">
      <TrackingPageInput />
      {children}
    </div>
  );
}
