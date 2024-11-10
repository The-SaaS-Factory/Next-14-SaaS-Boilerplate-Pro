// src/app/blog/[slug]/MdxContent.tsx
"use client";

import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from 'next-mdx-remote/rsc';

// Define componentes interactivos
const MyButton = () => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    ¡Soy un botón interactivo!
  </button>
);

// Mapear componentes personalizados para MDX
const components = { MyButton };

export default function MdxContent({ source }) {
  return (
    <MDXProvider components={components}>
      <MDXRemote source={source} />
    </MDXProvider>
  );
}
