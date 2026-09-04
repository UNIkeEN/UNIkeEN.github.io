import {
  LuBriefcaseBusiness,
  LuCalendarDays,
  LuGamepad2,
  LuMapPin,
  LuShoppingBag,
} from "react-icons/lu";

import type { TimelineItem } from "../data/site-content";
import { ActionLink } from "./action-link";

interface TimelineListProps {
  items: readonly TimelineItem[];
}

export function TimelineList({ items }: TimelineListProps) {
  return (
    <ol className="timeline-list">
      {items.map((item) => {
        const ItemIcon =
          item.icon === "gamepad"
            ? LuGamepad2
            : item.icon === "marketplace"
              ? LuShoppingBag
              : null;

        return (
          <li key={`${item.period}-${item.title}`}>
            <div
              className={`timeline-list__visual${ItemIcon ? " timeline-list__visual--icon" : ""}`}
            >
              {item.logo && (
                <img
                  alt={item.logo.alt}
                  className={`timeline-list__logo${item.logo.compact ? " timeline-list__logo--compact" : ""}`}
                  height="540"
                  loading="lazy"
                  src={item.logo.src}
                  width="720"
                />
              )}
              {item.thumbnail && (
                <img
                  alt={item.thumbnail.alt}
                  className="timeline-list__thumbnail"
                  height="540"
                  loading="lazy"
                  src={item.thumbnail.src}
                  width="720"
                />
              )}
              {ItemIcon && <ItemIcon aria-hidden="true" />}
            </div>
            <div className="timeline-list__content">
              <h3>{item.title}</h3>
              {item.description && (
                <p className="timeline-list__description">{item.description}</p>
              )}
              <div className="timeline-list__details">
                <div className="timeline-list__detail-row">
                  {item.meta && (
                    <span>
                      <LuBriefcaseBusiness aria-hidden="true" />
                      {item.meta}
                    </span>
                  )}
                  <span>
                    <LuCalendarDays aria-hidden="true" />
                    {item.period}
                  </span>
                </div>
                {item.location && (
                  <span>
                    <LuMapPin aria-hidden="true" />
                    {item.location}
                  </span>
                )}
              </div>
              {item.links && item.links.length > 0 && (
                <div className="timeline-list__links">
                  {item.links.map((link) => (
                    <ActionLink key={link.href} link={link} />
                  ))}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
