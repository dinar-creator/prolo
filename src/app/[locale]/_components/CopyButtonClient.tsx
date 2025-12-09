"use client";

import { useTranslations } from "next-intl";

export default function CopyButtonClient({ value }: { value: string }) {
  const ctas = useTranslations("ctas");
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      alert("Tracking ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-md bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
    >
      {ctas("copy")}
    </button>
  );
}
