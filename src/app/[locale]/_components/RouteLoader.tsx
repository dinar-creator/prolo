"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";

export default function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    NProgress.set(0.4); // Optional: start at 40%
    NProgress.inc(); // Optional: trickle effect

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // Adjust duration as needed

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
