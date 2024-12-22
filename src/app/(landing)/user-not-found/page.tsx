"use client";
import { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    setTimeout(() => {
      window.localStorage.clear();
      //clean cokkies
      deleteAllCookies();

      window.location.replace("/home");
    }, 5000);
  }, []);

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  return (
    <div className="isolate bg-black pt-14">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="via-greeen-200 bg-gradient-to-r from-pink-50 to-sky-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
              Tenemos una nueva actualización!
            </h1>
            <br />
            <p className="text-white">
              Es necesario eliminar la caché de la aplicación para continuar.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
