type ChallengeVsSolutionProps = {
  industryChallengesVsSolutions: {
    title: {
      challenge: string;
      solution: string;
    };
    list: {
      challenge: string;
      solution: string;
    }[];
  };
};

function ChallengeVsSolution({ industryChallengesVsSolutions }: ChallengeVsSolutionProps) {
  const { title, list } = industryChallengesVsSolutions;

  return (
    <div className="prolo-container my-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <div className="rounded-2xl bg-[#FFD9E8] p-4 md:p-8">
          <h4 className="text-xl font-medium">{title.challenge}</h4>

          <ul className="mt-4 list-decimal p-4">
            {list.map((item, ind) => (
              <li key={ind} className="my-2">
                {item.challenge}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-[#F1DCFF] p-4 md:p-8">
          <h4 className="text-2xl font-medium">{title.solution}</h4>

          <ul className="mt-4 list-decimal p-4">
            {list.map((item, ind) => (
              <li key={ind} className="my-2">
                {item.solution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChallengeVsSolution;
