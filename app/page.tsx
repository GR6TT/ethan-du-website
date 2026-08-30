"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";

type Language = "zh" | "en";

const nav = {
  zh: [
    ["关于", "about"],
    ["媒体", "media"],
    ["洞察", "insights"],
    ["项目作品", "projects"],
  ],
  en: [
    ["About", "about"],
    ["Media", "media"],
    ["Insights", "insights"],
    ["Projects", "projects"],
  ],
} as const;

const copy = {
  zh: {
    heroName: "杜易展",
    heroTitle: "创作者",
    heroBody: "杜易展的个人网站，收录其经历、项目与观点。",
    learnMore: "了解更多",
    achievements: "Achievements",
    milestones: "Highlighted Milestones",
    milestoneIntro: "杜易展的重要经历与阶段性成果。",
    placeholder: "即将更新",
    readMore: "了解更多",
    identityTitle: "关于杜易展",
    identityBody: "个人经历、关注领域与相关工作将在此持续更新。",
    media: "媒体报道",
    mediaIntro: "关于杜易展的媒体报道与公开记录。",
    seeAll: "查看全部",
    tabs: ["社交账号", "观点", "视频集锦"],
    insightIntro: "收录对商业、内容与创新的观察。",
    socialIntro: "关注杜易展在不同平台发布的公开内容。",
    socialPlatform: "社交平台",
    openSocial: "访问账号 ↗",
    projects: "项目作品",
    projectsTitle: "项目作品",
    projectsBody: "收录杜易展参与的代表性项目与作品。",
    openProject: "查看完整方案",
    footerLine: "杜易展个人网站",
    menu: "菜单",
    close: "关闭",
  },
  en: {
    heroName: "Ethan Du",
    heroTitle: "Creator",
    heroBody: "The personal website of Ethan Du, featuring selected milestones, projects, and perspectives.",
    learnMore: "Learn More",
    achievements: "Achievements",
    milestones: "Highlighted Milestones",
    milestoneIntro: "Selected milestones and achievements from Ethan Du.",
    placeholder: "Coming soon",
    readMore: "Read More",
    identityTitle: "About Ethan Du",
    identityBody: "Background, areas of interest, and related work will be updated here.",
    media: "Media Coverage",
    mediaIntro: "Media coverage and public records featuring Ethan Du.",
    seeAll: "See All",
    tabs: ["Social Channels", "Perspectives", "Video Highlights"],
    insightIntro: "Perspectives on business, content, and innovation.",
    socialIntro: "Follow Ethan Du's public updates across platforms.",
    socialPlatform: "Social platform",
    openSocial: "Visit profile ↗",
    projects: "Projects",
    projectsTitle: "Selected Projects",
    projectsBody: "Selected projects and work involving Ethan Du.",
    openProject: "View Full Proposal",
    footerLine: "Personal website of Ethan Du",
    menu: "Menu",
    close: "Close",
  },
} as const;

const milestoneCards = [
  {
    index: "01",
    tone: "midnight",
    titleZh: "全国冠军",
    titleEn: "National Champion",
    bodyZh: "首届淘宝大学生创新挑战赛 · 2024",
    bodyEn: "The first Taobao University Student Innovation Challenge · 2024",
    image: "/taobao-final-arrival.jpg",
    href: "#projects",
  },
  { index: "02", tone: "electric", titleZh: "经历", titleEn: "Experience" },
  { index: "03", tone: "paper", titleZh: "项目", titleEn: "Projects" },
  { index: "04", tone: "violet", titleZh: "观点", titleEn: "Perspectives" },
] as const;

