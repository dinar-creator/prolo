import { NumberAnimation } from "./components";
import { Icon } from "@iconify/react";

type Props = {
  icon: string;
  num: number;
  title: string;
  prefix: string;
};

export default function NumberBox({ icon, num, title, prefix }: Props) {
  return (
    <div className="bg-base1 flex items-center gap-5 rounded-xl p-8">
      {/* Icon */}
      <div className="size-10">
        <Icon icon={icon} className="size-10" />
      </div>
      {/* Number & Subheading */}
      <div>
        <div className="flex gap-1 text-4xl font-bold">
          <NumberAnimation num={num} />
          {prefix}
        </div>
        <p className="text-base font-medium text-black/70">{title}</p>
      </div>
    </div>
  );
}
