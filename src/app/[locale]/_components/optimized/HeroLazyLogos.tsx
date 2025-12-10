"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const HeroLogos = dynamic(() => import("../HeroLogos"), {
  ssr: false,
  loading: () => null,
});

export default function HeroLazyLogos() {
  const [show, setShow] = useState(false);
  const t = useTranslations("homepage");

  useEffect(() => {
    const enable = () => {
      console.log("💡 Hero Logos loaded after page ready");
      setShow(true);
    };

    // if page already loaded BEFORE this component mounted
    if (document.readyState === "complete") {
      enable();
    } else {
      window.addEventListener("load", enable);
    }

    return () => window.removeEventListener("load", enable);
  }, []);

  return show ? (
    <HeroLogos
      trustedBy={t("hero.trustedBy")}
      hundredPlus={t("hero.100Plus")}
      businesses={t("hero.businesses")}
    />
  ) : null;
}
