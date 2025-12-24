import { satoshi, tajawal } from "../fonts/fonts";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header, Footer } from "./_components/components"; // excl: Popup
import HeaderContainer from "./_components/HeaderContainer";
import TypebotWidgetLazy from "./_components/optimized/TypebotLazy";

import PopupLazy from "./_components/optimized/PopupLazy";
import ResposiveHeader from "./_components/Header/ResponsiveHeader";

import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";
import Script from "next/script";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const fontClass = isArabic ? tajawal.className : satoshi.className + " tracking-tight";

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"} className={fontClass + " scroll-smooth"}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WR5XFFMN');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}
      (window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '867005282643889');
      fbq('track', 'PageView');
    `}
        </Script>
        {/* End Meta Pixel Code */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WR5XFFMN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Meta Pixel (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=867005282643889&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel (noscript) */}

        <NextIntlClientProvider>
          <HeaderContainer>
            <Header />
            <ResposiveHeader />
          </HeaderContainer>
          <main>{children}</main>
          <Footer />
          <PopupLazy />
          <TypebotWidgetLazy />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
