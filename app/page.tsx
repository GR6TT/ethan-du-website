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
    heroTitle: "探索者",
    heroBody: "个人经历与内容将在下一阶段逐步完善。这里先保留与参考站一致的视觉框架与浏览节奏。",
    learnMore: "了解更多",
    achievements: "Achievements",
    milestones: "Highlighted Milestones",
    milestoneIntro: "A first look at Ethan Du’s evolving journey.",
    placeholder: "内容待补充",
    readMore: "了解更多",
    identityTitle: "一段仍在展开的个人路径",
    identityBody: "关于 Ethan Du 的详细经历、身份与里程碑，将在后续讨论中逐项完善。",
    media: "媒体报道",
    mediaIntro: "这里将收录与 Ethan Du 相关的报道、访谈与公开记录",
    seeAll: "查看全部",
    tabs: ["洞察", "观点", "演讲与对话"],
    insightIntro: "记录思考、方法与正在发生的变化",
    art: "艺术",
    artTitle: "收藏灵感，也收藏观看世界的方式",
    artBody: "艺术内容与收藏条目将在后续逐步加入。",
    projects: "项目作品",
    projectsTitle: "正在构建的想法与作品",
    projectsBody: "项目档案、阶段成果与协作记录将在这里持续更新。",
    footerLine: "Personal website of Ethan Du",
    menu: "菜单",
    close: "关闭",
  },
  en: {
    heroName: "Ethan Du",
    heroTitle: "Explorer",
    heroBody: "Biography and editorial content will be shaped in the next phase. For now, the visual system and browsing rhythm are in place.",
    learnMore: "Learn More",
    achievements: "Achievements",
    milestones: "Highlighted Milestones",
    milestoneIntro: "A first look at Ethan Du’s evolving journey.",
    placeholder: "Content coming soon",
    readMore: "Read More",
    identityTitle: "A personal path still unfolding",
    identityBody: "Ethan Du’s detailed story, roles, and milestones will be refined together in the next phase.",
    media: "Media Coverage",
    mediaIntro: "A future archive of reporting, conversations, and public notes about Ethan Du.",
    seeAll: "See All",
    tabs: ["Insights", "Perspectives", "Talks & Dialogues"],
    insightIntro: "Thoughts, methods, and changes worth documenting",
    art: "Art",
    artTitle: "Collecting inspiration—and ways of seeing the world",
    artBody: "Selected art and collection notes will be added gradually.",
    projects: "Projects",
    projectsTitle: "Ideas and work in progress",
    projectsBody: "Project files, milestones, and collaborations will live here.",
    footerLine: "Personal website of Ethan Du",
    menu: "Menu",
    close: "Close",
  },
} as const;

const milestoneCards = [
  { index: "01", tone: "midnight", titleZh: "起点", titleEn: "The Beginning" },
  { index: "02", tone: "electric", titleZh: "求知", titleEn: "Learning" },
  { index: "03", tone: "paper", titleZh: "创造", titleEn: "Creating" },
  { index: "04", tone: "violet", titleZh: "连接", titleEn: "Connecting" },
  { index: "05", tone: "cobalt", titleZh: "下一章", titleEn: "Next Chapter" },
] as const;

const mediaCards = ["2026.08", "2026.06", "2026.03", "2025.12", "2025.09"];
const insightCards = ["No. 01", "No. 02", "No. 03", "No. 04"];
const projectCards = ["001", "002", "003"];

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
            <article className={`milestone-card ${card.tone}`} key={card.index}>
              <span className="card-index">{card.index}</span>
              <div className="card-copy">
                <h3>{language === "zh" ? card.titleZh : card.titleEn}</h3>
                <p>{t.placeholder}</p>
                <button className="pill-button light compact" type="button">
                  {t.readMore}
                </button>
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
        <div className="card-rail" id="media-rail" data-reveal>
          {mediaCards.map((date, index) => (
            <article className={`editorial-card editorial-${index + 1}`} key={date}>
              <div className="editorial-image">
                <span>ETHAN DU</span>
              </div>
              <div className="editorial-copy">
                <p><b>Featured</b><span>News</span><span>·</span><span>{date}</span></p>
                <h3>{t.placeholder}</h3>
                <span>{t.mediaIntro}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="logo-marquee" aria-label="Future media archive">
        <div>
          {["JOURNAL", "REVIEW", "MEDIA", "STUDIO", "NOTES", "ARCHIVE", "JOURNAL", "REVIEW"].map((word, index) => (
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
          {projectCards.map((number, index) => (
            <article key={number}>
              <div className={`project-visual project-${index + 1}`}>
                <span>{number}</span>
                <i />
              </div>
              <div className="project-copy">
                <p>{t.projects}</p>
                <h3>{t.placeholder}</h3>
                <button type="button" aria-label={t.readMore}><ArrowIcon /></button>
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
