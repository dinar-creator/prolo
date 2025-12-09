import { getMessages, getTranslations } from "next-intl/server";
import { SectionTitle, IndutsryCard } from "../components";
import { getLocale } from "next-intl/server";

type Industry = {
  icon: string;
  name: string;
  description: string;
  link: string;
};

export default async function Industries() {
  const industriesText = await getTranslations("homepage.industries.pageTitle");

  const locale = await getLocale();
  const messages = await getMessages();
  const industries = messages.cards.industries.cards;

  return (
    <section className="bg-base1 section-spacing my-8 py-8">
      {/* Section Title */}
      <div className="prolo-container mb-6">
        <SectionTitle
          title={industriesText("title")}
          heading={industriesText("heading")}
          description={industriesText("description")}
        />
      </div>

      {/* Cards */}

      <div className="prolo-container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {industries.map((industry: Industry) => (
            <IndutsryCard
              key={industry.link}
              icon={industry.icon}
              title={industry.name}
              description={industry.description}
              link={"/" + locale + industry.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
