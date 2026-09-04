import type { ReactNode } from "react";

interface ContentCardProps {
  badge?: number;
  children: ReactNode;
  id: string;
  title: string;
}

export function ContentCard({ badge, children, id, title }: ContentCardProps) {
  return (
    <section className="content-card" id={id}>
      <h2 className="content-card__title">
        {title}
        {badge !== undefined && (
          <span
            aria-label={`${badge} ${title.toLowerCase()}`}
            className="content-card__title-badge"
          >
            {badge}
          </span>
        )}
      </h2>
      <div className="content-card__body">{children}</div>
    </section>
  );
}
