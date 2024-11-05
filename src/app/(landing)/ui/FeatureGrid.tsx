import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeatureGrid() {
  return (
    <div className="  py-24 sm:py-32 relative z-40">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center pt-7 text-base/7 font-semibold text-indigo-600">
          The SaaS Factory
        </h2>
        <p className="mx-auto py-3 mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight text-gray-950 sm:text-5xl">
          The best way to create your next SaaS
        </p>
        <div className="grid mt-14  lg:grid-cols-3 gap-8 my-7 ">
          <div className="relative ">
            <div className="   rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex   flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  SaaS Boilerplates
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </p>
              </div>
              <div className="relative  pb-7 w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                {/* <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                    alt=""
                  />
                </div> */}
                <div className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center px-10">
                  <hr className="my-7" />
                  <div className="flex flex-col justify-between    ">
                    <h3 className="text-subtitle  flex items-center space-x-3">
                      <span>Next 14 SaaS Boilerplate Free</span>
                      <Eye className="h-4 w-4" />
                    </h3>
                    <span>Clerk - Next 14 - TS - Prisma - Tailwind</span>
                    <div className="flex justify-around my-3 space-x-1">
                      <Link href={"/s"}>
                        <Button variant="secondary"> Demo</Button>
                      </Link>

                      <Link href={"/s"}>
                        <Button variant="secondary"> Doc</Button>
                      </Link>

                      <Link href={"/s"}>
                        <Button variant="default">Download</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between mt-7   ">
                    <Link href={"/s"}>
                      <h3 className="text-subtitle flex items-center  space-x-2">
                        <span>Next 14 SaaS Boilerplate </span>
                        <b className="text-sky-500"> Pro</b>
                        <Eye className="h-4 w-4" />
                      </h3>
                    </Link>
                    <span>Next Auth - Next 15 - TS - Prisma - Tailwind</span>
                    <div className="flex justify-around my-3 space-x-1">
                      <Link href={"/s"}>
                        <Button variant="secondary"> Demo</Button>
                      </Link>

                      <Link href={"/s"}>
                        <Button variant="secondary"> Doc</Button>
                      </Link>

                      <Link href={"/s"}>
                        <Button variant="default">Download</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative  ">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div
              className="relative flex  flex-col overflow-hidden r
            ounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]"
            >
              <div className="px-8 pb-14 flex flex-col pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  The Factory Suite
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Manage your own software factory, taking control of your ideas
                  until the start of production.
                </p>
                <Link className="mt-3" href={"/"}>
                  <Button>Start my factory</Button>
                </Link>
              </div>
              {/* <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                  alt=""
                />
              </div> */}
            </div>
            <br />
            <div className="relative border-t flex h-auto flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pb-14 flex flex-col pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Custom development service
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit
                  maiores impedit.
                </p>
                <Link className="mt-3" href={"/"}>
                  <Button>Talk wit us</Button>
                </Link>
              </div>
              {/* <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                  alt=""
                />
              </div> */}
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div id="lasColumn" className="relative ">
            <div className="absolute    rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex   flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 flex flex-col pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Buy / Sell SaaS Softwares
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
                  eget sem sodales gravida.
                </p>
                <Link className="mt-3" href={"/marketplace"}>
                  <Button variant="secondary">Access to marketplace</Button>
                </Link>
                <div className="flex flex-1 items-center justify-center    pt-14 lg:pb-2">
                  <Image
                    width={300}
                    height={300}
                    className="w-full "
                    src="/assets/img/marketplace.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
