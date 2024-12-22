import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import MdxContent from "./MdxContent";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import ShareBlogPost from "./ui/ShareBlogPost";
import { constants } from "@/lib/constants";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/blog-contents");
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ""),
  }));
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/blog-contents", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  const article = data;
  return (
    <article className="prose container mx-auto mt-14 max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
        <div className="text-muted-foreground mb-4 flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <time dateTime={new Date(article.date).toISOString()}>
            {article.date}
          </time>
          <span className="mx-2">•</span>
          <span>{article.author}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, index) => (
            <div key={tag + index}>
              <Badge variant="secondary">{tag}</Badge>
            </div>
          ))}
        </div>
      </header>

      <hr className="my-8" />

      <MdxContent source={mdxSource} />
      <hr className="my-7" />
      <ShareBlogPost link={`${constants.appUrl}/blog/${slug}`} />
    </article>
  );
}
