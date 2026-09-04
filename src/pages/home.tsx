import { LuArrowUp } from "react-icons/lu";

import { AmbientBackground } from "../components/ambient-background";
import { ContentBlock } from "../components/content-block";
import { ProfileSidebar } from "../components/profile-sidebar";
import { contentBlocks, profile } from "../data/site-content";
import { HomeLayout } from "../layouts/home-layout";

import "../styles/home.css";

export function meta() {
  const description =
    "Yujie Sun is a PhD student at Shanghai Jiao Tong University researching 3D vision, avatars, large language models, and mobile agents.";

  return [
    { title: `${profile.name} (${profile.nativeName})` },
    { name: "description", content: description },
    {
      property: "og:title",
      content: `${profile.name} (${profile.nativeName})`,
    },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://unikeen.github.io/" },
    {
      property: "og:image",
      content: `https://unikeen.github.io${profile.image}`,
    },
    { name: "twitter:card", content: "summary" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://unikeen.github.io/",
    },
  ];
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: [profile.nativeName, profile.handle],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Shanghai Jiao Tong University",
  },
  email: `mailto:${profile.email}`,
  image: `https://unikeen.github.io${profile.image}`,
  jobTitle: profile.role,
  sameAs: profile.links
    .filter((link) => link.href.startsWith("https://"))
    .map((link) => link.href),
  url: "https://unikeen.github.io/",
};

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <HomeLayout sidebar={<ProfileSidebar />}>
        {contentBlocks.map((block) => (
          <ContentBlock block={block} key={block.id} />
        ))}
        <div className="back-to-top">
          <a aria-label="Back to top" href="#top">
            <LuArrowUp aria-hidden="true" />
            Back to Top
          </a>
        </div>
      </HomeLayout>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </>
  );
}
