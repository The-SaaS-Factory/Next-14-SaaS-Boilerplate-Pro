import { Button } from "@/components/ui/button";
import { HeroPattern } from "@/components/ui/commons/HeroPattern";
import { Rocket } from "lucide-react";

export default function HeroLanding() {
  return (
    <div className="mx-auto max-w-full flex-col overflow-x-hidden pt-24 lg:max-w-7xl lg:pt-0">
      <HeroPattern />
      <main className="relative mx-auto flex-1">
        <section className="z-50 mx-auto py-2 md:py-7 lg:py-24 xl:py-32">
          <div className="mx-auto max-w-full px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 px-3 lg:px-0">
                <div className="space-y-2">
                  <Button
                    className="inline-flex items-center rounded-full bg-[#E8E7FF] px-4 py-1 text-sm font-medium text-[#4B45FF]"
                    variant="ghost"
                  >
                    <Rocket className="mr-1 h-3 w-3" />
                    Connect & Grow
                  </Button>
                  <h1 className="text-primary text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your main H1 title here
                  </h1>
                  <p className="text-primary max-w-[600px] dark:text-gray-400 md:text-xl">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Laborum aliquam totam ullam amet repudiandae quisquam ipsa
                    officia voluptatibus non consequuntur ab placeat, quas
                    impedit voluptatum, aperiam dicta soluta tenetur magnam?
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-[#4B45FF] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#3F39CC] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4B45FF] disabled:pointer-events-none disabled:opacity-50">
                    Learn more
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-[400px]">
                  <div className="absolute left-0 right-0 top-0 flex h-10 items-center bg-gray-100 px-4">
                    <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                    <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="ml-4 text-sm text-gray-600">Docs</div>
                  </div>
                  <div className="mt-12 p-4">some here</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
