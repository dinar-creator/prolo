"use client";
import { useLocale } from "next-intl";

export default function PolicyPdf() {
  const pdfDoc =
    useLocale() === "ar"
      ? "/pdfs/complaints-compensation-policy-ar.pdf"
      : "/pdfs/complaints-compensation-policy-en.pdf";

  return (
    <div className="h-full w-full">
      <iframe className="h-full w-full rounded-xl" src={pdfDoc} />
    </div>
  );
}
