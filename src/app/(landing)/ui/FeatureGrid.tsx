import { Button } from "@/components/ui/button";
import { constants } from "@/lib/constants";
import { DownloadIcon, Eye, EyeIcon, FileTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeatureGrid() {
  return (
    <div className="  py-24 sm:py-32 relative z-40">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center pt-7 text-base/7 font-semibold text-indigo-600">
          The SaaS Factory
        </h2>
        <p
          className="mx-auto text-coloride py-3 mt-2 max-w-6xl  
        text-center text-4xl   tracking-tight font-bold  sm:text-6xl animate-pulse"
        >
          The best way to create your next SaaS
        </p>
        <div className="grid mt-14  lg:grid-cols-3 gap-8 my-7 ">
          <div className="relative ">
            <div className="   rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex   flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <Link href={"/boilerplates"}>
                  <h3
                    className="mt-2
                     text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center"
                  >
                    SaaS Boilerplates
                  </h3>
                </Link>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Build your next saas project in a weekend with our
                  boilerplates
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
                  {constants.boilerplates.map((boilerplate) => (
                    <div
                      key={boilerplate.id}
                      className="flex flex-col justify-between    "
                    >
                      <hr className="my-3" />
                      <Link href={boilerplate.url}>
                        <h3 className="text-subtitle  flex items-center space-x-3">
                          <span
                            className={boilerplate.isPro && "text-coloride"}
                          >
                            {boilerplate.name}
                          </span>
                          <Eye className="h-6 w-6" />
                        </h3>
                      </Link>
                      <span className="my-3">{boilerplate.nameStack}</span>
                      <div className="flex    space-x-4">
                        <Link target="_blank" href={boilerplate.urlDemo}>
                          <Button variant="outline" size="sm">
                            <EyeIcon className="mr-2 h-4 w-4" />
                            Demo
                          </Button>
                        </Link>

                        <Link target="_blank" href={boilerplate.urlDoc}>
                          <Button variant="outline" size="sm">
                            <FileTextIcon className="mr-2 h-4 w-4" />
                            Doc
                          </Button>
                        </Link>

                        <Link href={"/home/admin/boilerplates"}>
                          <Button size="sm">
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
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
              <div className="px-8 pb-14 flex flex-col pt-8 sm:px-10 ">
                <h3 className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  The Factory Suite
                </h3>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Manage your own software factory, taking control of your ideas
                  until the start of production.
                </p>
                <Link
                  className="mt-3  flex lg:inline mx-auto    lg:mr-auto  w-full"
                  href={"/home/admin/factory"}
                >
                  <Button className="mx-auto">Start my factory</Button>
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
              <div className="px-8 pb-14 flex flex-col pt-8 sm:px-10  ">
                <h3 className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Custom development service
                </h3>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  We create a technology that allows us to go from 0 to 100 in
                  your project faster than any other team, tell us about your
                  project
                </p>
                <div className="flex w-full flex-col">
                  <Link
                      className="mt-3 flex lg:flex mx-auto lg:mx-0 "
                    href={"/home/admin/services"}
                  >
                    <Button>Talk wit us</Button>
                  </Link>
                </div>
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
                <h3 className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Buy / Sell SaaS Softwares
                </h3>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Access the marketplace and buy or sell your software
                </p>
                <div className="flex w-full flex-col">
                  <Link
                    className="mt-3 flex lg:flex mx-auto lg:mx-0 "
                    href={"/marketplace"}
                  >
                    <Button className="lg:mr-auto">
                      Access to marketplace
                    </Button>
                  </Link>
                </div>
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
