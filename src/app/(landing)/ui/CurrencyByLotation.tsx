"use client";

import { useEffect } from "react";

export const CurrencyByLotation = () => {
  const getCountryByIp = async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    localStorage.setItem("country", data.country);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("country")) return;

      getCountryByIp().then((res) => {
        console.log(res);
      });
    }
  }, []);

  const getCurrencyName = () => {
    if (typeof window !== "undefined") {
      const country = localStorage.getItem("country");

      switch (country) {
        case "UY":
          return "pesos uruguayos";
        case "BR":
          return "reales";
        default:
          return "USD";
      }
    } else {
      return "USD";
    }
  };

  return (
    <>{localStorage.getItem("country") ? getCurrencyName() : "tu moneda"}</>
  );
};
