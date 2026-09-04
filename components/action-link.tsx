import { LuExternalLink, LuFileText, LuGithub, LuPlay } from "react-icons/lu";

import type { SiteLink } from "../data/site-content";

const actionLinkIcons = {
  GitHub: LuGithub,
  Paper: LuFileText,
  Video: LuPlay,
} as const;

interface ActionLinkProps {
  link: SiteLink;
}

export function ActionLink({ link }: ActionLinkProps) {
  const Icon =
    actionLinkIcons[link.label as keyof typeof actionLinkIcons] ??
    LuExternalLink;
  const external = link.href.startsWith("http");

  return (
    <a
      className="action-link"
      href={link.href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <Icon aria-hidden="true" />
      {link.label}
    </a>
  );
}
