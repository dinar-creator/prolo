"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useLocale } from "next-intl";

type InputProps = {
  className?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  id: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  error?: string;
  registerProps?: UseFormRegisterReturn; // from react-hook-form
  icon: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  className,
  type = "text",
  label,
  placeholder,
  id,
  min,
  max,
  disabled = false,
  error,
  registerProps,
  onChange,
  icon,
}) => {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 w-full text-base font-medium">
          {label}
        </label>
      )}
      <div className="bg-base1 focus-within:border-theme-blue flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1">
        <Icon icon={icon} className="size-6 text-black" />
        <input
          dir={dir}
          id={id}
          min={min}
          disabled={disabled}
          max={max}
          type={type}
          placeholder={placeholder}
          {...registerProps}
          onChange={e => {
            registerProps?.onChange?.(e); // react-hook-form tracking
            onChange?.(e); // your custom logic
          }}
          className={`disabled:bg-base1/50 w-full grow border-none p-1 text-base text-black outline-none disabled:text-gray-400 ${className}`}
        />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
