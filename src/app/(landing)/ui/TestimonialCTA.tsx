import { StarIcon } from "@heroicons/react/20/solid";

export default function TestimonialCTA() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <p className="sr-only">5 out of 5 stars</p>
        <div className="flex gap-x-1 text-indigo-600">
          <StarIcon aria-hidden="true" className="h-5 w-5 flex-none" />
          <StarIcon aria-hidden="true" className="h-5 w-5 flex-none" />
          <StarIcon aria-hidden="true" className="h-5 w-5 flex-none" />
          <StarIcon aria-hidden="true" className="h-5 w-5 flex-none" />
          <StarIcon aria-hidden="true" className="h-5 w-5 flex-none" />
        </div>
        <blockquote className="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9">
          <p>
            “Launching a SaaS in a weekend is normally almost impossible,
            however, with this boilerplate, I did it. It's great”
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-x-6">
          <img
            alt=""
            src="/assets/img/royler.jpg"
            className="h-12 w-12 rounded-full bg-gray-50"
          />
          <div className="text-sm/6">
            <div className="font-semibold text-gray-900">Royler Marichal</div>
            <div className="mt-0.5 text-gray-600">CEO of CluzStudio</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
