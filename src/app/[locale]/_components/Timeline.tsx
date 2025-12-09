import TimelineListItem from "./TimelineListItem";

type FlowSegement = {
  text: string;
  icon: string;
};

type Props = {
  flow: FlowSegement[];
};
export default function Timeline({ flow }: Props) {
  return (
    <div className="timeline-list">
      <ul className="flex-col md:flex-row">
        {flow.map((step, ind) => (
          <TimelineListItem key={ind} icon={step.icon} text={step.text} />
        ))}
      </ul>
    </div>
  );
}
