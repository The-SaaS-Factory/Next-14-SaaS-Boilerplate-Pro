/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import FeaturesBoilerplateFree from "./ui/FeaturesBoilerplateFree";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex bg-gray-50   pt-9">
        <Link
          href={"/boilerplates/next-14-fullstack-saas-boilerplate-pro"}
          className="text-blue-500 flex items-center mx-auto mt-7 pt-3 pb-1 font-semibold animate-pulse"
        >
          <span className="">Version Pro</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
          />
        </svg>
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              The Boilerplate for SaaS Products, free and Open Source
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              The SaaS Factory Boilerplate is a standard boilerplate for
              advanced SaaS products. It's free and open source. One version
              works with Apollo <b>GraphQL</b>, React, Tailwind CSS, and
              TypeScript, while the other is built entirely on <b> Next 14.</b>
            </p>
            <div className="mt-10 mr-auto flex flex-col h-48 space-y-3 lg:w-[70%] w-full mb-20 lg:mb-0  gap-x-6">
              <div className="flex flex-col space-y-3 border-2 border-dashed border-gray-300 p-3 rounded-lg">
                <div className="flex space-x-3">
                  <span className="text-white">
                    Version: Next 14 FullStack{" "}
                  </span>
                  <span className="text-green-700   justify-center items-center text-sm bg-green-400 px-1 rounded-lg">
                    New
                  </span>
                </div>
                <div className="flex space-x-3">
                  <a
                    target="_black"
                    href="https://github.com/The-SaaS-Factory/next-14-saas-boilerplate"
                    className="rounded-md w-1/2 text-center bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    Clone on GitHub
                  </a>
                  <a
                    target="_black"
                    href="https://next14.thesaasfactory.dev"
                    className="rounded-md w-1/2 text-center bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    View Demo
                  </a>
                </div>
                <a
                  href="https://docs-next14.thesaasfactory.dev"
                  target="_black"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  View Docs <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="flex flex-col space-y-3 border-2 border-dashed border-gray-300 p-3 rounded-lg">
                <span className="text-white">
                  Version: React - Graphql - Apollo - Node{" "}
                </span>
                <div className="flex space-x-3">
                  <a
                    target="_black"
                    href="https://github.com/The-SaaS-Factory/frontend-saas-boilerplate-react-apollo-graphql-TS"
                    className="rounded-md w-1/2 text-center bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    Clone on GitHub
                  </a>
                  <a
                    target="_black"
                    href="https://demo.thesaasfactory.dev"
                    className="rounded-md w-1/2 text-center bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    View Demo
                  </a>
                </div>
                <a
                  href="https://docs.thesaasfactory.dev"
                  target="_black"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  View Docs <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl mt-14 lg:mt-0 lg:flex-none sm:max-w-5xl lg:max-w-none">
              <Image
                src="https://ik.imagekit.io/cluzstudio/01-cluzstudio/browser%20mockup_awCrgH-4x.png?updatedAt=1703714967935"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
        <FeaturesBoilerplateFree />
      </div>
    </>
  );
}
