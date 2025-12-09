export default function TitleBadge({ title }: { title: string }) {
  return (
    <span className="bg-theme-blue text-theme-white mb-1 block hidden w-fit rounded-md px-3 py-1 text-xs uppercase">
      {title}
    </span>
  );
}
