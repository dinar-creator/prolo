// import ResponsiveContainers from "./_components/ResponsiveContainers";
import {
  Hero,
  Services,
  Features,
  Industries,
  ProloNumbers,
  Testimonials,
  Logos,
  Blog,
  Faq,
} from "./_components/sections/sections";

import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";

// SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.homepage.image;

  return {
    title: t.homepage.title,
    description: t.homepage.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
      },
    },

    openGraph: {
      title: t.homepage.title,
      description: t.homepage.description,
      url: `${SITE_URL}/${locale}`,
      images: getSeoImages(imageUrl, "Prolo Professional Logistics"),
    },

    twitter: {
      card: "Prolo Professional Logistics",
      title: t.homepage.title,
      description: t.homepage.description,
      images: getSeoImages(imageUrl, "Prolo Professional Logistics"),
    },
  };
}

export default function HomePage() {
  return (
    <>
      {/* <ResponsiveContainers /> */}
      <Hero />
      <Services />
      <Features />
      <Industries />
      <ProloNumbers />
      <Testimonials />
      <Logos />
      <Blog />
      <Faq />
    </>
  );
}