const mediaCards = [
  {
    date: "2024.10",
    categoryZh: "区域合作",
    categoryEn: "Regional Initiative",
    titleZh: "上财创投校友会：杜易展协办长三角企业出海服务中心成立",
    titleEn: "SUFE Venture Alumni Association: Ethan Du Co-organizes the Launch of the Yangtze River Delta Enterprise Globalization Service Center",
    bodyZh: "长三角智慧城区合作发展服务联盟中心整合品牌建设、信息服务、法律合规与国际市场资源，为长三角企业提供出海支持。",
    bodyEn: "The center connects brand, information, legal compliance, and international market resources to support Yangtze River Delta enterprises expanding globally.",
    image: "/yangtze-export-center.webp",
    brand: "YRD · 2024",
    href: "https://mp.weixin.qq.com/s/Rh-VUVlhFlsOo-HJWkcNaA",
  },
  {
    date: "2024.07",
    categoryZh: "科创峰会",
    categoryEn: "Technology Summit",
    titleZh: "财联社&科创板日报：杜易展所执委的 Eagle 创投支持科创板开市五周年峰会",
    titleEn: "CLS & STAR Market Daily: Eagle Ventures, Where Ethan Du Serves on the Executive Committee, Supports the STAR Market Fifth Anniversary Summit",
    bodyZh: "峰会由上海市投资促进服务中心与《科创板日报》主办，吸引近 900 人报名，汇聚政府、学界、科创企业与投资机构代表，共议产业创新与资本协同。杜易展所执委的 Eagle 创投参与支持活动举办。",
    bodyEn: "Hosted by the Shanghai Investment Promotion Service Center and STAR Market Daily, the summit drew nearly 900 registrations and convened representatives from government, academia, technology companies, and investment institutions. Eagle Ventures, where Ethan Du serves on the executive committee, supported the event.",
    image: "/star-market-fifth-anniversary-leveled.webp",
    brand: "STAR MARKET · 2024",
    href: "https://www.cls.cn/detail/1744399",
  },
  {
    date: "2024.05",
    categoryZh: "赛事",
    categoryEn: "Competition",
    titleZh: "淘宝：杜易展获淘宝营销商赛全国冠军",
    titleEn: "Taobao: Ethan Du Wins the National Marketing Innovation Challenge",
    bodyZh: "历经近两个月赛程，杜易展与团队从全国 500 多支参赛队伍中脱颖而出，获首届淘宝大学生创新挑战赛全国总冠军。",
    bodyEn: "After nearly two months of competition, Ethan Du and his team emerged from more than 500 teams nationwide to win the inaugural Taobao University Student Innovation Challenge.",
    image: "/taobao-final-group.jpg",
    brand: "TAOBAO · 2024",
    href: "http://t.cn/A6Huj3XQ",
  },
] as const;
const socialCards = [
  {
    number: "01",
    slug: "douyin",
    platformZh: "抖音",
    platformEn: "Douyin",
    summaryZh: "短视频与日常记录。",
    summaryEn: "Short-form video and everyday notes.",
    href: "https://www.douyin.com/search/ethandue?type=user",
  },
  {
    number: "02",
    slug: "linkedin",
    platformZh: "领英",
    platformEn: "LinkedIn",
    summaryZh: "职业经历与公开动态。",
    summaryEn: "Professional experience and public updates.",
    href: "https://www.linkedin.com/in/yizhan-du-148494306",
  },
  {
    number: "03",
    slug: "xiaohongshu",
    platformZh: "小红书",
    platformEn: "Xiaohongshu",
    summaryZh: "生活方式、观察与图文记录。",
    summaryEn: "Lifestyle, observations, and visual notes.",
    href: "https://xhslink.com/m/90oLA9aKLTe",
  },
  {
    number: "04",
    slug: "instagram",
    platformZh: "Instagram",
    platformEn: "Instagram",
    summaryZh: "照片、视觉记录与日常片段。",
    summaryEn: "Photography, visual notes, and daily moments.",
    href: "https://www.instagram.com/duyizhan0912",
  },
] as const;

