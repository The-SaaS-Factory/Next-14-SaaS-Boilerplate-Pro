// src/blog/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "/src/blog-contents");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      featuredImage: data.featuredImage,
      summary: data.summary,
      body: content,
      tags: data.tags,
    };
  });
}

// import fs from "fs";
// import path from "path";

// const postsDirectory = path.join(process.cwd(), "/src/blog"); // Cambia 'content' si usaste otro nombre

// export function getAllPosts() {
//   const fileNames = fs.readdirSync(postsDirectory);

//   return fileNames.map((fileName) => {
//     const slug = fileName.replace(/\.mdx$/, "");

//     return {
//       slug,
//       filePath: path.join(postsDirectory, fileName),
//     };
//   });
// }
