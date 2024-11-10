import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { constants } from "@/lib/constants";

export default async function Blog() {
  const posts = getAllPosts();

  return (
    <div className="mt-14">
      <div className="min-h-screen bg-white">
        <div className="relative bg-blue-600 text-white px-4 py-16 md:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/4 transform text-blue-500/20"
              width="800"
              height="800"
              fill="none"
              viewBox="0 0 800 800"
            >
              <circle cx="400" cy="400" r="400" fill="currentColor" />
            </svg>
            <svg
              className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/4 transform text-blue-500/20"
              width="800"
              height="800"
              fill="none"
              viewBox="0 0 800 800"
            >
              <circle cx="400" cy="400" r="400" fill="currentColor" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-7xl px-4">
            <p className="mb-4 text-lg font-medium">Blog</p>
            <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {constants.appName} Blog
            </h1>
            <div className="max-w-xl">
              <p className="mb-6 text-lg text-blue-100">
                Subscribe to learn about new product features, the latest in
                technology, solutions, and updates.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/95 text-black"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article className="group" key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={post.featuredImage ?? "/assets/img/placeholder.webp"}
                      alt="Two people looking at laptop"
                      width={600}
                      height={400}
                      className="aspect-[4/3] object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      {post.date}
                    </div>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-muted-foreground">{post.summary}</p>
                    <div className="flex gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
