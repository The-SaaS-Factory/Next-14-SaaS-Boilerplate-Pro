"use client";

import { Download, Presentation } from "lucide-react";

export const IdeaActions = () => {
  return (
    <div className="  flex lg:ml-4 lg:mt-0">
      <span className="ml-3   sm:block">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <Download
            aria-hidden="true"
            className="-ml-0.5 mr-1.5 size-5 text-gray-400"
          />
          Export
        </button>
      </span>

      <span className=" ml-3">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Presentation aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
          Present
        </button>
      </span>
    </div>
  );
};
