type Testimony = {
  person: {
    name: string;
    title: string;
  };
  text: string;
};

export default function TestimonialCard({ person: { name, title }, text }: Testimony) {
  return (
    <div className="bg-base1 flex h-[270px] flex-col gap-4 rounded-xl p-6 md:h-[280px]">
      <div className="flex w-full gap-2">
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-black/70 capitalize">{title}</p>
        </div>
      </div>

      {/* Para */}
      <p>{text}</p>
    </div>
  );
}
