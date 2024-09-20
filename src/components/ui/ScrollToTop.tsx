"use client"; // Asegúrate de que este componente sea un componente de cliente

import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Desplazamiento suave
    });
  }, []);

  return <div></div>;
};

export default ScrollToTop;
