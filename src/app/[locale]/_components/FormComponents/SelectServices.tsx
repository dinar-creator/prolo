import { Icon } from "@iconify/react";
import { UseFormRegisterReturn } from "react-hook-form";

// Services Options
type ServicesOptions = {
  individualServices: {
    title: string;
    services: { text: string; value: string }[];
  };
  commercialSectorServices: {
    title: string;
    services: { text: string; value: string }[];
  };
};
type SelectProps = {
  className?: string;
  type?: string;
  label: string;
  placeholder?: string;
  id: string;
  error?: string;
  registerProps: UseFormRegisterReturn; // from react-hook-form
  options: ServicesOptions;
  icon: string;
};

export default function SelectServices({
  className,
  id,
  label,
  placeholder,
  error,
  registerProps,
  options,
  icon,
}: SelectProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1 w-full text-base font-medium">
        {label}
      </label>
      <div className="bg-base1 focus-within:border-theme-blue flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-1">
        <Icon icon={icon} className="size-6" />
        <select
          id={id}
          {...registerProps}
          className={`w-full grow border-none p-1 text-base text-black outline-none ${className}`}
        >
          <option value={""}>{placeholder}</option>
          <optgroup label={options.individualServices.title}>
            {options.individualServices.services.map(service => (
              <option key={service.value} value={service.value}>
                {service.text}
              </option>
            ))}
          </optgroup>
          <optgroup label={options.commercialSectorServices.title}>
            {options.commercialSectorServices.services.map(service => (
              <option key={service.value} value={service.value}>
                {service.text}
              </option>
            ))}
          </optgroup>

          {}
        </select>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
