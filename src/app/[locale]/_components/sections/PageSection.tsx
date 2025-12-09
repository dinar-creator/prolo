import Image from "next/image";
import { TitleBadge } from "../components";

type PageSection = {
  title?: string;
  heading: string;
  image?: string;
  content: string[];
  ind?: number;
};

function PageSection({ title, heading, content, image, ind = 1 }: PageSection) {
  return (
    <div className="prolo-container flex flex-col">
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-1">
        <div className={`w-full`}>
          <div>
            {title && <TitleBadge title={title} />}
            <h4 className="section-heading mt-2 mb-4 text-2xl font-medium">{heading}</h4>
            <div className="mb-4">
              {content.map((con, i) => (
                <p key={i}>{con}</p>
              ))}
            </div>
          </div>
        </div>
        {image && (
          <div
            className={`hidden aspect-square h-[300px] bg-transparent ${ind % 2 === 1 ? "md:order-2" : "md:order-1"} items-center justify-center`}
          >
            <Image
              src={image}
              width={100}
              height={100}
              alt={"image which describes the" + title}
              className="h-full w-full rounded-2xl object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PageSection;
