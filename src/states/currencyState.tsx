import { create } from "zustand";
import { persist } from "zustand/middleware";
type Currency = {
  id: number;
  code: string;
  rate: number;
};

type State = {
  currencySelected: Currency;
};

type Actions = {
  // eslint-disable-next-line no-unused-vars
  changeCurrencySelected: (currencySelected: Currency) => void;
};

export const useCurrencyState = create<State & Actions>()(
  persist(
    (set) => ({
      // Estado inicial
      currencySelected: {
        id: 1,
        code: "usd",
        rate: 0,
      },
      // Acción para cambiar la moneda seleccionada
      changeCurrencySelected: (currencySelected) =>
        set(() => ({
          currencySelected,
        })),
    }),
    {
      name: "currency-storage", // Nombre clave en localStorage
      getStorage: () => localStorage, // Especifica el almacenamiento
    },
  ),
);
