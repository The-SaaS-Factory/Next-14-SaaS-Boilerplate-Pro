import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DirectoryLanding() {
  return (
    <div className="bg-white  ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Directorio
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-7 gap-y-7 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Link
            href={"/directory/churchs"}
            className="flex group hover:bg-slate-100 space-x-3 bg-slate-50 justify-center py-7 p-3 rounded-lg text-center font-normal"
          >
            <span className=" group-hover:scale-110">Iglesias</span>
            <ArrowRightIcon className="h-5 group-hover:scale-110 w-5" />
          </Link>
          <Link
            href={"/directory/churchs"}
            className="flex group hover:bg-slate-100 space-x-3 bg-slate-50 justify-center py-7 p-3 rounded-lg text-center font-normal"
          >
            <span className=" group-hover:scale-110">Artistas</span>
            <ArrowRightIcon className="h-5 group-hover:scale-110 w-5" />
          </Link>
          <Link
            href={"/directory/churchs"}
            className="flex group hover:bg-slate-100 space-x-3 bg-slate-50 justify-center py-7 p-3 rounded-lg text-center font-normal"
          >
            <span className=" group-hover:scale-110">Ministerios</span>
            <ArrowRightIcon className="h-5 group-hover:scale-110 w-5" />
          </Link>
          <Link
            href={"/directory/churchs"}
            className="flex group hover:bg-slate-100 space-x-3 bg-slate-50 justify-center py-7 p-3 rounded-lg text-center font-normal"
          >
            <span className=" group-hover:scale-110">Iglesias</span>
            <ArrowRightIcon className="h-5 group-hover:scale-110 w-5" />
          </Link>
          <Link
            href={"/directory/churchs"}
            className="flex group hover:bg-slate-100 space-x-3 bg-slate-50 justify-center py-7 p-3 rounded-lg text-center font-normal"
          >
            <span className=" group-hover:scale-110">Artistas</span>
            <ArrowRightIcon className="h-5 group-hover:scale-110 w-5" />
          </Link>
          <Link
            href={"/directory/churchs"}
            className="flex group hover:bg-slate-100 space-x-3 bg-slate-50 justify-center py-7 p-3 rounded-lg text-center font-normal"
          >
            <span className=" group-hover:scale-110">Ministerios</span>
            <ArrowRightIcon className="h-5 group-hover:scale-110 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
