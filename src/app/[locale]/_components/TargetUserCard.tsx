import { Icon } from "@iconify/react";

export default function TargetUserCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="bg-base1 border-base2 hover:bg-white-hove relative flex flex-col items-center justify-start overflow-hidden rounded-md p-6">
      {/* Icon */}
      <div className="flex size-[50px] items-center justify-center rounded-full bg-white">
        <Icon icon={icon} className="size-6" />
      </div>

      <h5 className="mt-3 text-center text-base font-medium sm:text-lg md:text-xl">{title}</h5>
    </div>
  );
}
