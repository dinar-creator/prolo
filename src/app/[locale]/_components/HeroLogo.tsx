import Image from "next/image";

type Props = {
  image: string;
  alt?: string;
  className?: string;
};

export default function HeroLogo({ image, alt, className }: Props) {
  return (
    <div
      className={`glass relative ml-[-30px] flex size-[60px] items-center justify-center rounded-full bg-white/50 ${className} cursor-pointer shadow-2xl transition-all duration-200 hover:-translate-y-10`}
    >
      <Image
        src={image}
        className="size-10"
        width={32}
        height={32}
        alt={alt || "Prolo Logistics Partner Company Logo"}
        loading="lazy"
      />
    </div>
  );
}
