import { useEffect, useRef, useState } from "react";
import { LuFileText, LuGithub, LuMail, LuSend } from "react-icons/lu";
import { SiGooglescholar } from "react-icons/si";

import { contentBlocks, profile } from "../data/site-content";

const navigation = contentBlocks.map((block) => ({
  id: block.id,
  label: "navigationLabel" in block ? block.navigationLabel : block.title,
  href: `#${block.id}`,
}));

const profileLinkIcons = {
  CV: LuFileText,
  Email: LuMail,
  GitHub: LuGithub,
  "Google Scholar": SiGooglescholar,
} as const;

interface SectionNavigationLinksProps {
  activeSectionId: string;
}

function SectionNavigationLinks({
  activeSectionId,
}: SectionNavigationLinksProps) {
  return navigation.map((item) => {
    const active = item.id === activeSectionId;

    return (
      <a
        aria-current={active ? "location" : undefined}
        key={item.href}
        href={item.href}
      >
        <LuSend
          aria-hidden="true"
          className="profile-card__navigation-marker"
        />
        {item.label}
      </a>
    );
  });
}

export function ProfileSidebar() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    navigation[0]?.id ?? ""
  );
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const mobileNavigationRef = useRef<HTMLElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let animationFrame: number | null = null;

    const updateActiveSection = () => {
      animationFrame = null;

      const viewportMidpoint = window.innerHeight / 2;
      const sectionAtMidpoint = sections.find((section) => {
        const bounds = section.getBoundingClientRect();

        return (
          bounds.top <= viewportMidpoint && bounds.bottom >= viewportMidpoint
        );
      });

      if (sectionAtMidpoint) {
        setActiveSectionId(sectionAtMidpoint.id);
        return;
      }

      const firstBounds = sections[0].getBoundingClientRect();
      const lastSection = sections[sections.length - 1];
      const lastBounds = lastSection.getBoundingClientRect();

      if (viewportMidpoint < firstBounds.top) {
        setActiveSectionId(sections[0].id);
      } else if (viewportMidpoint > lastBounds.bottom) {
        setActiveSectionId(lastSection.id);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    sections.forEach((section) => resizeObserver.observe(section));
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    updateActiveSection();

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const profileCard = profileCardRef.current;

    if (!profileCard) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setShowMobileNavigation(
        !entry.isIntersecting && entry.boundingClientRect.bottom <= 0
      );
    });

    observer.observe(profileCard);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navigationElement = mobileNavigationRef.current;
    const activeLink = navigationElement?.querySelector<HTMLElement>(
      '[aria-current="location"]'
    );

    if (!showMobileNavigation || !navigationElement || !activeLink) {
      return;
    }

    const targetLeft =
      activeLink.offsetLeft -
      (navigationElement.clientWidth - activeLink.clientWidth) / 2;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    navigationElement.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      left: Math.max(0, targetLeft),
    });
  }, [activeSectionId, showMobileNavigation]);

  return (
    <>
      <div className="profile-card" ref={profileCardRef}>
        <div className="profile-card__portrait">
          <img
            alt={`${profile.name} portrait`}
            decoding="async"
            fetchPriority="high"
            height="410"
            src={profile.image}
            width="512"
          />
        </div>

        <div className="profile-card__identity">
          <div>
            <h1 className="profile-card__name">{profile.name}</h1>
            <p className="profile-card__native-name">
              {profile.nativeName} ·{" "}
              <span className="profile-card__handle-effect">
                <span className="profile-card__handle">{profile.handle}</span>
                <span aria-hidden="true" className="profile-card__unicorn">
                  Unicorn
                </span>
              </span>
            </p>
          </div>
        </div>

        <div className="profile-card__details">
          <p>{profile.role}</p>
          <p>{profile.affiliation}</p>
        </div>

        <nav className="profile-card__navigation" aria-label="Page sections">
          <SectionNavigationLinks activeSectionId={activeSectionId} />
        </nav>

        <div
          className="profile-card__links"
          aria-label="Contact and profiles"
          onMouseLeave={() => setExpandedLink(null)}
        >
          {profile.links.map((link) => {
            const external = link.href.startsWith("https://");
            const Icon = profileLinkIcons[link.label];

            return (
              <a
                className="profile-card__link"
                data-expanded={expandedLink === link.href ? "true" : undefined}
                key={link.href}
                href={link.href}
                onBlur={() => setExpandedLink(null)}
                onFocus={() => setExpandedLink(link.href)}
                onMouseEnter={() => setExpandedLink(link.href)}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                <Icon aria-hidden="true" className="profile-card__link-icon" />
                <span className="profile-card__link-label">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {showMobileNavigation && (
        <nav
          className="mobile-section-navigation"
          aria-label="Page sections"
          ref={mobileNavigationRef}
        >
          <SectionNavigationLinks activeSectionId={activeSectionId} />
        </nav>
      )}
    </>
  );
}
