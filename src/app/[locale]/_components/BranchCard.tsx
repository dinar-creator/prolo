import Link from "next/link";

type BranchCardProps = {
  title: string;
  location: string;
  contact: string;
  email: string;
};
export default function BranchCard({ title, location, contact, email }: BranchCardProps) {
  return (
    <div className="bg-base1 rounded-xl p-6">
      <h5 className="text-base font-medium">📍 {title}</h5>
      <p className="mt-2 hidden text-sm">{location}</p>
      <ul className="mt-4">
        <li>
          <Link dir="ltr" href={`tel:${contact}`} className="hover:underline">
            📞 {contact}
          </Link>{" "}
        </li>
        <li>
          <Link dir="ltr" href={`mailto:${email}`} className="hover:underline">
            📧 {email}
          </Link>
        </li>
      </ul>
    </div>
  );
}
