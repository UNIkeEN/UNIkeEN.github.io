import type { SiteContentBlock } from "../data/site-content";
import { profile } from "../data/site-content";
import { ContentCard } from "./content-card";
import { MarkdownContent } from "./markdown-content";
import { PublicationList } from "./publication-list";
import { TimelineList } from "./timeline-list";

interface ContentBlockProps {
  block: SiteContentBlock;
}

export function ContentBlock({ block }: ContentBlockProps) {
  let content;

  switch (block.type) {
    case "markdown":
      content = <MarkdownContent content={block.content} />;
      break;
    case "publications":
      content = (
        <PublicationList
          highlightedAuthor={profile.name}
          publications={block.items}
        />
      );
      break;
    case "timeline":
      content = <TimelineList items={block.items} />;
      break;
  }

  return (
    <ContentCard
      badge={block.type === "publications" ? block.items.length : undefined}
      id={block.id}
      title={block.title}
    >
      {content}
    </ContentCard>
  );
}
