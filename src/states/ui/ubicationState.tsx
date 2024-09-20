"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  ubication: string;
};

type Actions = {
  // eslint-disable-next-line no-unused-vars
  changeUbication: (ubication: string) => void;
};

export const useUbicationState = create<State & Actions>()(
  persist(
    (set) => ({
      // Estado inicial con la propiedad `ubication`
      ubication: "", // Puedes inicializarla con un valor por defecto
      // Acción para cambiar la ubicación
      changeUbication: (ubication: string) =>
        set(() => ({
          ubication: ubication,
        })),
    }),
    {
      name: "ubication-storage", // Nombre clave en localStorage
      getStorage: () => localStorage, // Especifica el almacenamiento
    }
  )
);
