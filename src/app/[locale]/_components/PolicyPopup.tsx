"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLocale } from "next-intl";
export default function PolicyPopup({
  className,
  // children,
}: {
  className?: string;
  // children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const btnText = locale === "ar" ? "سياسة الشكاوى والتعويضات" : "Complaints & Compensation Policy";
  const pdfDoc =
    locale === "ar"
      ? "/pdfs/complaints-compensation-policy-ar.pdf"
      : "/pdfs/complaints-compensation-policy-en.pdf";

  return (
    <div>
      <span
        className={`w-full cursor-pointer hover:underline ${className}`}
        onClick={() => setOpen(true)}
      >
        <span>{btnText}</span>
      </span>

      {open && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-white">
          <button
            className="absolute top-6 right-6 cursor-pointer text-black"
            onClick={() => setOpen(false)}
            style={{ float: "right" }}
          >
            <Icon
              icon={"hugeicons:multiplication-sign-square"}
              className="size-8 md:size-10"
            ></Icon>
          </button>
          <iframe className="mx-4 my-8 h-[70%] w-full rounded-xl" src={pdfDoc} />
        </div>
      )}
    </div>
  );
}
