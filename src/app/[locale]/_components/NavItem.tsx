"use client";

export default function NavItem({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className="group text-theme-white hover:text-white-hover full static h-10 cursor-pointer text-base/[40px] transition duration-300">
      {text}
      <div className="bg-theme-blue/90 absolute top-10 left-0 hidden h-auto w-full rounded-2xl p-4 shadow-xl group-hover:block">
        {children}
      </div>
    </div>
  );
}
