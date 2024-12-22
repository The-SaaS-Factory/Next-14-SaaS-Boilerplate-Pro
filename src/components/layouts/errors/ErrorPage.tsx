import Image from "next/image";
import Link from "next/link";

export default function ErrorPage({
  message,
  reset,
}: {
  message: string;
  reset: () => void;
}) {
  return (
    <>
      <main className="relative isolate h-full">
        <Image
          src="/assets/img/403.png"
          alt="403 error"
          width={450}
          height={450}
          className="mx-auto items-center justify-center"
        />
        <div className="mx-auto max-w-7xl px-6 py-3 text-center sm:py-7 lg:px-8">
          <p className="text-primary text-base font-semibold leading-8">
            500 / 403
          </p>
          <h1 className="text-primary mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {message}
          </h1>
          <p className="text-primary mt-4 text-base sm:mt-6">
            {`Sorry, you don't have access to this page`}.
          </p>
          <div className="mt-10 flex flex-col justify-center">
            <Link
              href="/home"
              className="text-primary text-sm font-semibold leading-7"
            >
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
            <button
              className="btn-main mx-auto mt-3 w-32"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
