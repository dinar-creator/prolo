"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LazyPopup = dynamic(() => import("../PopupContent"), {
  ssr: false,
});

export default function PopupLazy() {
  const [show, setShow] = useState(false);

  function closePopup() {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      closePopup();
    }, 8000); // Wait 8 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return show ? <LazyPopup /> : null;
}
