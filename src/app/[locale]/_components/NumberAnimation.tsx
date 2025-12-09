"use client";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export default function NumberAnimation({ num, className }: { num: number; className?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? num : 0,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <div ref={ref} className={className}>
      <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
    </div>
  );
}
