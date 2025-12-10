"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TypebotWidget = dynamic(() => import("../TypebotWidget"), {
  ssr: false,
});

export default function TypebotWidgetLazy() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const enable = () => {
      console.log("💡 Typebot Widget loaded after page ready");
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

  return show ? <TypebotWidget /> : null;
}
