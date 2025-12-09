import Image from "next/image";

export default function LogoRow({ logos, dir }: { logos: string[]; dir: "left" | "right" }) {
  return (
    <div className="prolo-container mt-8" dir="ltr">
      <div className="relative z-[-1] w-full">
        <div className="logo-carousel relative z-2 flex h-10 w-full items-center justify-between overflow-x-auto">
          <div
            className={`logos ${
              dir === "left" ? "logos-mid" : ""
            } flex min-w-full shrink-0 items-center justify-center gap-6 px-3`}
          >
            {logos.map((logo, ind) => (
              <Image
                key={ind}
                src={logo}
                width={30}
                height={30}
                alt="prolo-partner logo"
                className="h-10 w-auto"
              />
            ))}
          </div>
          <div
            className={`logos ${
              dir === "left" && "logos-mid"
            } flex min-w-full shrink-0 items-center justify-between gap-6 px-3`}
          >
            {logos.map((logo, ind) => (
              <Image
                key={ind}
                src={logo}
                width={30}
                height={30}
                alt="prolo-partner logo"
                className="h-10 w-auto"
              />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-3 bg-linear-to-r from-white via-transparent to-white" />
      </div>
    </div>
  );
}
