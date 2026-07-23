"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { Button } from "./components";
import { useState } from "react";
import { useLocale } from "next-intl";

function TrackingInput() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const formsUi = useTranslations("forms");
  const ctas = useTranslations("ctas");
  const locale = useLocale();

  return (
    <div className="glass relative flex w-full items-center justify-between rounded-full p-1 md:p-2">
      {/* Icon */}
      <div className="mx-2 size-4">
        <Icon icon="si:barcode-fill" className="size-4" />
      </div>
      {/* Input */}
      <input
        type="text"
        value={trackingNumber}
        onChange={e => setTrackingNumber(e.target.value)}
        placeholder={formsUi("placeholders.tracking")}
        className="grow border-none font-medium outline-none"
      />
      {/* BUTTON */}
      <Button
        text={ctas("trackShipment")}
        href={`/${locale}/tracking/${trackingNumber}`}
        className="bg-theme-blue hover:bg-blue-hover"
        // direction="forward"
        size="sm"
      />
    </div>
  );
}

export default TrackingInput;
