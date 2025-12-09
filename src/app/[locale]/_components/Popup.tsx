"use client";
import { useLocale, useMessages } from "next-intl";
import Button from "./Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

type PopupText = {
  title: string;
  description: string;
  image: string;
  link: {
    text: string;
    link: string;
  };
};
export default function Popup() {
  const [closePopup, setClosePopup] = useState<boolean>(true);
  const popupText = useMessages().popup as PopupText;
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("get-a-qoute")) {
      setClosePopup(true);
    }
  }, [pathname, closePopup]);

  useEffect(() => {
    setTimeout(() => {
      setClosePopup(false);
    }, 3000);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-55 ${closePopup ? "hidden" : "flex"} h-full w-full items-center justify-center bg-black/70 p-4`}
    >
      <div className="relative grid h-[450px] w-full max-w-[500px] grid-cols-1 items-center overflow-hidden rounded-2xl bg-white sm:h-[350px] sm:grid-cols-2">
        {/* Close Button */}
        <button
          aria-label="Close"
          className="bg-theme-blue hover:bg-blue-hover absolute top-4 right-4 flex size-7 cursor-pointer items-center justify-center rounded-full p-1 text-white"
          onClick={() => setClosePopup(true)}
        >
          <Icon icon="hugeicons:cancel-01" className="size-6" />
        </button>
        {/* Left */}
        <div className="mt-7 p-4 sm:mt-0">
          <h2 className="text-xl font-medium">{popupText.title}</h2>
          <p className="text-sm sm:mt-4">{popupText.description}</p>
          <Button
            href={`/${locale + popupText.link.link}`}
            text={popupText.link.text}
            className="bg-theme-blue hover:bg-blue-hover mt-8 text-white"
            direction="forward"
            size="sm"
          />
        </div>
        {/* Right */}
        <div className="h-full w-full">
          <Image
            src={popupText.image}
            alt="Get A Qoute Image"
            className="h-full w-full object-cover"
            width={250}
            height={350}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
