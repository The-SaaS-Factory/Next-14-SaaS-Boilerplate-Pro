import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import TableLoaderSkeleton from "./TableLoaderSkeleton";

const PageLoader = () => (
  <div className="w-full animate-pulse">
    <div className="flex justify-between">
      <div className="my-2 flex flex-col space-y-1">
        <span className="h-7 w-48 rounded-lg bg-gray-300"></span>
        <div className="flex space-x-3 py-3">
          <div className="flex h-7 w-14 items-center rounded-xl bg-gray-300"></div>
          <ChevronRightIcon
            className="w-5 rounded-xl bg-gray-300 text-gray-100"
            aria-hidden="true"
          />
          <span className="ml-4 h-7 w-14 rounded-xl bg-gray-300"></span>
          <ChevronRightIcon
            className="w-5 rounded-xl bg-gray-300 text-gray-100"
            aria-hidden="true"
          />
          <span className="ml-4 h-7 w-14 rounded-xl bg-gray-300"></span>
        </div>
      </div>
      <div className="hidden space-x-3 lg:flex">
        <button className="btn-main h-10 w-32"></button>
      </div>
    </div>
    <hr className="mb-1" />
    <div className="flex space-x-3 py-3">
      <div className="h-7 w-32 rounded-xl bg-gray-300"></div>
      <div className="h-7 w-32 rounded-xl bg-gray-300"></div>
      <div className="h-7 w-32 rounded-xl bg-gray-300"></div>
    </div>
    <hr className="mb-1" />
    <TableLoaderSkeleton count={10} />
  </div>
);

export default PageLoader;
