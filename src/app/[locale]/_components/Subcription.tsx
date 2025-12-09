import { getTranslations } from "next-intl/server";
import { SubscriptionForm } from "./components";
export default async function Subscription() {
  const ctaText = await getTranslations("footer.cta");

  return (
    <div className="">
      <div className="">
        <h4 className="mb-2 text-lg font-bold">{ctaText("title")}</h4>
        <div className="w-full">
          <SubscriptionForm />
        </div>
      </div>
    </div>
  );
}
