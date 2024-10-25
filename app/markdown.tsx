import React from 'react';
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function MarkDownTest({source} : {source: string}) {

  return (
    <Markdown
    rehypePlugins={[rehypeRaw]}
    components={{
      p({ children }) {
          return <p className="mb-4 last:mb-0">{children}</p>; // increased bottom margin for better spacing
      },
      h1({ children }) {
          return <h1 className="font-bold text-3xl mb-6 mt-8">{children}</h1>; // added margin and adjusted font size
      },
      h2({ children }) {
          return <h2 className="font-bold text-2xl mb-4 mt-6">{children}</h2>; // added margin and adjusted font size
      },
      h3({ children }) {
          return <h3 className="font-bold text-xl mb-3 mt-5">{children}</h3>; // added margin and adjusted font size
      },
      ol({ children }) {
          return <ol className="list-decimal pl-8">{children}</ol>; // added padding for better list item indent
      },
      ul({ children }) {
          return <ul className="list-disc pl-8">{children}</ul>; // added padding for better list item indent
      },
      li({ children }) {
          return <li className="mb-2">{children}</li>; // kept spacing consistent
      },
      blockquote({ children }) {
        return (
            <blockquote className="relative border-l-4 border-gray-500 bg-gray-100 p-4 italic my-4">
            {children}
          </blockquote>
          ); // changed border styling, background, and added padding for emphasis
        },
      }}
    >
    {source}
  </Markdown>
  );

}