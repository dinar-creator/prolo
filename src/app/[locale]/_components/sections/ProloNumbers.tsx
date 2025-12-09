import { getMessages, getTranslations } from "next-intl/server";
import { NumberBox } from "../components";

interface ProloNumber {
  icon: string;
  title: string;
  prefix: string;
  num: number;
}

export default async function ProloNumbers() {
  const numbersText = await getTranslations("homepage.numbers");
  const messages = await getMessages();
  const numbers = messages.cards.numbers.cards as ProloNumber[];
  return (
    <section className="my-20">
      <h2 className="section-heading mx-auto mb-10 text-center text-white">
        {numbersText("title")}
      </h2>

      <div className="prolo-container grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {numbers.map(num => (
          <NumberBox
            key={num.icon}
            icon={num.icon}
            title={num.title}
            prefix={num.prefix}
            num={num.num}
          />
        ))}
      </div>
    </section>
  );
}
