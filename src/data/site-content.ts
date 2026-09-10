export interface SiteLink {
  label: string;
  href: string;
}

export interface Publication {
  authors: readonly string[];
  title: string;
  venue: string;
  image?: {
    src: string;
    alt: string;
  };
  links: readonly SiteLink[];
  selected: boolean;
  summary?: string;
  tags: readonly string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  description?: string;
  icon?: "gamepad" | "marketplace";
  logo?: {
    src: string;
    alt: string;
    compact?: boolean;
  };
  thumbnail?: {
    src: string;
    alt: string;
  };
  location?: string;
  meta?: string;
  links?: readonly SiteLink[];
}

interface BlockBase {
  id: string;
  title: string;
  navigationLabel?: string;
}

export interface MarkdownBlock extends BlockBase {
  type: "markdown";
  content: string;
}

export interface TimelineBlock extends BlockBase {
  type: "timeline";
  items: readonly TimelineItem[];
}

export interface PublicationsBlock extends BlockBase {
  type: "publications";
  items: readonly Publication[];
}

export type SiteContentBlock =
  MarkdownBlock | TimelineBlock | PublicationsBlock;

export const profile = {
  name: "Yujie Sun",
  nativeName: "孙瑜杰",
  handle: "UNIkeEN",
  image: "/images/profile.webp",
  role: "PhD Student, Computer Science",
  affiliation: "Shanghai Jiao Tong University",
  email: "sunyujie@sjtu.edu.cn",
  links: [
    { label: "CV", href: "/cv.pdf" },
    { label: "Email", href: "mailto:sunyujie@sjtu.edu.cn" },
    { label: "GitHub", href: "https://github.com/UNIkeEN" },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=QC8groIAAAAJ&hl=en",
    },
  ],
} as const;

export const publicationAuthorLinks: Readonly<Record<string, string>> = {
  "Chaoyue Niu": "https://cs.sjtu.edu.cn/jiaoshiml/niuchaoyue.html",
  "Fan Wu": "https://cs.sjtu.edu.cn/jiaoshiml/wufan.html",
  "Zhiwen Chen": "https://czwxian.github.io/",
  "Zhuoqiang Cai": "https://vhahahav.github.io/",
};

const publications = [
  {
    authors: [
      "Zhengxiang Huang",
      "Shengheng Chen",
      "Chaoyue Niu",
      "Yujie Sun",
      "Zhaode Wang",
      "Zeyu Zhao",
      "Chengfei Lv",
      "Fan Wu",
      "Guihai Chen",
    ],
    title:
      "Dynamic Flow, Static Graph: KV Cache Reuse for Efficient LLM Serving on Mobile NPUs",
    venue: "EuroSys 2027",
    links: [],
    selected: false,
    tags: ["LLM Systems", "Mobile Computing"],
  },
  {
    authors: [
      "Zhuoqiang Cai",
      "Yujie Sun",
      "Chaoyue Niu",
      "Hongyun Yu",
      "Zhiwen Chen",
      "Chengfei Lv",
      "Fan Wu",
    ],
    title:
      "ECHO: Dyadic 3D Facial Motion Generation with Asymmetric Deterministic Articulation and Stochastic Reaction",
    venue: "ACM MM 2026",
    image: {
      src: "/publications/echo.webp",
      alt: "ECHO method overview",
    },
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2609.05506" }],
    selected: true,
    tags: ["3D Vision"],
  },
  {
    authors: [
      "Yujie Sun",
      "Zhuoqiang Cai",
      "Chaoyue Niu",
      "Jianchuan Chen",
      "Zhiwen Chen",
      "Chengfei Lv",
      "Fan Wu",
    ],
    title:
      "FHAvatar: Fast and High-Fidelity Reconstruction of Face-and-Hair Composable 3D Head Avatar from Few Casual Captures",
    venue: "CVPR 2026",
    image: {
      src: "/publications/fhavatar.webp",
      alt: "FHAvatar method overview and applications",
    },
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2603.23345" }],
    selected: true,
    summary:
      "We present FHAvatar, a novel framework for reconstructing 3D Gaussian avatars with composable face and hair components from an arbitrary number of views.",
    tags: ["3D Vision"],
  },
  {
    authors: [
      "Wei Li",
      "Borui Yang",
      "Yujie Sun",
      "Suyu Chen",
      "Yuting Chen",
      "Liyao Xiang",
    ],
    title:
      "CodeMark: Contextual and Natural Watermarking for Tracing Code Snippet Provenance",
    venue: "TDSC 2025",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2305.12461" }],
    selected: false,
    tags: ["Security"],
  },
  {
    authors: [
      "Tiancheng Fang",
      "Chaoyue Niu",
      "Yujie Sun",
      "Chengfei Lv",
      "Xiaotang Jiang",
      "Ben Xue",
      "Fan Wu",
      "Guihai Chen",
    ],
    title:
      "An End-to-End, Low-Cost, and High-Fidelity 3D Video Pipeline for Mobile Devices",
    venue: "MobiCom 2024",
    image: {
      src: "/publications/mobile-3d-video.webp",
      alt: "End-to-end mobile 3D video pipeline overview",
    },
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2412.10443" }],
    selected: false,
    tags: ["3D Vision", "Mobile Computing"],
  },
] as const satisfies readonly Publication[];

