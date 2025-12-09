import { Icon } from "@iconify/react";
import Image from "next/image";

type Feature = {
  text: string;
  image?: string;
  icon?: string;
};

type Features = { features: Feature[] };
export default function FeaturesGrid({ features }: Features) {
  // const colors: [string, string, string] = ["#E5C7D0", "#C3E4F5", "#FFF6DD"];

  return (
    <section className="prolo-container max-w-[700px]">
      {/* Features Grid */}
      <div className="grid w-full grid-cols-3 gap-1 sm:gap-2 md:gap-4">
        {features.map((feature, ind) => (
          <div
            key={ind}
            className={`relative flex flex-col items-center justify-start rounded-md bg-transparent`}
          >
            {feature.image && feature.image && (
              <Image
                src={feature.image}
                alt={`Image which represents ${feature.text}`}
                width={100}
                height={100}
                className="aspect-square w-1/3"
              />
            )}

            {!feature.image && feature.icon && (
              <div className="flex size-[30%] w-full items-center justify-center">
                <Icon icon={feature.icon} className="h-full text-black" />
              </div>
            )}

            <p className="relative mt-4 h-fit w-full text-center text-sm/tight font-medium text-black sm:text-lg/tight">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
