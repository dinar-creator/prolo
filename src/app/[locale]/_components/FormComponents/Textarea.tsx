import React from "react";
import { Icon } from "@iconify/react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextareaProps = {
  className?: string;
  label: string;
  placeholder?: string;
  id: string;
  error?: string;
  registerProps: UseFormRegisterReturn; // from react-hook-form
  icon: string;
};

const Textarea: React.FC<TextareaProps> = ({
  className,
  label,
  placeholder,
  id,
  error,
  registerProps,
  icon,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1 w-full text-base font-medium">
        {label}
      </label>
      <div className="bg-base1 focus-within:border-theme-blue flex items-start gap-2 rounded-xl border-2 border-transparent px-3 py-1">
        <div className="flex size-6 items-start justify-start">
          <Icon icon={icon} className="size-6" />
        </div>
        <textarea
          id={id}
          placeholder={placeholder}
          {...registerProps}
          className={`h-[100px] w-full grow border-none p-1 text-base text-black outline-none ${className}`}
        ></textarea>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Textarea;
