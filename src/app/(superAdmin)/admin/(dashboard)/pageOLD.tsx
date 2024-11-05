"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  Users,
  Eye,
  FileText,
  UserCheck,
  Star,
  TrendingUp,
} from "lucide-react";

import { Area, AreaChart } from "recharts";

import { CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Ene", solicitudes: 40 },
  { name: "Feb", solicitudes: 30 },
  { name: "Mar", solicitudes: 20 },
  { name: "Abr", solicitudes: 27 },
  { name: "May", solicitudes: 18 },
  { name: "Jun", solicitudes: 23 },
  { name: "Jul", solicitudes: 34 },
];

export const description = "A stacked area chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export default function SuperAdminDashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Super Admin</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Perfiles de agencias
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13,429</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Perfiles de talentos
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">548,429</div>
            <p className="text-xs text-muted-foreground">
              +230.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Castings Publicados
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solicitudes enviadas
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">343K</div>
            <p className="text-xs text-muted-foreground">+586 desde ayer</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              Relación de aplicaciones aceptadas / denegadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="blue" // Change the fill color to blue
                  fillOpacity={0.4}
                  stroke="blue"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="blue" // Change the fill color to blue
                  fillOpacity={0.4}
                  stroke="blue"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Solicitudes Recibidas
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Solicitudes Aceptadas
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Solicitudes Recibidas</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="solicitudes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <AvatarIcon className="h-9 w-9" />

                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martínez
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aplicó para "Protagonista en Serie de TV"
                  </p>
                </div>
                <div className="ml-auto font-medium">Hace 5m</div>
              </div>
              <div className="flex items-center">
                <AvatarIcon className="h-9 w-9" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Javier López
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aplicó para "Extra en Película de Acción"
                  </p>
                </div>
                <div className="ml-auto font-medium">Hace 20m</div>
              </div>
              <div className="flex items-center">
                <AvatarIcon className="h-9 w-9" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Isabel Navarro
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aplicó para "Modelo para Campaña Publicitaria"
                  </p>
                </div>
                <div className="ml-auto font-medium">Hace 1h</div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Casting Más Popular
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Protagonista en Serie de TV
            </div>
            <p className="text-xs text-muted-foreground">246 aplicaciones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Tasa de Selección
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.3%</div>
            <p className="text-xs text-muted-foreground">
              +0.5% desde el último casting
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Próximo Casting
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Modelo para Desfile de Moda
            </div>
            <p className="text-xs text-muted-foreground">En 3 días</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button>Ver Todos los Castings</Button>
      </div>
    </div>
  );
}
