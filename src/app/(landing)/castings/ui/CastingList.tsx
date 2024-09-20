"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CastingCard } from "./CastingCard";
import { getAllCastingCategories } from "@/actions/admin/castingModule/get-all-casting-categories";
import { Badge } from "@/components/ui/badge";
import { CastingCategory } from "@prisma/client";
import { X } from "lucide-react";

export const CastingList = ({ castings }: { castings: any[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<CastingCategory[] | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      const _categories = await getAllCastingCategories();

      setCategories(_categories);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Filtros y Búsqueda */}
      <div className="mb-4  flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <Select
            value={currentType}
            onValueChange={(value) =>
              router.push("/castings?" + createQueryString("tipo", value))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Casting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {categories?.length > 0 &&
                categories?.map((item) => (
                  <SelectItem
                    key={`casting-category-${item.id}`}
                    value={item.name}
                  >
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

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
        <div className="relative"></div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
        {castings?.map((casting) => (
          <CastingCard key={casting.id} casting={casting} />
        ))}
      </div>
    </>
  );
};
