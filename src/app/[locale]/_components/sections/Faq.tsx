import { getMessages, getTranslations } from "next-intl/server";
import { TitleBadge, FaqItem } from "../components";

type Faq = {
  question: string;
  answer: string;
};

export default async function Faq() {
  const messages = await getMessages();
  const faqs = messages.faqs.items as Faq[];

  const faqText = await getTranslations("homepage.faqs.pageTitle");

  return (
    <section className="section-spacing">
      <div className="prolo-container pt-20" id="faqs">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-4">
          {/* Left */}
          <div className="mb-6 flex flex-col items-center justify-center">
            <TitleBadge title={faqText("title")} />
            <h2 className="section-heading mx-auto w-fit text-center text-2xl">
              {faqText("heading")}
            </h2>
          </div>
          {/* Right */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, ind) => (
              <FaqItem key={ind} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
