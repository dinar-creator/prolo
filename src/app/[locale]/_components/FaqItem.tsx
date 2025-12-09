"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

type FaqItemProps = {
  question: string;
  answer: string;
};
export default function FaqItem({ question, answer }: FaqItemProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-base1 border-base2 w-full rounded-xl border-2 p-4">
      {/* Question */}
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-medium">{question}</p>
        <div className="size-6" onClick={() => setShow(prev => !prev)}>
          <Icon
            icon={!show ? "hugeicons:add-square" : "hugeicons:minus-sign-square"}
            className="size-6 cursor-pointer"
          />
        </div>
      </div>
      {/* Answer */}
      {show && <p className="pt-2">{answer}</p>}
    </div>
  );
}
