import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Factory, ShoppingBag, Zap } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const shortcuts = [
    {
      name: "Boilerplates",
      icon: Box,
      href: "/home/admin/boilerplates",
      ready: true,
    },
    { name: "Services", icon: Zap, href: "/home/admin/services", ready: true },
    {
      name: "Factory",
      icon: Factory,
      href: "/home/admin/factory",
      ready: false,
    },
    {
      name: "Marketplace",
      icon: ShoppingBag,
      href: "/marketplace",
      ready: false,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shortcuts.map((shortcut) => (
          <Card key={shortcut.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {shortcut.name}
              </CardTitle>
              <shortcut.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link href={shortcut.href} passHref>
                <Button
                  className="w-full"
                  variant={!shortcut.ready ? "outline" : "default"}
                  disabled={!shortcut.ready}
                >
                  Go to {shortcut.name}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
