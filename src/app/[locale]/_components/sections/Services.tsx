"use client";

import { useState } from "react";
import { useMessages } from "next-intl";
import { ResponsiveServices } from "./sections";

import { IndividualServices, CommercialSectorServices, SectionTitle } from "../components";
import { useTranslations } from "next-intl";

function Services() {
  // Individual Services
  // Commercial Sector Services

  // Translations
  const servicesText = useTranslations("homepage.services");
  const messages = useMessages();
  const individualServices = JSON.parse(JSON.stringify(messages.cards.services.individualServices));
  const commercialSectorServices = JSON.parse(
    JSON.stringify(messages.cards.services.commercialSectorServices)
  );

  const [hovered, setHovered] = useState<"left" | "right" | "none">("none");

  return (
    <section id="services" className="section-spacing">
      {/* Section Title */}
      <div className="prolo-container mb-6">
        <SectionTitle
          title={servicesText("pageTitle.title")}
          heading={servicesText("pageTitle.heading")}
          description={servicesText("pageTitle.description")}
        />
      </div>

      {/* Desktop Section */}
      <div className="prolo-container hidden lg:block">
        {/* Services Boxes */}
        <div
          className="relative z-4 flex w-full flex-wrap justify-between"
          onMouseLeave={() => setHovered("none")}
        >
          {/* Individual Services */}
          <IndividualServices
            hovered={hovered}
            setHovered={setHovered}
            title={servicesText("servicesCategoryNames.individualServices")}
            services={individualServices}
          />
          {/* Commercial Sector Services */}
          <CommercialSectorServices
            hovered={hovered}
            setHovered={setHovered}
            title={servicesText("servicesCategoryNames.commercialSectorServices")}
            services={commercialSectorServices}
          />
        </div>
      </div>

      {/* Mobile Services Section */}
      <ResponsiveServices
        commercialSectorServices={commercialSectorServices}
        individualServices={individualServices}
      />
    </section>
  );
}

export default Services;
