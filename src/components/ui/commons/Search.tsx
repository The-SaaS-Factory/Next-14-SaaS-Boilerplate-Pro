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
    <div className="mb-3">
      <div>
        <div className="relative flex items-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <TextInput
            id="search"
            name="search"
            defaultValue={searchParams.get("query") || ""}
            icon={MagnifyingGlassCircleIcon}
            onValueChange={(value) => handleSearch(value)}
            placeholder={placeholder}
          />

          {/* <DateRangePicker
            className="mx-auto max-w-md"
            value={value}
            onValueChange={(value) => handleSearch(value)}
            locale={es}
            selectPlaceholder="Seleccionar"
            color="rose"
          >
            <DateRangePickerItem
              key="ytd"
              value="ytd"
              from={new Date(2023, 0, 1)}
            >
              Año transcurrido
            </DateRangePickerItem>
            <DateRangePickerItem
              key="half"
              value="half"
              from={new Date(2023, 0, 1)}
              to={new Date(2023, 5, 31)}
            >
              Primer semestre
            </DateRangePickerItem>
          </DateRangePicker> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
