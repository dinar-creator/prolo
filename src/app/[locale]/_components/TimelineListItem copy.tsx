import { Icon } from "@iconify/react";

export default function TimelineListItem() {
  return (
    <li className="flex-row md:flex-col">
      <div className="upper">
        <div className="size-20">
          <Icon icon="solar:box-bold" className="size-20" />
        </div>
      </div>
      <div className="mid">
        <div className="left"></div>
        <div className="between"></div>
        <div className="right"></div>
      </div>
      <div className="lower">
        <h4 className="px-4 text-center text-xl font-medium">Your Package</h4>
      </div>
    </li>
  );
}
