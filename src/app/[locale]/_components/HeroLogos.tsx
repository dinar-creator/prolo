import { HeroLogo } from "./components";
type Props = {
  trustedBy: string;
  hundredPlus: string;
  businesses: string;
};

import { trustLogos } from "../logos/logos";

export default function HeroLogos({ trustedBy, hundredPlus, businesses }: Props) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="mr-0 lg:mr-[30px]">{trustedBy}</p>

      <div className="flex gap-4">
        <div className="items-center] ml-[30px] flex">
          {trustLogos.map((logo, ind) => (
            <HeroLogo key={ind} image={logo} alt="Company Logo" />
          ))}
        </div>
        <p className="mr-[30px] hidden flex-col text-lg/tight font-medium">
          <span className="text-xl font-bold">{hundredPlus}</span>
          {businesses}
        </p>
      </div>
    </div>
  );
}
