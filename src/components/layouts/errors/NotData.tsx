import { CustomDialog } from "@/components/ui/componenets/Dialog";
import React from "react";

export default function NotDataPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center pt-[10%] text-center align-middle">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="text-title mt-2 text-sm font-semibold">
        Aún no hay registros
      </h3>
      <p className="text-primary mt-1 text-sm">
        {" "}
        Felizmente podemos empezar a agregar
      </p>
      <div className="mt-6 flex items-center justify-center">
        <CustomDialog style="button" label="Insertar">
          <div className="bg-main flex h-full flex-col overflow-auto bg-slate-800 py-6">
            {children}
          </div>
        </CustomDialog>

        {/* <Link href={link ?? "/add"} type="button" className="btn-main">
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          INSERIR
        </Link> */}
      </div>
    </div>
  );
}
