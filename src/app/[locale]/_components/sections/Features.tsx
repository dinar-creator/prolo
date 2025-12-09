import { getMessages } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { FlowDiagram } from "../components";
export default async function Features() {
  const features = await getTranslations("homepage.features");
  const flowDiagram = (await getMessages()).homepage.features.flowDiagram;

  return (
    <section className="section-spacing">
      <div className="prolo-container">
        <h2 className="section-heading mx-auto my-4 text-center sm:my-6 md:mb-8">
          {features("title")}
        </h2>
        <FlowDiagram flowDiagram={flowDiagram} />
      </div>
    </section>
  );
}
