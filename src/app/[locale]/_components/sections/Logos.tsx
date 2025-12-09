import { LogoRow } from "../components";

import { rowOneLogos, rowTwoLogos } from "../../logos/logos";
import { getTranslations } from "next-intl/server";

export default async function Logos() {
  const logosText = await getTranslations("homepage.logos");

  return (
    <section className="section-spacing">
      <div className="prolo-container">
        <h2 className="section-heading mb-4 sm:mb-6 md:mb-8">{logosText("title")}</h2>
      </div>
      {/* Row 1 */}
      <LogoRow logos={rowOneLogos} dir="right" />

      {/* Row 2 */}
      <LogoRow logos={rowTwoLogos} dir="left" />
    </section>
  );
}
