"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {  Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ModelCard } from "./ui/ModelCard";
import { modelsMock } from "./ui/modelsMock";

export default function ModelsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Función para actualizar los parámetros de búsqueda
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Función para eliminar un filtro
  const removeFilter = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push("/castings?" + params.toString());
    },
    [searchParams, router]
  );

  // Función para eliminar todos los filtros
  const removeAllFilters = useCallback(() => {
    router.push("/castings");
  }, [router]);

  // Obtener los valores actuales de los filtros
  const currentType = searchParams.get("tipo") || "";
  const currentCity = searchParams.get("ciudad") || "";
  const currentSearch = searchParams.get("buscar") || "";

  return (
    <div className="min-h-screen   ">
      {/* Sección Hero con imagen de fondo */}
      <section className="relative py-44 px-4 bg-black text-white">
        <Image
          src="/assets/img/bg6.jpg"
          alt="Fondo del hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
        <div className="container mx-auto text-center relative z-20">
          <h1 className="text-5xl font-bold mb-6">Catálogo de Talentos</h1>
          <p className="text-xl mb-8">
            Encuentra el talento que necesitas para tus producciones
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar castings o modelos"
                className="pl-10 pr-4 py-2 w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-8">
        {/* Filtros y Búsqueda */}
        <div className="mb-4  flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <Select
              value={currentCity}
              onValueChange={(value) =>
                router.push("/castings?" + createQueryString("ciudad", value))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="madrid">Madrid</SelectItem>
                <SelectItem value="barcelona">Barcelona</SelectItem>
                <SelectItem value="sevilla">Sevilla</SelectItem>
                <SelectItem value="valencia">Valencia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar talentos"
              className="pl-10 pr-4 py-2 w-full md:w-[300px]"
              value={currentSearch}
              onChange={(e) =>
                router.push(
                  "/castings?" + createQueryString("buscar", e.target.value)
                )
              }
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Filtros activos */}
        {(currentType || currentCity || currentSearch) && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Filtros activos:</span>
            {currentType && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {currentType}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter("tipo")}
                />
              </Badge>
            )}
            {currentCity && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {currentCity}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter("ciudad")}
                />
              </Badge>
            )}
            {currentSearch && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Búsqueda: {currentSearch}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter("buscar")}
                />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={removeAllFilters}>
              Quitar todos los filtros
            </Button>
          </div>
        )}

        {/* Grid de Castings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {modelsMock.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>

        {/* Sección para Agencias */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Eres una Talento?</h2>
            <p className="text-xl mb-6">
                Crea tu perfil y comienza a recibir ofertas de trabajo  
            </p>
            <Button variant="secondary" size="lg">
                Crear Perfil
            </Button>
          </div>
        </section>

        
      </main>
    </div>
  );
}
