import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLocale } from "next-intl";

type Props = {
  text: string;
  href: string;
  className?: string;
  direction?: "forward" | "backward";
  size?: "sm" | "md" | "lg";
};
export default function Button({ text, href, className, direction, size = "lg" }: Props) {
  const locale = useLocale();
  return (
    <Link
      href={href}
      className={`flex w-fit items-center ${
        size && size === "sm" ? "px-2 py-1 text-sm" : "px-4 py-2 md:text-sm xl:text-base"
      } rounded-full font-medium transition duration-300 ${className && className}`}
    >
      {text}
      {direction && (
        <Icon
          icon={
            direction === "forward"
              ? "hugeicons:arrow-up-right-02"
              : "hugeicons:arrow-down-right-02"
          }
          className={`mx-2 transition-transform ${
            direction && direction === "forward" ? `${locale}f` : `${locale}b`
          } duration-300`}
        />
      )}
    </Link>
  );
}
