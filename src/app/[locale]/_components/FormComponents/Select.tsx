"use client";
import { Icon } from "@iconify/react";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectProps = {
  className?: string;
  type?: string;
  label: string;
  placeholder?: string;
  id: string;
  error?: string;
  registerProps: UseFormRegisterReturn; // from react-hook-form
  options: { value: string | number; name: string }[];
  icon: string;
  disabled?: boolean;
  value?: string | number;
};

export default function Select({
  className,
  id,
  label,
  placeholder,
  error,
  registerProps,
  options,
  icon,
  disabled = false,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 w-full text-base font-medium">
        {label}
      </label>
      <div className="bg-base1 focus-within:border-theme-blue flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1">
        <Icon icon={icon} className="size-6" />
        <select
          disabled={disabled}
          id={id}
          {...registerProps}
          className={`w-full grow border-none p-1 text-base text-black capitalize outline-none ${className}`}
        >
          <option value={""}>{placeholder}</option>
          {options.map((option, ind) => (
            <option key={ind} value={option.value} className="capitalize">
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
