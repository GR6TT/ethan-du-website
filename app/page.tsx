"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "zh" | "en";

const nav = {
  zh: [
    ["关于", "about"],
    ["媒体", "media"],
    ["洞察", "insights"],
    ["艺术", "art"],
    ["项目作品", "projects"],
  ],
  en: [
    ["About", "about"],
    ["Media", "media"],
    ["Insights", "insights"],
    ["Art", "art"],
    ["Projects", "projects"],
  ],
} as const;

const copy = {
  zh: {
    heroName: "Ethan Du",
    heroTitle: "创作者",
    heroBody: "Ethan Du 的个人网站，收录其经历、项目、观点与艺术关注。",
    learnMore: "了解更多",
    achievements: "Achievements",
    milestones: "Highlighted Milestones",
    milestoneIntro: "Ethan Du 的重要经历与阶段性成果。",
    placeholder: "即将更新",
    readMore: "了解更多",
    identityTitle: "关于 Ethan Du",
    identityBody: "个人经历、关注领域与相关工作将在此持续更新。",
    media: "媒体报道",
    mediaIntro: "关于 Ethan Du 的媒体报道与公开记录。",
    seeAll: "查看全部",
    tabs: ["洞察", "观点", "演讲与对话"],
    insightIntro: "收录对商业、内容与创新的观察。",
    art: "艺术",
    artTitle: "艺术与收藏",
    artBody: "收录艺术作品、收藏与相关记录。",
    projects: "项目作品",
    projectsTitle: "项目作品",
    projectsBody: "收录 Ethan Du 参与的代表性项目与作品。",
    openProject: "查看完整方案",
    footerLine: "Personal website of Ethan Du",
    menu: "菜单",
    close: "关闭",
  },
  en: {
    heroName: "Ethan Du",
    heroTitle: "Creator",
    heroBody: "The personal website of Ethan Du, featuring selected milestones, projects, perspectives, and art.",
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
    tabs: ["Insights", "Perspectives", "Talks & Dialogues"],
    insightIntro: "Perspectives on business, content, and innovation.",
    art: "Art",
    artTitle: "Art & Collection",
    artBody: "Selected artworks, collections, and related records.",
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
  { index: "05", tone: "cobalt", titleZh: "艺术", titleEn: "Art" },
] as const;

const mediaCards = [
  {
    date: "2024.05",
    categoryZh: "赛事",
    categoryEn: "Competition",
    titleZh: "获全国冠军",
    titleEn: "National Champion",
    bodyZh: "Ethan Du 所在团队获首届淘宝大学生创新挑战赛全国冠军。",
    bodyEn: "Ethan Du’s team won the first Taobao University Student Innovation Challenge.",
    image: "/taobao-final-group.jpg",
  },
] as const;
const insightCards = ["No. 01", "No. 02", "No. 03", "No. 04"];
const projectCards = [
  {
    number: "001",
    image: "/taobao-final-group.jpg",
    titleZh: "城市流行志",
    titleEn: "City Trendbook",
    bodyZh: "淘宝商赛冠军项目",
    bodyEn: "Taobao competition champion project",
    href: "/city-trendbook-final.pdf",
  },
] as const;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "right" ? "M8 5l7 7-7 7" : "M16 5l-7 7 7 7"} />
    </svg>
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
        </div>
        <div className="card-rail single-card-rail" id="media-rail" data-reveal>
          {mediaCards.map((card, index) => (
            <article className={`editorial-card editorial-${index + 1}`} key={`${card.date}-${card.titleEn}`}>
              <a className="editorial-link" href="http://t.cn/A6Huj3XQ" target="_blank" rel="noreferrer">
                <div className="editorial-image has-photo">
                  <img src={card.image} alt={language === "zh" ? card.titleZh : card.titleEn} style={{ objectPosition: "center" }} />
                  <span>TAOBAO · 2024</span>
                </div>
                <div className="editorial-copy">
                  <p><b>{language === "zh" ? card.categoryZh : card.categoryEn}</b><span>Media</span><span>·</span><span>{card.date}</span></p>
                  <h3>{language === "zh" ? card.titleZh : card.titleEn}</h3>
                  <span>{language === "zh" ? card.bodyZh : card.bodyEn}</span>
                  <em>{language === "zh" ? "观看决赛报道 ↗" : "Watch the final ↗"}</em>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <div className="logo-marquee" aria-label="Future media archive">
        <div>
          {["ETHAN DU", "MEDIA", "IDEAS", "PROJECTS", "ART", "INSIGHTS", "ETHAN DU", "PROJECTS"].map((word, index) => (
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
        <p className="insight-intro" data-reveal>{t.insightIntro}</p>
        <div className="card-rail" id="insight-rail" data-reveal>
          {insightCards.map((number, index) => (
            <article className={`insight-card insight-${index + activeTab + 1}`} key={number}>
              <div className="insight-image"><span>{number}</span></div>
              <div>
                <p>{t.tabs[activeTab]}<span>·</span>2026</p>
                <h3>{t.placeholder}</h3>
                <span>{t.insightIntro}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="art-section" id="art">
        <div className="art-visual" aria-hidden="true">
          <div className="art-disc" />
          <div className="art-line line-one" />
          <div className="art-line line-two" />
        </div>
        <div className="art-copy" data-reveal>
          <p className="blue-label">{t.art}</p>
          <h2>{t.artTitle}</h2>
          <p>{t.artBody}</p>
          <button className="pill-button light" type="button">{t.learnMore}<ArrowIcon /></button>
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
                <img src={card.image} alt={language === "zh" ? card.titleZh : card.titleEn} />
                <span>{card.number}</span>
              </div>
              <div className="project-copy">
                <p>{t.projects}</p>
                <h3>{language === "zh" ? card.titleZh : card.titleEn}</h3>
                <span>{language === "zh" ? card.bodyZh : card.bodyEn}</span>
                <a href={card.href} target="_blank" rel="noreferrer" aria-label={t.openProject} title={t.openProject}><ArrowIcon /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <img className="footer-signature" src="/ethan-signature.png" alt="Ethan Du" />
        <div className="footer-rule" />
        <div className="footer-meta">
          <p>© {year} Ethan Du. All rights reserved.</p>
          <p>{t.footerLine}</p>
        </div>
      </footer>
    </main>
  );
}
