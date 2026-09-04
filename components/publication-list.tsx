import { Fragment, useState } from "react";

import { publicationAuthorLinks, type Publication } from "../data/site-content";
import { ActionLink } from "./action-link";

interface PublicationListProps {
  highlightedAuthor: string;
  publications: readonly Publication[];
}

const ALL_FILTER = "all";
const SELECTED_FILTER = "selected";
const TAG_ORDER = [
  "3D Vision",
  "LLM Systems",
  "Mobile Computing",
  "Security",
] as const;

interface PublicationFilter {
  count: number;
  id: string;
  label: string;
}

function getPublicationFilters(
  publications: readonly Publication[]
): PublicationFilter[] {
  const tagCounts = new Map<string, number>();

  for (const publication of publications) {
    for (const tag of publication.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [
    { id: ALL_FILTER, label: "All", count: publications.length },
    {
      id: SELECTED_FILTER,
      label: "Selected",
      count: publications.filter((publication) => publication.selected).length,
    },
    ...Array.from(tagCounts)
      .sort(([firstTag], [secondTag]) => {
        const firstIndex = TAG_ORDER.indexOf(
          firstTag as (typeof TAG_ORDER)[number]
        );
        const secondIndex = TAG_ORDER.indexOf(
          secondTag as (typeof TAG_ORDER)[number]
        );

        return (
          (firstIndex === -1 ? TAG_ORDER.length : firstIndex) -
          (secondIndex === -1 ? TAG_ORDER.length : secondIndex)
        );
      })
      .map(([label, count]) => ({
        id: `tag:${label}`,
        label,
        count,
      })),
  ];
}

function AuthorName({
  highlighted,
  name,
}: {
  highlighted: boolean;
  name: string;
}) {
  if (highlighted) {
    return <strong>{name}</strong>;
  }

  const href = publicationAuthorLinks[name];

  return href ? (
    <a href={href} rel="noreferrer" target="_blank">
      {name}
    </a>
  ) : (
    name
  );
}

export function PublicationList({
  highlightedAuthor,
  publications,
}: PublicationListProps) {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const filters = getPublicationFilters(publications);
  const visiblePublications = publications.filter((publication) => {
    if (activeFilter === ALL_FILTER) {
      return true;
    }

    if (activeFilter === SELECTED_FILTER) {
      return publication.selected;
    }

    return publication.tags.includes(activeFilter.slice("tag:".length));
  });

  return (
    <div>
      <div className="publication-filters" aria-label="Filter publications">
        {filters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.id}
            className={`publication-filter${
              filter.id === ALL_FILTER
                ? " publication-filter--all"
                : filter.id === SELECTED_FILTER
                  ? " publication-filter--selected"
                  : ""
            }`}
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            type="button"
          >
            {filter.label}
            <span>{filter.count}</span>
          </button>
        ))}
      </div>

      <ol className="publication-list" aria-live="polite">
        {visiblePublications.map((publication) => (
          <li
            className={`publication${publication.selected ? " publication--selected" : ""}`}
            key={publication.title}
          >
            <img
              alt={publication.image.alt}
              className="publication__image"
              height="540"
              loading="lazy"
              src={publication.image.src}
              width="720"
            />
            <div className="publication__content">
              <div className="publication__venue-tags">
                {publication.selected && (
                  <span className="publication__selected-tag">Selected</span>
                )}
                <span className="publication__venue-tag">
                  {publication.venue}
                </span>
              </div>
              <h3 className="publication__title">{publication.title}</h3>
              <p className="publication__authors">
                {publication.authors.map((author, index) => (
                  <Fragment key={author}>
                    {index > 0 && ", "}
                    <AuthorName
                      highlighted={author === highlightedAuthor}
                      name={author}
                    />
                  </Fragment>
                ))}
              </p>
              {publication.links.length > 0 && (
                <div className="publication__links">
                  {publication.links.map((link) => (
                    <ActionLink key={link.href} link={link} />
                  ))}
                </div>
              )}
              {publication.summary && (
                <p className="publication__summary">{publication.summary}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
