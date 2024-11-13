"use client";

import { MDXRemote } from "next-mdx-remote";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

function CodeBlock({ children, language = "tsx" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: copied ? "#4CAF50" : "#333",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        wrapLines={true}
        showLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

const components = {
  img: (props) => (
    <img
      style={{
        maxWidth: "100%",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
      {...props}
    />
  ),
  ul: (props) => (
    <ul style={{ listStyleType: "disc", marginTop: "1em" }} {...props} />
  ),
  li: (props) => (
    <li style={{ marginTop: "0.5em", marginLeft: "1.5em" }} {...props} />
  ),
  p: (props) => <p style={{ marginTop: "1em" }} {...props} />,
  h2: (props) => (
    <h2 style={{ fontSize: "1.5em", marginTop: "1em" }} {...props} />
  ),
  h3: (props) => (
    <h3 style={{ fontSize: "1.25em", marginTop: "1em" }} {...props} />
  ),
  code: ({ children, className }) => {
    const language = className?.replace("language-", "") || "tsx";
    return <CodeBlock language={language}>{children}</CodeBlock>;
  },
};

export default function MdxContent({ source }) {
  return <MDXRemote {...source} components={components} />;
}
