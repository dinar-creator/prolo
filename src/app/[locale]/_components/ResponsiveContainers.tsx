"use client";

import { useState } from "react";

export default function ResponsiveContainers() {
  const [hide, setHide] = useState<boolean>(false);
  return (
    <div
      className={`fixed top-0 left-0 z-50 mb-8 flex w-full items-center gap-4 ${hide ? "bg-transparent" : "justify-center bg-white"}`}
    >
      {!hide && (
        <span
          id="sm-badge"
          className="tab-badge rounded-md bg-blue-100 px-3 py-1 text-sm text-gray-800"
          data-tab-name="sm"
        >
          sm (640px)
        </span>
      )}
      {!hide && (
        <span
          id="md-badge"
          className="tab-badge hidden rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-800 sm:block sm:bg-blue-100"
          data-tab-name="md"
        >
          md (768px)
        </span>
      )}
      {!hide && (
        <span
          id="lg-badge"
          className="tab-badge hidden rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-800 md:block md:bg-blue-100"
          data-tab-name="lg"
        >
          lg (1024px)
        </span>
      )}
      {!hide && (
        <span
          id="xl-badge"
          className="tab-badge hidden rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-800 lg:block lg:bg-blue-100"
          data-tab-name="xl"
        >
          xl (1280px)
        </span>
      )}
      {!hide && (
        <span
          id="xl-badge"
          className="tab-badge hidden rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-800 xl:block xl:bg-blue-100"
          data-tab-name="xl"
        >
          2xl (1536px)
        </span>
      )}

      <span className="cursor-pointer" onClick={() => setHide(prev => !prev)}>
        {!hide ? "Hide" : "Show"}
      </span>
    </div>
  );
}
