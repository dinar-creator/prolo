// components/Typebot.tsx
"use client"; // if using Next.js 13+ with app directory

import Script from "next/script";

export default function TypebotWidget() {
  return (
    <Script
      id="typebot"
      strategy="afterInteractive"
      type="module"
      dangerouslySetInnerHTML={{
        __html: `
          import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2.41/dist/web.js';
          Typebot.initBubble({
            typebot: "prolo-web-07y7cum",
            apiHost: "https://unibot-viewer.prod.unirsal.com",
            theme: {
              button: { backgroundColor: "#0042DA" },
              chatWindow: { backgroundColor: "#fff" },
            },
          });
        `,
      }}
    />
  );
}
