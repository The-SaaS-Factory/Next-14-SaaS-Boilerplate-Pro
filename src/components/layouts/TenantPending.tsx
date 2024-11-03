"use client";

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { useState } from "react";
import { signOut } from "next-auth/react";
export default function TenantPending() {
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    //logout
    signOut();
    window.location.href = "/login";
  };

  return (
    <Dialog
      className="relative z-10"
      open={open}
      onClose={() => {
        setOpen(true);
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter 
          transition-all data-[closed]:scale-95 data-[closed]:opacity-0 
          data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="flex flex-col items-center align-middle py-32">
            <span className="text-title">Cuenta pendiente de aprobación</span>
            <p className="text-sm text-center mt-2 px-14">
              Tu cuenta está pendiente de aprobación por parte del
              administrador. Por favor, espera mientras revisamos tus datos.
            </p>
            <button className="mt-7 btn-main" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
