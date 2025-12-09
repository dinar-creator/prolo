import TitleBadge from "../TitleBadge";
import Image from "next/image";

type OverviewProps = {
  overview: {
    title: string;
    heading?: string;
    description: string | string[];
    features?: {
      title: string;
      description?: string;
      features: string[];
    };
    image: string;
  };
};
export default function Overview({ overview }: OverviewProps) {
  const { title, heading, description, features, image } = overview;
  return (
    <section className="prolo-container mt-6">
      <div>
        <TitleBadge title={title} />
        {heading && <h4 className="section-heading font-medium">{heading}</h4>}
        {Array.isArray(description) ? (
          <div className="mt-2">
            {description.map((des, ind) => (
              <p key={ind}>{des}</p>
            ))}
          </div>
        ) : (
          <div className="mt-2">
            <p>{description}</p>
          </div>
        )}
      </div>
      <div className="mt-4 grid w-full grid-cols-1 items-center gap-4 md:grid-cols-1 md:gap-8">
        {features && (
          <div className="w-full">
            <h4 className="text-xl font-bold">{features.title}</h4>
            {features?.description && <p className="mt-4 mb-6">{features.description}</p>}
            <ul className="relative">
              {features.features.map((feature, ind) => (
                <li key={ind} className="relative my-2 flex items-center">
                  <span className="size-2 rounded-full bg-black"></span>
                  <span className="px-5">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mdjustify-end hidden h-[300px] w-full items-center justify-center bg-transparent">
          <Image
            src={image}
            width={100}
            height={100}
            alt={heading || "Image alt"}
            className="h-full w-auto rounded-2xl object-contain"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
