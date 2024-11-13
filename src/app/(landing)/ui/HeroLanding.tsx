import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function HeroLanding() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto    ">
      <main className="flex-1 relative">
        <section className="w-full z-50 py-2 md:py-7 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col px-3 lg:px-0 justify-center space-y-4">
                <div className="space-y-2">
                  <Button
                    className="inline-flex items-center rounded-full bg-[#E8E7FF] text-[#4B45FF] px-4 py-1 text-sm font-medium"
                    variant="ghost"
                  >
                    <Rocket className="mr-1 h-3 w-3" />
                    Connect & Grow
                  </Button>
                  <h1 className="text-3xl text-primary font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your main H1 title here
                  </h1>
                  <p className="max-w-[600px] text-primary md:text-xl dark:text-gray-400">
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
                <div className="relative w-full lg:max-w-[400px] h-[300px] bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
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
