import localFont from "next/font/local";

const satoshi = localFont({
  src: "./satoshi_variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const tajawal = localFont({
  src: [
    {
      path: "./tajawal/regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./tajawal/medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./tajawal/bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./tajawal/black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-tajawal",
  display: "swap",
});

const NNA = localFont({
  src: "./NotoNaskhArabic-SemiBold.ttf",
  variable: "--font-nna",
  display: "swap",
});

export { satoshi, tajawal, NNA };
