import React from "react";

interface Props {
  text: string;
  highlight: string;
  className?: string;
}

const HighlightText = ({ text, highlight, className }: Props) => {
  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span
          key={index}
          className="text-indigo-600 underline dark:text-indigo-500"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <span className={className}>{getHighlightedText(text, highlight)}</span>
  );
};

export default HighlightText;
