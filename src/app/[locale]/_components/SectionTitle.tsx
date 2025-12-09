import { TitleBadge, Button } from "./components";

type Props = {
  title?: string;
  heading: string;
  description?: string;
  link?: string;
  linkText?: string;
};

export default function SectionTitle({ title, heading, description, link, linkText }: Props) {
  return (
    <div>
      {/* Title & Description */}
      <div>
        {/* Title */}
        <div>
          {title && <TitleBadge title={title} />}
          <h2 className="section-heading font-medium">{heading}</h2>
        </div>
        {/* Description */}
        <div className="mt-2 flex w-full flex-col sm:block sm:w-[70%] lg:w-[70%]">
          {description && <p className="text-base">{description}</p>}
          {link && (
            <div className="mt-4">
              <Button
                href={link}
                text={linkText || "Learn More"}
                direction="forward"
                className="hover:bg-theme-blue border hover:text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
