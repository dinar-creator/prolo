import Image from "next/image";

export default function HeroStatic() {
  return (
    <div className="relative h-full w-full">
      <Image
        src={"/images/hero/hero-one.png"}
        alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
        className="relative z-[-1] h-full w-full object-cover"
        fill
        loading="lazy"
        priority={false}
        fetchPriority="low"
        decoding="async"
        unoptimized
      />

      {/* <div className="absolute top-15 right-4 w-25 md:top-18 md:w-30">
        <Image src={"/logo-white.svg"} alt="" width={160} height={80} className="h-auto w-full" />
      </div> */}
      <div className="absolute inset-0 z-2 bg-black/10"></div>
    </div>
  );
}
