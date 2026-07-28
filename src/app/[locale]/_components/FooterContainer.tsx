"use client";

import { usePathname } from "next/navigation";

type Props = {
  defaultFooter: React.ReactNode;
  marketplaceFooter: React.ReactNode;
};

export default function FooterContainer({ defaultFooter, marketplaceFooter }: Props) {
  const pathname = usePathname();
  const isMarketplace = pathname?.includes("/marketplace");

  return isMarketplace ? marketplaceFooter : defaultFooter;
}