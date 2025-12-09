"use client";
import { Icon } from "@iconify/react";
import { Button } from "./components";
import { useTranslations } from "use-intl";

function SubscriptionInput() {
  const btnText = useTranslations("ctas");
  const placeholder = useTranslations("forms");

  return (
    <div>
      <div className="w-full p-2 sm:p-3 glass rounded-full flex items-center justify-between gap-4">
        {/* Icon */}
        <Icon icon="iconoir:mail" className="size-4 sm:size-6 md:size-8 ml-4" />
        {/* Input */}
        <input
          type="email"
          placeholder={placeholder("placeholders.email")}
          className="grow border-none outline-none text-base md:text-[18px] font-medium"
        />
        {/* BUTTON */}
        <Button
          text={btnText("subscribe")}
          href={``}
          className="border hover:bg-blue-hover hidden sm:flex"
          direction="forward"
        />
      </div>
      <Button
        text={btnText("subscribe")}
        href={``}
        className="border hover:bg-blue-hover sm:hidden mt-2"
        direction="forward"
      />
    </div>
  );
}

export default SubscriptionInput;
