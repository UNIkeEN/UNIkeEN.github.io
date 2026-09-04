import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, ...props }) => {
            const external = href?.startsWith("http");

            return (
              <a
                {...props}
                href={href}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              />
            );
          },
          img: ({ alt, src, ...props }) => {
            const institutionIcon = src?.startsWith("/institutions/");

            return (
              <img
                {...props}
                alt={institutionIcon ? "" : alt || ""}
                aria-hidden={institutionIcon ? "true" : undefined}
                className={
                  institutionIcon
                    ? "markdown-content__institution-icon"
                    : undefined
                }
                height={institutionIcon ? 24 : undefined}
                src={src}
                width={institutionIcon ? 24 : undefined}
              />
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
