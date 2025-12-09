// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";

// SEO for Create Shipment Page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.createShipmentPage.image;

  return {
    title: t.createShipmentPage.title,
    description: t.createShipmentPage.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}/create-shipment`,
      languages: {
        en: `${SITE_URL}/en/create-shipment`,
        ar: `${SITE_URL}/ar/create-shipment`,
      },
    },

    openGraph: {
      title: t.createShipmentPage.title,
      description: t.createShipmentPage.description,
      url: `${SITE_URL}/${locale}/create-shipment`,
      images: getSeoImages(imageUrl, "Create Shipment Page"),
    },

    twitter: {
      card: "summary_large_image",
      title: t.createShipmentPage.title,
      description: t.createShipmentPage.description,
      images: getSeoImages(imageUrl, "Create Shipment Page"),
    },
  };
}
export default function CreateShipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
