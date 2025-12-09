import { Timeline } from "./components";

type FlowSegement = {
  text: string;
  icon: string;
};

type FlowDiagram = {
  title?: string;
  subtitle?: string;
  flow: FlowSegement[];
  footer?: FlowSegement[];
};

type Props = {
  flowDiagram: FlowDiagram;
};

export default function FlowDiagram({ flowDiagram }: Props) {
  const { flow } = flowDiagram;
  return (
    <div className="prolo-container mb-8">
      {/* Flow Timeline*/}
      <div className="mt-8">
        <Timeline flow={flow} />
      </div>
    </div>
  );
}
