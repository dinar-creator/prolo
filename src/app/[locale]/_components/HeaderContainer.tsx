"use client";
import { useScrollDirection } from "../_hooks/useScrollDirection";

function HeaderContainer({ children }: { children: React.ReactNode }) {
  const scrollDirection = useScrollDirection();

  return (
    <div
      id="header"
      className={`fixed ${scrollDirection === "down" ? "top-[-100%]" : "top-0"} left-0 z-50 w-full transition-all duration-700`}
    >
      {children}
    </div>
  );
}

export default HeaderContainer;
