"use client";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { TextInput } from "@tremor/react";
import { track } from "@vercel/analytics";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
const Search = ({ placeholder }: { placeholder?: string }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      if (typeof term === "string") {
        params.set("query", term);
        track("search", {
          query: term,
        });
      }
    } else {
      params.delete("query");
      params.delete("from");
      params.delete("to");
    }

    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <TextInput
      id="search"
      name="search"
      className="w-full"
      defaultValue={searchParams.get("query") || ""}
      icon={MagnifyingGlassCircleIcon}
      onValueChange={(value) => handleSearch(value)}
      placeholder={placeholder}
    />
  );
};

export default Search;
