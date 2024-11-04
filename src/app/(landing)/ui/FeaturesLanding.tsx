// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowRight, Lock } from "lucide-react";
// import Image from "next/image";

// export default function FeaturesLanding() {
//   return (
//     <section className="w-full py-2 md:py-7 lg:py-24 bg-[#EDF0F7]">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center text-center space-y-4 mb-12">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//             Connect. Learn. Earn
//           </h2>
//           <p className="max-w-[600px]  text-primary md:text-xl/relaxed">
//             Your data is a profitable asset. With Earnware you control what data
//             to share anonymously and earn from it.
//           </p>
//           <div className="flex items-center space-x-4 mt-4">
//             <div className="w-2 h-2 rounded-full bg-gray-300" />
//             <div className="w-2 h-2 rounded-full bg-gray-300" />
//             <Lock className="w-4 h-4 text-gray-400" />
//             <div className="w-2 h-2 rounded-full bg-gray-300" />
//             <div className="w-2 h-2 rounded-full bg-gray-300" />
//           </div>
//         </div>
//         <div className="grid gap-6 lg:grid-cols-3">
//           <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
//             <CardContent className="p-6">
//               <h3 className="text-sm font-medium  text-primary mb-2">
//                 Your earnings
//               </h3>
//               <div className="text-4xl font-bold mb-4">$30.00</div>
//               <p className="text-sm  text-primary mb-4">
//                 Next payout in: 10,550 pts
//               </p>
//               <div className="w-full h-12 bg-gray-100 rounded-lg overflow-hidden">
//                 <div
//                   className="h-full bg-blue-500"
//                   style={{
//                     clipPath:
//                       "polygon(0 100%, 5% 80%, 10% 90%, 20% 70%, 30% 85%, 40% 75%, 50% 80%, 60% 70%, 70% 90%, 80% 60%, 90% 80%, 100% 50%, 100% 100%)",
//                   }}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
//             <CardContent className="p-6">
//               <h3 className="text-xl font-semibold mb-4">Connect sources</h3>
//               <div className="grid grid-cols-3 gap-4">
//                 <Image
//                   src="/placeholder.svg"
//                   alt="Uber"
//                   width={48}
//                   height={48}
//                   className="rounded-full"
//                 />
//                 <Image
//                   src="/placeholder.svg"
//                   alt="Amazon"
//                   width={48}
//                   height={48}
//                   className="rounded-full"
//                 />
//                 <Image
//                   src="/placeholder.svg"
//                   alt="Spotify"
//                   width={48}
//                   height={48}
//                   className="rounded-full"
//                 />
//                 <Image
//                   src="/placeholder.svg"
//                   alt="Netflix"
//                   width={48}
//                   height={48}
//                   className="rounded-full"
//                 />
//               </div>
//               <Button className="w-full mt-6 bg-gray-800 text-white hover:bg-gray-700">
//                 Download on the App Store
//               </Button>
//             </CardContent>
//           </Card>
//           <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
//             <CardContent className="p-6 flex flex-col justify-between h-full">
//               <div>
//                 <Image
//                   src="/placeholder.svg"
//                   alt="Chat Icon"
//                   width={32}
//                   height={32}
//                   className="mb-4"
//                 />
//                 <div className="space-y-2 mb-4">
//                   <p className="text-sm text-gray-600">
//                     Any products I should be interested in?
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Where do I mostly shop during winter season?
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     How much money I saved on discounts?
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between mt-4">
//                 <p className="text-sm font-medium">
//                   Learn more from your data and make better decisions
//                 </p>
//                 <ArrowRight className="w-5 h-5 text-blue-500" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Push to deploy",
    description:
      "Commodo nec sagittis tortor mauris sed. Turpis tortor quis scelerisque diam id accumsan nullam tempus. Pulvinar etiam lacus volutpat eu. Phasellus praesent ligula sit faucibus.",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates",
    description:
      "Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Simple queues",
    description:
      "Pellentesque sit elit congue ante nec amet. Dolor aenean curabitur viverra suspendisse iaculis eget. Nec mollis placerat ultricies euismod ut condimentum.",
    href: "#",
    icon: ArrowPathIcon,
  },
];

export default function FeaturesLanding() {
  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Deploy faster
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to deploy your app
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none text-indigo-600"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm/6 font-semibold text-indigo-600"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
