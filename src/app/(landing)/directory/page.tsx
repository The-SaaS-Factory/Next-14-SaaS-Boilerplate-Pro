"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

// Simulated SaaS products data
const saasProducts = [
  {
    id: 1,
    name: "HealthTrack",
    industry: "Health",
    functionality: "CRM",
    clientSize: "SMEs",
    tech: "React",
    pricing: "Subscription",
    marketTarget: "Latin America",
    forSale: true,
  },
  {
    id: 2,
    name: "EduLearn",
    industry: "Education",
    functionality: "LMS",
    clientSize: "Enterprise",
    tech: "Next.js",
    pricing: "Freemium",
    marketTarget: "Europe",
  },
  {
    id: 3,
    name: "LogiFlow",
    industry: "Logistics",
    functionality: "Automation",
    clientSize: "Startups",
    tech: "Laravel",
    pricing: "One-time",
    marketTarget: "United States",
  },
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

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", searchTerm);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SaaS Directory</h1>

      {/* Search Bar and Filter Button */}
      <form onSubmit={handleSearch} className="flex mb-4">
        <Input
          type="text"
          placeholder="Search SaaS solutions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" className="ml-2 hidden md:flex">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
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
              <Button onClick={() => setIsOpen(false)} className="w-full">
                View Results
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </form>

      {/* Filters - Desktop */}
      <div className="hidden md:flex flex-wrap gap-4 mb-4">
        <FilterContent />
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
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
    </div>
  );
}
