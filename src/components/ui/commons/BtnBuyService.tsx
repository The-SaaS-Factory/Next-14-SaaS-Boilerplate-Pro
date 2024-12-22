import Link from "next/link";

async function BtnBuyService() {
  return (
    <div className="flex items-center space-x-3">
      <Link
        href="/home"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Crear cuenta
      </Link>
      <Link
        href="/home"
        className="text-primary text-sm font-semibold leading-6"
      >
        Acceder a mi cuenta <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default BtnBuyService;
