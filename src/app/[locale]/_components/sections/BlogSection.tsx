import Image from "next/image";

type PageSection = {
  heading: string;
  image?: string;
  content: string[];
};

function BlogSection({ heading, content, image }: PageSection) {
  return (
    <div className="prolo-container my-6 flex flex-col px-0">
      <div className="w-full">
        <div className={"w-full"}>
          <div>
            <h4 className="mb-3 text-2xl font-medium">{heading}</h4>
            <div className="mb-3">
              {content.map((con, i) => (
                <p key={i}>{con}</p>
              ))}
            </div>
          </div>
        </div>
        {image && (
          <div className="aspect-2/1 w-full">
            <Image
              src={image}
              width={100}
              height={100}
              alt={`Image which describes the ${heading.toLowerCase()}`}
              className="h-full w-full rounded-md object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogSection;
