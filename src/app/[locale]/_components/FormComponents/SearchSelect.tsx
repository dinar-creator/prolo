"use client";
import { useState, useMemo, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "./Input";
import { Icon } from "@iconify/react";
import { UseFormSetValue } from "react-hook-form";
import { CreateShipmentFormInputs } from "@/lib/types";
type Option = { value: string | number; name: string };

type SearchSelectProps = {
  id: string;
  label: string;
  placeholder?: string;
  icon: string;
  options: Option[];
  registerProps: UseFormRegisterReturn;
  error?: string;
  setValue: UseFormSetValue<CreateShipmentFormInputs>;
  name: keyof CreateShipmentFormInputs;
  resetKey?: string | number;
  searchText?: string;
  noResult: string;
};

export default function SearchSelect({
  id,
  label,
  placeholder,
  icon,
  options,
  registerProps,
  error,
  setValue,
  name,
  resetKey = "",
  searchText,
  noResult,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Option | null>(null);

  const filteredOptions = useMemo(() => {
    return options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, options]);

  useEffect(() => {
    setSelected(null);
  }, [resetKey]);

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1 block font-medium">
        {label}
      </label>

      {/* Hidden RHF input */}
      <input id={id} type="hidden" value={selected?.value ?? ""} {...registerProps} />

      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className={`bg-base1 flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 ${open && "border-theme-blue border-2"}`}
      >
        <div className="flex items-center gap-2">
          <Icon icon={icon} className="size-6" />
          <span className="text-base capitalize">{selected?.name || placeholder}</span>
        </div>

        <div>
          <Icon icon={"hugeicons:arrow-down-01"} className={`${open && "rotate-180"}`} />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md bg-white p-3 shadow-lg">
          <Input
            type="search"
            icon="hugeicons:search-01"
            id="search"
            placeholder={searchText ? `${searchText}...` : "Search..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <ul className="mt-3 max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 && (
              <li className="text-sm text-gray-400">{noResult ? noResult : "No Result"}</li>
            )}

            {filteredOptions.map(option => (
              <li
                key={option.value}
                onClick={() => {
                  setSelected(option);
                  setValue(name, `${option.value}`, {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                  setOpen(false);
                  setSearch("");
                }}
                className="hover:bg-base1 cursor-pointer rounded px-3 py-1"
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