export const contentBlocks = [
  {
    id: "about",
    title: "About",
    type: "markdown",
    content: `I am a PhD student at the School of Computer Science, ![SJTU](/institutions/sjtu.png) Shanghai Jiao Tong University (SJTU), supervised by [Prof. Fan Wu](https://cs.sjtu.edu.cn/jiaoshiml/wufan.html) and [Asst. Prof. Chaoyue Niu](https://cs.sjtu.edu.cn/jiaoshiml/niuchaoyue.html). Previously, I received my B. Eng. degree in Computer Science and Engineering from ![SJTU](/institutions/sjtu.png) SJTU in 2025.

### Research interests

- 3D avatar reconstruction and generation
- 3D scene reconstruction, understanding, and human interaction
- Large language models and mobile agents

### Community

- Vice President and Head of the Tech Department at ![SJMC](/institutions/sjmc.png) [SJTU Minecraft Club (SJMC)](https://mc.sjtu.cn/welcome)
- Core Member at ![SJTU-Geek](/institutions/sjtu-geek.png) [SJTU Student Information Technology Association (SJTU-Geek)](https://geek.sjtu.edu.cn)`,
  },
  {
    id: "publications",
    title: "Publications",
    type: "publications",
    items: publications,
  },
  {
    id: "projects",
    title: "Open-source projects",
    navigationLabel: "Projects",
    type: "timeline",
    items: [
      {
        period: "2024 – Present",
        title: "SJMC Launcher",
        description: "A cross-platform Minecraft launcher.",
        thumbnail: {
          src: "/projects/sjmcl-header.webp",
          alt: "SJMCL project banner",
        },
        meta: "Team Leader",
        links: [
          { label: "Website", href: "https://mc.sjtu.cn/sjmcl" },
          { label: "GitHub", href: "https://github.com/UNIkeEN/SJMCL" },
          {
            label: "Video",
            href: "https://www.bilibili.com/video/BV1gMnJzGEiM",
          },
        ],
      },
      {
        period: "2023 – Present",
        title: "SJTU Aixinwu",
        description: "A campus marketplace for exchanging idle items.",
        icon: "marketplace",
        meta: "Maintainer",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/SJTU-Geek/Aixinwu-front",
          },
        ],
      },
    ],
  },
  {
    id: "awards",
    title: "Awards",
    type: "markdown",
    content: `- **2025** — **Winner (1st Place)**, CVPR Photorealistic 3D Head Avatars Workshop
- **2025** — Shanghai Outstanding Graduates (**Top 1%**)
- **2024** — Dong Scholarship (**Top 5%**)
- **2024** — Silver Award (Shanghai Municipal Level), China International College Students' Innovation Competition`,
  },
  {
    id: "experience",
    title: "Experience",
    type: "timeline",
    items: [
      {
        period: "2024.07 – 2025.09",
        title: "Taobao and Tmall Group, Alibaba Group",
        meta: "Research Intern",
        location: "Hangzhou, China",
        logo: {
          src: "/companies/taobao-tmall-group.png",
          alt: "Taobao and Tmall Group",
        },
      },
      {
        period: "2023.07 – 2023.09",
        title: "Youzan Technology",
        meta: "Backend Software Engineer Intern",
        location: "Hangzhou, China",
        logo: {
          src: "/companies/youzan.png",
          alt: "Youzan",
          compact: true,
        },
      },
    ],
  },
] as const satisfies readonly SiteContentBlock[];
