import { AlertCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  const dummyProducts = [
    {
      name: "CloudSync Pro",
      description: "Seamless file synchronization across devices",
      price: "$9.99/mo",
    },
    {
      name: "DataGuard 360",
      description: "Complete data protection and backup solution",
      price: "$19.99/mo",
    },
    {
      name: "AIAssist",
      description: "AI-powered virtual assistant for businesses",
      price: "$29.99/mo",
    },
    {
      name: "SecureChat Enterprise",
      description: "End-to-end encrypted team communication",
      price: "$14.99/mo",
    },
    {
      name: "ProjectPro",
      description: "Advanced project management and collaboration tool",
      price: "$24.99/mo",
    },
    {
      name: "AnalyticsHub",
      description: "Comprehensive business analytics platform",
      price: "$39.99/mo",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SaaS Marketplace</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-4 mt-8">
        {/* Search and filter */}
        <div className="flex mb-8 space-x-4">
          <div className="flex-grow">
            <Input
              type="search"
              placeholder="Search for SaaS products..."
              className="w-full"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts.map((product, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">{product.price}</span>
                <Button>Learn More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/30" />

      {/* Under construction message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-6 bg-black bg-opacity-70 rounded-lg">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-4xl font-bold text-white mb-2">
            Under Construction
          </h2>
          <p className="text-xl text-gray-200">
            Our SaaS Marketplace is coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
