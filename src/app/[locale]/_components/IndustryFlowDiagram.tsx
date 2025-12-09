import Image from "next/image";

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

export default function IndustryFlowDiagram({ flowDiagram }: Props) {
  const { title, subtitle, flow, footer } = flowDiagram;
  return (
    <div className="prolo-container">
      {/* Title */}
      {title && <h4 className="hidden text-center text-2xl font-medium">{title}</h4>}
      {/* Subtitle */}
      {subtitle && <h5 className="mt-2 font-bold">{subtitle}</h5>}
      {/* Flow Timeline*/}
      <div className="my-4">
        <ul className="relative">
          {flow.map((item, ind) => (
            <li key={ind} className="relative my-2 flex items-center">
              <span className="size-2 rounded-full bg-black"></span>
              <span className="px-5">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* line */}
      {footer && (
        <div className="mx-auto grid max-w-[700px] grid-cols-2 items-center justify-center gap-6 md:grid-cols-3">
          {footer?.map((item, ind) => (
            <div key={ind} className="flex gap-1 sm:gap-2 md:gap-4">
              <div className="flex size-10 shrink-0">
                <Image
                  src={item.icon}
                  alt={item.text}
                  height={40}
                  width={40}
                  className="h-full w-auto"
                />
              </div>
              <h5 className="mt-2 text-xs/tight font-medium md:text-sm/tight">{item.text}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