const insightCards = ["No. 01", "No. 02", "No. 03", "No. 04"];
const projectCards = [
  {
    number: "001",
    image: "/city-trendbook-plan.webp",
    position: "center",
    titleZh: "城市流行志 营销方案",
    titleEn: "City Trendbook Marketing Plan",
    bodyZh: "淘宝营销商赛冠军项目",
    bodyEn: "Taobao marketing competition champion project",
    href: "/city-trendbook-final.pdf",
    linkType: "document",
  },
  {
    number: "002",
    image: "/refresh-campus-care-cover-v2.webp",
    position: "center",
    titleZh: "焕新日记 洗护创业",
    titleEn: "Refresh Journal Laundry Venture",
    bodyZh: "面向高校社区提供鞋履、衣物洗护服务，与多家本地门店建立合作，日访问量超过 2,000，客户满意度保持在 98% 以上。",
    bodyEn: "A shoe and garment care service for university communities, developed with multiple local retail partners and reaching 2,000+ daily views with 98%+ customer satisfaction.",
    href: "#小程序://杉苑/Wn50paCRYBgVh9f",
    linkType: "mini-program",
  },
] as const;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "right" ? "M8 5l7 7-7 7" : "M16 5l-7 7 7 7"} />
    </svg>
  );
}

function SocialLogo({ platform }: { platform: (typeof socialCards)[number]["slug"] }) {
  if (platform === "linkedin") {
    return <span className="social-app-icon linkedin-icon" aria-hidden="true"><b>in</b></span>;
  }

  if (platform === "xiaohongshu") {
    return <span className="social-app-icon xiaohongshu-icon" aria-hidden="true"><b>小红书</b></span>;
  }

  if (platform === "instagram") {
    return (
      <span className="social-app-icon instagram-icon" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <rect x="24" y="24" width="72" height="72" rx="23" />
          <circle cx="60" cy="60" r="18" />
          <circle cx="84" cy="36" r="5" />
        </svg>
      </span>
    );
  }

  return (
    <span className="social-app-icon douyin-icon" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <path className="douyin-cyan" d="M67 24v47a20 20 0 1 1-16-19v14a7 7 0 1 0 3 6V24h13c3 10 11 18 23 20v14c-9-1-16-4-23-9Z" />
        <path className="douyin-pink" d="M74 20v47a20 20 0 1 1-16-19v14a7 7 0 1 0 3 6V20h13c3 10 11 18 23 20v14c-9-1-16-4-23-9Z" />
        <path className="douyin-white" d="M71 22v47a20 20 0 1 1-16-19v14a7 7 0 1 0 3 6V22h13c3 10 11 18 23 20v14c-9-1-16-4-23-9Z" />
      </svg>
    </span>
  );
}

