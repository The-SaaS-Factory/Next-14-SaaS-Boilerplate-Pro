"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import Search from "@/app/components/Search";

// Simulated SaaS products data
const saasProducts = [
  // Add more products as needed
];

const filterOptions = {
  industry: ["Health", "Education", "Logistics", "Retail"],
  functionality: ["CRM", "Analytics", "Automation", "Billing"],
  clientSize: ["Startups", "SMEs", "Enterprise"],
  tech: ["React", "Next.js", "Laravel"],
  pricing: ["Subscription", "One-time", "Freemium"],
  marketTarget: ["United States", "Europe", "Asia", "Latin America"],
};

export default function SaasDirectorySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const getFilters = () => {
    const filters = {};
    Object.keys(filterOptions).forEach((key) => {
      const value = searchParams.get(key);
      if (value) filters[key] = value;
    });
    return filters;
  };

  const filters = getFilters();

  const filteredProducts = saasProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      Object.entries(filters).every(([key, value]) => product[key] === value)
    );
  });

  const handleFilterChange = (category, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(category, value);
    } else {
      params.delete(category);
    }
    router.push(`?${params.toString()}`);
  };

 

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    router.push(`?${params.toString()}`);
  };

  const FilterContent = ({ inDrawer = false }) => (
    <>
      {inDrawer && Object.keys(filters).length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Applied Filters
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([category, value]) => (
              <Badge key={category} variant="secondary" className="px-2 py-1">
                {value as string}
                <button
                  className="ml-2 text-xs"
                  onClick={() => handleFilterChange(category, "")}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      {Object.entries(filterOptions).map(([category, options]) => (
        <div key={category} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
          <Select
            value={filters[category] || ""}
            onValueChange={(value) => handleFilterChange(category, value)}
          >
            <SelectTrigger className={inDrawer ? "w-full" : "w-[150px]"}>
              <SelectValue placeholder={`Select ${category}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full min-h-screen space-y-4 pt-12">
      {/* Hero Section */}
      <section className=" relative   g-main overflow-hidden py-20">
        <div className=" container inset-0   z-0">
          <div className="relative z-10">
            <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
              SaaS Projects Directory
            </h1>
            <div className="flex px-7 lg:px-0 lg:w-1/3 mx-auto lg:space-x-0 space-x-3 items-center">
              <Search />
              {/* Search Bar and Filter Button */}
              <div className=" ">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="ml-2 md:hidden">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Apply filters to refine your search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                      <FilterContent inDrawer={true} />
                    </div>
                    <SheetFooter>
                      <Button
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                      >
                        View Results
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters - Desktop */}
      <div className="hidden max-w-7xl mx-auto md:flex flex-wrap gap-4  4">
        <FilterContent />
      </div>

      {/* Active Filters */}
      <div className="flex max-w-7xl mx-auto flex-wrap items-center gap-2 mb-4">
        {Object.entries(filters).map(([category, value]) => (
          <Badge key={category} variant="secondary" className="px-2 py-1">
            {value as string}
            <button
              className="ml-2 text-xs"
              onClick={() => handleFilterChange(category, "")}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {Object.keys(filters).length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      {/* Results */}
      <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6 relative"
          >
            {product.forSale && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="animate-pulse">
                  For Sale
                </Badge>
              </div>
            )}
            <div className="w-12 h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=48&width=48"
                alt={`${product.name} logo`}
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              A {product.industry.toLowerCase()} solution focused on providing{" "}
              {product.functionality.toLowerCase()}
              services for {product.clientSize.toLowerCase()} businesses.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {product.industry}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {product.functionality}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500">
          No products found. Try removing some filters.
        </div>
      )}
    </div>
  );
}
