"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { areRequiredSettingsComplete } from "@/actions/admin/profileSettingsModule/are-require-settings-complete";
import { usePathname } from "next/navigation";

export const CompleteOnBoarding: React.FC = () => {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const { profile } = await getMembership();
      const complete = await areRequiredSettingsComplete(profile.id);

      setIsComplete(complete);
    };

    fetchData();
  }, [pathname]);

  if (isComplete === null) return null;

  const isAgencyProfilePage = pathname === "/home/admin/configuraciones";

  if (!isComplete && !isAgencyProfilePage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/60 z-[999]">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">
            Completa la Configuración de tu Agencia
          </h2>
          <p className="mb-4 text-gray-700">
            Necesitas completar la configuración del perfil de tu agencia para
            continuar. Por favor, llena todos los campos requeridos.
          </p>
          <Link href="/home/admin/configuraciones">
            <p className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Ir a la Configuración
            </p>
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default CompleteOnBoarding;
