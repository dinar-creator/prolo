"use client";
import { Icon } from "@iconify/react";
import Button from "./Button";
import { useTranslations } from "use-intl";

type IndutsryCardProps = {
  icon: string;
  title: string;
  description: string;
  link: string;
};

export default function IndutsryCard({
  icon,
  title,
  description,
  link,
}: IndutsryCardProps) {
  const ctas = useTranslations("ctas");
  return (
    <div className="p-6 bg-theme-white hover:bg-white-hove rounded-md relative overflow-hidden min-h-[400px] flex flex-col justify-between">
      <div className="size-[50px] rounded-full bg-base1 flex items-center justify-center">
        <Icon icon={icon} className="size-6" />
      </div>

      <div className="mt-[60px] min-h-[250px] flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="mt-1">{description}</p>
        </div>
        <Button
          href={link}
          text={ctas("learnMore")}
          direction="forward"
          className="border mt-6 hover:bg-theme-blue hover:text-white hover:border-theme-blue"
        />
      </div>
    </div>
  );
}
