// components/Filters.tsx
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export const CleanFilters: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const newFilters: { [key: string]: string[] } = {};
    searchParams.forEach((value, key) => {
      if (!newFilters[key]) {
        newFilters[key] = [];
      }
      newFilters[key].push(value);
    });
    setFilters(newFilters);
  }, [searchParams]);

  const removeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const values = params.getAll(key);
    const newValues = values.filter((v) => v !== value);
    if (newValues.length > 0) {
      params.delete(key);
      newValues.forEach((v) => params.append(key, v));
    } else {
      params.delete(key);
    }
    const newQuery = params.toString();
    router.replace(`${pathName}?${newQuery}`);
  };

  const handleClearAll = () => {
    router.replace(pathName);
  };

  return (
    <div className="p-4">
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).flatMap(([key, values]) =>
            values.map((value) => (
              <div
                key={`${key}:${value}`}
                className="flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm"
              >
                <span className="mr-2">{`${key}: ${value}`}</span>
                <button
                  type="button"
                  onClick={() => removeFilter(key, value)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))
          )}
          <button
            type="button"
            onClick={handleClearAll}
            className="bg-red-500 text-white rounded-full px-3 py-1 text-sm ml-4"
          >
            Eliminar todos los filtros
          </button>
        </div>
      )}
    </div>
  );
};
