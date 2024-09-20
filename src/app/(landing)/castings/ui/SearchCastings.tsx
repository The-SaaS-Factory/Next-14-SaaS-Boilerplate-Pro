"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const SearchCastings = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchParams = useDebouncedCallback((param, values) => {
    // Convertimos los searchParams a string antes de crear un nuevo URLSearchParams
    const params = new URLSearchParams(searchParams.toString());
    
    if (values.length > 0) {
      params.set(param, values.join(","));
    } else {
      params.delete(param);
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 50);

  return (
    <>
      <Input
        onChange={(e) => handleSearchParams("query", [e.target.value])}
        type="text"
        placeholder="Buscar castings o modelos"
        className="pl-10 pr-4 py-2 w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </>
  );
};
