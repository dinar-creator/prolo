"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroStatic from "./HeroStatic";
const HeroSlider = dynamic(() => import("../HeroSlider"), {
  ssr: false,
  loading: () => <HeroStatic />,
});

export default function HeroLazySlider() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const enable = () => {
      console.log("💡 Hero slider loaded after page ready");
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

  return show ? <HeroSlider /> : <HeroStatic />;
}
