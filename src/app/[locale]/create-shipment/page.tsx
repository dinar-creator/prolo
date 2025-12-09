import { getLocale, getMessages } from "next-intl/server";
import { PageHeader, CreateShipmentForm } from "../_components/components";
import Link from "next/link";

export type CreateShipmentPageMessages = {
  pageTitle: {
    heading: string;
    description: string;
    icon?: string;
  };
  helpPara: {
    first: string;
    phone: string;
    mid: string;
    ourSupport: string;
    last: string;
  };
};

export default async function createShipmentPage() {
  const locale = await getLocale();
  const messages = (await getMessages()).createShipmentPage as CreateShipmentPageMessages;

  return (
    <div>
      <PageHeader
        heading={messages.pageTitle.heading}
        description={messages.pageTitle.description}
        image="/icons/getAQoute.png"
        icon={messages.pageTitle.icon}
      />
      <div className="prolo-container">
        <CreateShipmentForm />
      </div>

      {/* Help Paragraph */}
      <div className="prolo-container">
        <p className="my-6 text-sm">
          {messages.helpPara.first}{" "}
          <Link
            href={"tel:8003044448"}
            className="hover:text-shadow-blue-hover text-theme-blue underline"
            dir="ltr"
          >
            {messages.helpPara.phone}
          </Link>{" "}
          {messages.helpPara.mid}{" "}
          <Link
            href={"/" + locale + "/contact"}
            className="hover:text-shadow-blue-hover text-theme-blue underline"
          >
            {messages.helpPara.ourSupport}
          </Link>{" "}
          {messages.helpPara.last}
        </p>
      </div>
    </div>
  );
}
