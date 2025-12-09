"use client";
import { useRouter } from "next/navigation";
import { ButtonClient } from "./components";
import type { ApiError, ReportFile } from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
type Props = {
  text: string;
  id: string | undefined;
};
export default function PrintLableButton({ text, id }: Props) {
  const locale = useLocale();
  const loadingTxt = locale === "en" ? "Printing..." : "جارٍ الطباعة...";
  const router = useRouter();
  const [loadingText, setLoadingText] = useState<string>("");

  // Printing label
  async function printShipmentLabel() {
    if (!id) {
      return alert("Reference Number Not Found");
    }

    try {
      setLoadingText(loadingTxt);
      const result: ApiError | ReportFile = await fetch("/api/print-label", {
        method: "POST",
        body: JSON.stringify({ id }),
      }).then(res => res.json());

      if ("error" in result) {
        console.log(result.error);
        alert("No lable Found");
      } else {
        router.push(result.url);
      }
    } catch (error) {
      console.log("Error in printing label", error);
      alert("No lable Found");
    }
    setLoadingText("");
  }

  useEffect(() => {
    if (!id) {
      router.push(`/${locale}/create-shipment`);
    }
  }, [id, locale, router]);

  return (
    <ButtonClient
      onClick={printShipmentLabel}
      text={loadingText || text}
      className="bg-theme-blue hover:bg-blue-hover rounded-xl px-4 py-2 font-medium text-white"
    />
  );
}
