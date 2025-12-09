export default function ProcessCard({ ind, text }: { ind: number; text: string }) {
  return (
    <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden rounded-xl bg-white p-4 md:min-h-[180px] md:items-start md:p-5">
      <span className="absolute top-0 left-0 z-1 block text-[100px]/[90px] font-black text-gray-400/10">
        {ind + 1}
      </span>
      <div>
        <h6 className="text-lg font-medium lg:text-xl">{text}</h6>
      </div>
    </div>
  );
}
