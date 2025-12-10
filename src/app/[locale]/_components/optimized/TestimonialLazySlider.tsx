"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

const TestimonialSlider = dynamic(() => import("../TestimonialSlider"), {
  ssr: false,
  loading: () => (
    <div className="flex h-10 w-full items-center justify-center">
      <Icon icon={"line-md:loading-twotone-loop"} className="size-5" />
    </div>
  ),
});

export default function TestimonialLazySlider() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const enable = () => {
      console.log("💡 Testimonial slider loaded after page ready");
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
    <TestimonialSlider />
  ) : (
    <div className="flex h-10 w-full items-center justify-center">
      <Icon icon={"line-md:loading-twotone-loop"} className="size-5" />
    </div>
  );
}
