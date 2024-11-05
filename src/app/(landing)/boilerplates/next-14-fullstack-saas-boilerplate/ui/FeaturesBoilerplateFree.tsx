import {
    ArrowRightCircleIcon,
  BoltIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  CodeBracketIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ServerIcon,
  ServerStackIcon,
} from "@heroicons/react/20/solid";
import { UsersIcon } from "@heroicons/react/24/solid";
import {
  ArrowPathIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
} from "@heroicons/react/20/solid";

import Image from "next/image";

const features = [
  {
    name: "Scalability.",
    description:
      "Streamlines growth by enabling easy addition or removal of users and efficient management of roles and permissions.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Efficient Collaboration.",
    description:
      "Enhances communication and task assignment by organizing users into teams and departments, facilitating project collaboration.",
    icon: UsersIcon,
  },
  {
    name: "Security and Control.",
    description:
      "Centralizes access management and security policies, providing greater control over data and infrastructure.",
    icon: LockClosedIcon,
  },
];
const features2 = [
  {
    name: "Integration Ease.",
    description:
      "tripe streamlines payment integration in your SaaS with an easily integrated API and comprehensive documentation, speeding up the development process.",
    icon: CodeBracketIcon,
  },
  {
    name: "Versatility and Global Security.",
    description:
      "Stripe provides payment versatility and robust security, complying with standards like PCI DSS, ensuring secure transactions globally.",
    icon: GlobeAltIcon,
  },
];

const features3 = [
  {
    name: "GraphQL with Apollo.",
    description:
      "The GraphQL-based architecture makes data retrieval efficient, while Apollo Client simplifies application state management, enhancing user experience and reducing server load.",
    icon: BoltIcon,
  },
  {
    name: "TypeScript",
    description:
      "Leverage the power of TypeScript's static typing system to detect and prevent errors at compile time, providing increased confidence and productivity during development.",
    icon: CubeTransparentIcon,
  },
  {
    name: "React",
    description:
      "Build dynamic and responsive user interfaces with React, the leading JavaScript library for creating reusable and easily maintainable components.",
    icon: CheckCircleIcon,
  },
  {
    name: "Tailwind CSS",
    description:
      "Streamline the design and styling of your application with Tailwind CSS, a utility-first framework that enables you to quickly customize your application's appearance without sacrificing code readability.",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Prisma",
    description:
      "Prisma is one of the best current ORMs to manage databases.",
    icon: ServerStackIcon,
  },
  {
    name: "Clerk",
    description:
      "Powerful authentication manager allowing you to add social providers and manage organizations, permissions and roles What you avoid doing by using this boilerplate. ",
    icon: ArrowRightCircleIcon,
  },
];

export default function FeaturesBoilerplateFree() {
  return (
    <>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  Top feature{" "}
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  A SaaS based on organizations
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Each user will be able to create organizations (teams) to
                  invite their collaborators and share the resources offered in
                  their membership plan.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <Image
              src="https://ik.imagekit.io/cluzstudio/01-cluzstudio/screely-1703716752301_xVVckTVwk.png?updatedAt=1703716824119"
              alt="The SaaS Factory Features"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  Top feature{" "}
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                  Membership plans and billing ready to use with Stripe
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-100">
                  The SaaS Factory is ready to use with Stripe. You can create
                  membership plans and start billing your users in minutes.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features2.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-100">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-indigo-50"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline text-gray-200">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <Image
              src="https://ik.imagekit.io/cluzstudio/01-cluzstudio/screely-1703720465815_uSi8i2AMI.png?updatedAt=1703720616191"
              alt="The SaaS Factory Features plans membership"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-700">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Launch your idea in a weekend
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-800">
            Imagine that in 10 minutes you have everything ready to go directly to developing the specific module(s) of your business model.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src="https://ik.imagekit.io/cluzstudio/01-cluzstudio/screely-1703721109176_NE5QpcmxF.png?updatedAt=1703721147856"
              alt="App screenshot"
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
              width={2432}
              height={1442}
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-50 pt-[7%]" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features3.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-700">
                  <feature.icon
                    className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>{" "}
                <dd className="inline text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
