"use client";

import { useTranslations } from "next-intl";
import { Input } from "./components";
import { useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

function TrackingPageInput() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const t = useTranslations("forms.fields.tracking");
  const ctas = useTranslations("ctas");
  const locale = useLocale();

  return (
    <div className="prolo-container flex flex-col items-start gap-2 sm:flex-row sm:items-end">
      <div className="w-full grow sm:w-auto">
        <Input
          icon="si:barcode-fill"
          label={t("label")}
          placeholder={t("placeholder")}
          id="tracking"
          onChange={e => setTrackingNumber(e.target.value)}
        />
      </div>
      {/* BUTTON */}
      <Link
        href={`/${locale}/tracking/${trackingNumber}`}
        className="bg-theme-blue hover:bg-blue-hover rounded-xl border-2 border-transparent px-3 py-2 text-white"
      >
        {ctas("trackShipment")}
      </Link>
    </div>
  );
}

export default TrackingPageInput;
