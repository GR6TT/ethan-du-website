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
    milestoneIntro: "一些值得被记住的节点。",
    placeholder: "内容待补充",
    readMore: "了解更多",
    identityTitle: "一段仍在展开的个人路径",
    identityBody: "关于 Ethan Du 的详细经历、身份与里程碑，将在后续讨论中逐项完善。",
    media: "媒体报道",
    mediaIntro: "记录方案之外的现场：一场从小城产品出发的决赛，以及团队如何把它讲清楚。",
    seeAll: "查看全部",
    tabs: ["洞察", "观点", "演讲与对话"],
    insightIntro: "记录思考、方法与正在发生的变化",
    art: "艺术",
    artTitle: "收藏灵感，也收藏观看世界的方式",
    artBody: "艺术内容与收藏条目将在后续逐步加入。",
    projects: "项目作品",
    projectsTitle: "城市流行志",
    projectsBody: "为淘宝“好货”命题完成的一套城市内容与营销方案。小城也有好产品，我的家乡我来说。",
    openProject: "查看完整方案",
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
    milestoneIntro: "A few moments worth keeping.",
    placeholder: "Content coming soon",
    readMore: "Read More",
    identityTitle: "A personal path still unfolding",
    identityBody: "Ethan Du’s detailed story, roles, and milestones will be refined together in the next phase.",
    media: "Media Coverage",
    mediaIntro: "Beyond the deck: a national final built around local products, city stories, and a clear team presentation.",
    seeAll: "See All",
    tabs: ["Insights", "Perspectives", "Talks & Dialogues"],
    insightIntro: "Thoughts, methods, and changes worth documenting",
    art: "Art",
    artTitle: "Collecting inspiration—and ways of seeing the world",
    artBody: "Selected art and collection notes will be added gradually.",
    projects: "Projects",
    projectsTitle: "City Trendbook",
    projectsBody: "A city-content and marketing proposal created for Taobao’s Good Products brief: small cities have good products, too.",
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
    titleZh: "城市流行志",
    titleEn: "City Trendbook",
    bodyZh: "2024 · 首届淘宝大学生创新挑战赛全国冠军",
    bodyEn: "2024 · National Champion, the first Taobao University Student Innovation Challenge",
    image: "/taobao-final-champion.jpg",
    href: "#projects",
  },
  { index: "02", tone: "electric", titleZh: "求知", titleEn: "Learning" },
  { index: "03", tone: "paper", titleZh: "创造", titleEn: "Creating" },
  { index: "04", tone: "violet", titleZh: "连接", titleEn: "Connecting" },
  { index: "05", tone: "cobalt", titleZh: "下一章", titleEn: "Next Chapter" },
] as const;

const mediaCards = [
  {
    date: "2024.05",
    categoryZh: "获奖",
    categoryEn: "Award",
    titleZh: "「城市流行志」获全国冠军",
    titleEn: "City Trendbook wins the national title",
    bodyZh: "华东秃鸡队以城市内容与好货营销方案夺得冠军，并获得 3 万元奖金。",
    bodyEn: "The team won the national final with a city-content and local-product marketing proposal, receiving a RMB 30,000 prize.",
    image: "/taobao-final-champion.jpg",
  },
  {
    date: "2024.05",
    categoryZh: "决赛",
    categoryEn: "Final",
    titleZh: "在杭州，讲一次小城的好产品",
    titleEn: "Telling a local-product story in Hangzhou",
    bodyZh: "5 月 11 日，全国总决赛在杭州阿里巴巴总部举行。",
    bodyEn: "The national final was held at Alibaba’s Hangzhou headquarters on May 11.",
    image: "/taobao-final-presentation.jpg",
  },
  {
    date: "2024.05",
    categoryZh: "现场",
    categoryEn: "On Site",
    titleZh: "从方案到陈述",
    titleEn: "From proposal to presentation",
    bodyZh: "围绕产品、城市与内容，完成最后一次现场表达。",
    bodyEn: "A final presentation connecting products, cities, and content.",
    image: "/taobao-final-team-stage.jpg",
  },
  {
    date: "2024.05",
    categoryZh: "决赛日",
    categoryEn: "Final Day",
    titleZh: "走进全国总决赛",
    titleEn: "Arriving at the national final",
    bodyZh: "参赛团队进入决赛现场的一刻。",
    bodyEn: "The finalist teams enter the venue before the presentations begin.",
    image: "/taobao-final-arrival.jpg",
  },
  {
    date: "2024.05",
    categoryZh: "记录",
    categoryEn: "Archive",
    titleZh: "决赛之后",
    titleEn: "After the final",
    bodyZh: "参赛团队与评审在杭州留下的一张合影。",
    bodyEn: "A group portrait of the finalist teams and judges in Hangzhou.",
    image: "/taobao-final-group.jpg",
  },
  {
    date: "2024.05",
    categoryZh: "人物",
    categoryEn: "Portrait",
    titleZh: "现场记录：Ethan Du",
    titleEn: "On site: Ethan Du",
    bodyZh: "总决赛现场的一帧。",
    bodyEn: "A frame from the national final.",
    image: "/taobao-final-ethan.jpg",
    position: "center 28%",
  },
] as const;
const insightCards = ["No. 01", "No. 02", "No. 03", "No. 04"];
const projectCards = [
  {
    number: "001",
    image: "/city-trendbook-cover.jpg",
    titleZh: "城市流行志",
    titleEn: "City Trendbook",
    bodyZh: "小城也有好产品，我的家乡我来说。",
    bodyEn: "Small cities have good products, too—let hometown voices tell the story.",
    href: "/city-trendbook-final.pdf",
  },
  {
    number: "002",
    image: "/city-trendbook-channel.jpg",
    titleZh: "淘宝频道 · 城市专题",
    titleEn: "Taobao City Channel",
    bodyZh: "将城市与地方好货组织成可持续更新的内容入口。",
    bodyEn: "A repeatable content destination connecting cities with distinctive local products.",
    href: "/city-trendbook-final.pdf#page=8",
  },
  {
    number: "003",
    image: "/city-trendbook-story.jpg",
    titleZh: "城市故事的传播路径",
    titleEn: "A distribution path for city stories",
    bodyZh: "从站内内容到达人矩阵，让地方产品被看见。",
    bodyEn: "From in-app content to creator networks, giving local products greater visibility.",
    href: "/city-trendbook-final.pdf#page=11",
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
          <RailControls railId="media-rail" />
        </div>
        <div className="card-rail" id="media-rail" data-reveal>
          {mediaCards.map((card, index) => (
            <article className={`editorial-card editorial-${index + 1}`} key={`${card.date}-${card.titleEn}`}>
              <a className="editorial-link" href="http://t.cn/A6Huj3XQ" target="_blank" rel="noreferrer">
                <div className="editorial-image has-photo">
                  <img src={card.image} alt={language === "zh" ? card.titleZh : card.titleEn} style={{ objectPosition: "position" in card ? card.position : "center" }} />
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
          {["TAOBAO", "CITY", "PRODUCT", "STORY", "FINAL", "2024", "TAOBAO", "CITY"].map((word, index) => (
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
