import React from "react";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";

type Props = {
  text: string;
};

// Initialize Markdown-It
const md = markdownit({
  html: true, // Allow HTML tags in Markdown
  linkify: true, // Automatically link URLs
  typographer: true, // Enable smart quotes, dashes, etc.
});

const Markdown = ({ text }: Props) => {
  // Render Markdown to HTML
  const htmlContent = md.render(text);

  // Check for DOM availability (important for SSR)
  const sanitizedContent =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(htmlContent)
      : htmlContent; // If SSR, skip sanitization

  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default Markdown;