function RailControls({ railId }: { railId: string }) {
  const move = (direction: number) => {
    const rail = document.getElementById(railId);
    rail?.scrollBy({ left: direction * rail.clientWidth * 0.72, behavior: "smooth" });
  };

  return (
    <div className="rail-controls" aria-label="Carousel controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous">
        <ArrowIcon direction="left" />
      </button>
      <button type="button" onClick={() => move(1)} aria-label="Next">
        <ArrowIcon />
      </button>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [miniProgramCopied, setMiniProgramCopied] = useState(false);
  const t = copy[language];
  const primaryNav = nav[language];
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openProject = async (event: MouseEvent<HTMLAnchorElement>, href: string, linkType: string) => {
    if (linkType !== "mini-program") return;
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(href);
      setMiniProgramCopied(true);
      window.setTimeout(() => setMiniProgramCopied(false), 2800);
    } catch {
      window.prompt(language === "zh" ? "复制小程序口令后在微信中打开" : "Copy this Mini Program link and open it in WeChat", href);
    }
  };

  return (
    <main className="site-shell" id="top">
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-active" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Ethan Du home" onClick={closeMenu}>
            <img src="/ethan-signature.png" alt="Ethan Du" />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {primaryNav.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="language-toggle"
              type="button"
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              aria-label={language === "zh" ? "Switch to English" : "切换至中文"}
            >
              <span className={language === "en" ? "active" : ""}>EN</span>
              <i aria-hidden="true"><b /></i>
              <span className={language === "zh" ? "active" : ""}>中文</span>
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? t.close : t.menu}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {primaryNav.map(([label, id], index) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </nav>
      </div>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-glow" />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="hero-name">{t.heroName}</p>
          <h1 id="hero-title">{t.heroTitle}</h1>
          <p className="hero-body">{t.heroBody}</p>
          <a className="pill-button light" href="#about">
            {t.learnMore}
            <ArrowIcon />
          </a>
        </div>
        <div className="sound-control" aria-hidden="true">
          <span className="speaker">×</span>
          <span className="sound-line"><i /></span>
        </div>
      </section>

      <section className="milestones section" id="about">
        <div className="section-heading" data-reveal>
          <div>
            <p className="blue-label">{t.achievements}</p>
            <h2>{t.milestones}</h2>
            <p className="section-intro">{t.milestoneIntro}</p>
          </div>
          <RailControls railId="milestone-rail" />
        </div>

        <div className="wide-rail" id="milestone-rail" data-reveal>
          {milestoneCards.map((card) => (
            <article className={`milestone-card ${card.tone} ${"image" in card ? "has-photo" : ""}`} key={card.index}>
              {"image" in card && <img className="milestone-photo" src={card.image} alt="" />}
              <span className="card-index">{card.index}</span>
              <div className="card-copy">
                <h3>{language === "zh" ? card.titleZh : card.titleEn}</h3>
                <p>{"bodyZh" in card ? (language === "zh" ? card.bodyZh : card.bodyEn) : t.placeholder}</p>
                <a className="pill-button light compact" href={"href" in card ? card.href : "#about"}>
                  {t.readMore}
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="rail-dots" aria-hidden="true">
          {milestoneCards.map((card, index) => <span className={index === 0 ? "active" : ""} key={card.index} />)}
        </div>
      </section>

      <section className="identity-section section">
        <div className="identity-intro" data-reveal>
          <img src="/ethan-signature.png" alt="Ethan Du" />
          <div>
            <h2>{t.identityTitle}</h2>
            <p>{t.identityBody}</p>
          </div>
        </div>
        <div className="identity-grid" data-reveal>
          {["01", "02", "03", "04"].map((number) => (
            <article key={number}>
              <span>{number}</span>
              <div className="identity-mark" aria-hidden="true" />
              <h3>{t.placeholder}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="media-section section" id="media">
        <div className="section-heading" data-reveal>
          <div>
            <p className="blue-label">Media</p>
            <h2>{t.media}</h2>
            <p className="section-intro">{t.mediaIntro}</p>
          </div>
          <RailControls railId="media-rail" />
        </div>
        <div className="card-rail feature-card-rail" id="media-rail" data-reveal>
          {mediaCards.map((card, index) => (
            <article className={`editorial-card editorial-${index + 1}`} key={`${card.date}-${card.titleEn}`}>
              <a className="editorial-link" href={card.href} target="_blank" rel="noreferrer">
                <div className="editorial-image has-photo">
                  <img src={card.image} alt={language === "zh" ? card.titleZh : card.titleEn} style={{ objectPosition: "center" }} />
                  <span>{card.brand}</span>
                </div>
                <div className="editorial-copy">
                  <p><b>{language === "zh" ? card.categoryZh : card.categoryEn}</b><span>Media</span><span>·</span><span>{card.date}</span></p>
                  <h3>{language === "zh" ? card.titleZh : card.titleEn}</h3>
                  <span>{language === "zh" ? card.bodyZh : card.bodyEn}</span>
                  <em>{language === "zh" ? "查看报道 ↗" : "Read the coverage ↗"}</em>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <div className="logo-marquee" aria-label="Future media archive">
        <div>
          {(language === "zh"
            ? ["杜易展", "媒体", "观点", "项目作品", "洞察", "杜易展", "媒体", "项目作品"]
            : ["ETHAN DU", "MEDIA", "IDEAS", "PROJECTS", "INSIGHTS", "ETHAN DU", "MEDIA", "PROJECTS"]
          ).map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </div>

      <section className="insights-section section" id="insights">
        <div className="insight-toolbar" data-reveal>
          <div className="tab-list" role="tablist" aria-label="Insight categories">
            {t.tabs.map((tab, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                className={activeTab === index ? "active" : ""}
                onClick={() => setActiveTab(index)}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="insight-actions">
            <RailControls railId="insight-rail" />
            <button className="pill-button blue compact" type="button">{t.seeAll}</button>
          </div>
        </div>
        <p className="insight-intro" data-reveal>{activeTab === 0 ? t.socialIntro : t.insightIntro}</p>
        <div className={`card-rail insight-tab-rail${activeTab === 0 ? " social-rail" : ""}`} id="insight-rail" key={`insight-tab-${activeTab}`}>
          {activeTab === 0 ? (
            socialCards.map((card) => (
              <article className={`insight-card social-card social-${card.slug}`} key={card.slug}>
                <a className="social-card-link" href={card.href} target="_blank" rel="noreferrer">
                  <div className="insight-image social-visual">
                    <SocialLogo platform={card.slug} />
                    <i className="social-index">{card.number}</i>
                  </div>
                  <div className="social-copy">
                    <p>{t.socialPlatform}</p>
                    <h3>{language === "zh" ? card.platformZh : card.platformEn}</h3>
                    <span>{language === "zh" ? card.summaryZh : card.summaryEn}</span>
                    <em>{t.openSocial}</em>
                  </div>
                </a>
              </article>
            ))
          ) : (
            insightCards.map((number, index) => (
              <article className={`insight-card insight-${index + activeTab + 1}`} key={number}>
                <div className="insight-image"><span>{number}</span></div>
                <div>
                  <p>{t.tabs[activeTab]}<span>·</span>2026</p>
                  <h3>{t.placeholder}</h3>
                  <span>{t.insightIntro}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="projects-section section" id="projects">
        <div className="section-heading" data-reveal>
          <div>
            <p className="blue-label">Selected Work</p>
            <h2>{t.projectsTitle}</h2>
            <p className="section-intro">{t.projectsBody}</p>
          </div>
        </div>
        <div className="project-grid" data-reveal>
          {projectCards.map((card, index) => (
            <article key={card.number}>
              <div className={`project-visual project-${index + 1}`}>
                <img src={card.image} alt={language === "zh" ? card.titleZh : card.titleEn} style={{ objectPosition: card.position }} />
                <span>{card.number}</span>
              </div>
              <div className="project-copy">
                <p>{t.projects}</p>
                <h3>{language === "zh" ? card.titleZh : card.titleEn}</h3>
                <span>{language === "zh" ? card.bodyZh : card.bodyEn}</span>
                <a
                  href={card.href}
                  target={card.linkType === "document" ? "_blank" : undefined}
                  rel={card.linkType === "document" ? "noreferrer" : undefined}
                  onClick={(event) => openProject(event, card.href, card.linkType)}
                  aria-label={card.linkType === "mini-program" ? (language === "zh" ? "复制小程序口令" : "Copy Mini Program link") : t.openProject}
                  title={card.linkType === "mini-program" ? (language === "zh" ? "复制小程序口令" : "Copy Mini Program link") : t.openProject}
                ><ArrowIcon /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {miniProgramCopied ? <div className="copy-toast" role="status">{language === "zh" ? "小程序口令已复制，请在微信中打开" : "Mini Program link copied — open it in WeChat"}</div> : null}

      <footer>
        <img className="footer-signature" src="/ethan-signature.png" alt="Ethan Du" />
        <div className="footer-rule" />
        <div className="footer-meta">
          <p>© {year} {language === "zh" ? "杜易展" : "Ethan Du"}. All rights reserved.</p>
          <p>{t.footerLine}</p>
        </div>
      </footer>
    </main>
  );
}

