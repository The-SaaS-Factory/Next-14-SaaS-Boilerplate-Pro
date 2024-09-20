import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { CastingList } from "./ui/CastingList";
import { getAllCastings } from "@/actions/admin/castingModule/get-all-castings";
import { Suspense } from "react";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import Pagination from "@/components/ui/commons/Pagination";
import { SearchCastings } from "./ui/SearchCastings";

export default async function CastingsPage({
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams?: any;
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams.query;

  const search = searchParams || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getAllCastings({
    args: {
      query,
      search,
      limit: limit,
      offset,
    },
  });

  //Reduce duple. by keys and count the leads
  const dataLength = Object.keys(data).reduce((acc, key) => {
    return acc + data[key].length;
  }, 0);

  return (
    <div className="min-h-screen   ">
      {/* Sección Hero con imagen de fondo */}
      <section className="relative py-44 px-4 bg-black text-white">
        <Image
          src="/assets/img/bg2.jpg"
          alt="Fondo del hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
        <div className="container mx-auto text-center relative z-20">
          <h1 className="text-5xl font-bold mb-6">Catálogo de Castings</h1>
          <p className="text-xl mb-8">
            Encuentra los mejores castings para modelos, actores, bailarines y
            cant
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <SearchCastings></SearchCastings>
            </div>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-8">
        {/* Grid de Castings */}
        <Suspense fallback={<TableLoaderSkeleton count={7} />}>
          <div>
            <CastingList castings={data}></CastingList>

            {totalCount > 20 && (
              <div className="flex w-full">
                <div className="max-w-5xl pl-10   w-full  mb-7 ml-auto">
                  <Pagination
                    offset={offset}
                    dataLength={dataLength}
                    totalCount={totalCount}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            )}
          </div>
        </Suspense>

        {/* Sección para Agencias */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Eres una Agencia?</h2>
            <p className="text-xl mb-6">
              Publica tus castings y encuentra el talento que necesitas
            </p>
            <Button variant="secondary" size="lg">
              Publicar un Casting
            </Button>
          </div>
        </section>

        {/* Sección de Suscripción para Modelos */}
        <section className="bg-secondary text-secondary-foreground rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Eres Modelo o Actor?</h2>
            <p className="text-xl mb-6">
              Suscríbete para recibir notificaciones de nuevos castings
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="max-w-sm"
              />
              <Button type="submit">Suscribirse</Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
