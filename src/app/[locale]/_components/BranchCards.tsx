import { BranchCard } from "./components";

export default function BranchCards({
  title,
  branches,
}: {
  title: string;
  branches: { name: string; location: string; phone: string; email: string }[];
}) {
  return (
    <div id="service-centers" className="prolo-container">
      <div>
        <h4 className="section-heading">{title}</h4>
        <div className="mt-4 mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4">
          {branches.map((branch, ind) => (
            <BranchCard
              key={ind}
              title={branch.name}
              location={branch.email}
              contact={branch.phone}
              email={branch.email}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
