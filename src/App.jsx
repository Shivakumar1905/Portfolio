// import Navbar from "./components/NavBar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Projects from "./components/Projects";
// import Skills from "./components/Skills";
// import Experience from "./components/Experience";
// import Contact from "./components/Contact";

// export default function App() {
//   return (
//     // <div className="bg-white text-gray-800 font-sans">
//     //   <Navbar />
//     //   <Hero />
//     //   <About />
//     //   <Projects />
//     //   <Skills />
//     //   <Experience />
//     //   <Contact />
//     // </div>

//   );
// }

import { useState, useEffect, useRef } from "react";

/* ─── Tailwind CDN + Google Fonts injected via style tag ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream: #F7F4EF;
      --ink: #1A1816;
      --ink-muted: #6B6560;
      --ink-faint: #C4BFB8;
      --accent: #C8956B;
      --accent-light: #F2E8DF;
      --accent-dark: #9B6844;
      --surface: #FFFFFF;
      --surface-2: #F0EDE8;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--ink);
      overflow-x: hidden;
    }

    .serif { font-family: 'DM Serif Display', serif; }
    .mono  { font-family: 'JetBrains Mono', monospace; }

    /* Fade-in animation */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideRight {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .fade-up   { animation: fadeUp 0.7s ease forwards; }
    .fade-in   { animation: fadeIn 0.6s ease forwards; }

    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Nav */
    .nav-link {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-muted);
      text-decoration: none;
      transition: color 0.2s;
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--accent);
      transition: width 0.25s ease;
    }
    .nav-link:hover { color: var(--ink); }
    .nav-link:hover::after { width: 100%; }

    /* Buttons */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 28px;
      background: var(--ink);
      color: var(--cream);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.03em;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s, transform 0.15s;
    }
    .btn-primary:hover {
      background: var(--accent-dark);
      transform: translateY(-1px);
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 28px;
      background: transparent;
      color: var(--ink);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.03em;
      border: 1px solid var(--ink-faint);
      border-radius: 2px;
      cursor: pointer;
      text-decoration: none;
      transition: border-color 0.2s, color 0.2s, transform 0.15s;
    }
    .btn-outline:hover {
      border-color: var(--accent);
      color: var(--accent-dark);
      transform: translateY(-1px);
    }

    /* Project Cards */
    .project-card {
      background: var(--surface);
      border: 1px solid var(--ink-faint);
      border-radius: 4px;
      overflow: hidden;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s;
    }
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 40px rgba(26,24,22,0.08);
      border-color: var(--accent);
    }

    /* Skill tags */
    .skill-tag {
      display: inline-block;
      padding: 5px 14px;
      background: var(--accent-light);
      color: var(--accent-dark);
      font-size: 12px;
      font-weight: 500;
      font-family: 'JetBrains Mono', monospace;
      border-radius: 2px;
      letter-spacing: 0.04em;
      transition: background 0.2s, color 0.2s;
    }
    .skill-tag:hover {
      background: var(--accent);
      color: white;
    }

    /* Timeline */
    .timeline-line {
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 0;
      width: 1px;
      background: var(--ink-faint);
    }
    .timeline-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--cream);
      box-shadow: 0 0 0 1px var(--accent);
      flex-shrink: 0;
    }

    /* Section label */
    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
    }

    /* Divider */
    .divider {
      width: 40px;
      height: 2px;
      background: var(--accent);
      border-radius: 1px;
      transform-origin: left;
    }

    /* Input/Textarea */
    .form-input {
      width: 100%;
      padding: 12px 16px;
      background: var(--surface);
      border: 1px solid var(--ink-faint);
      border-radius: 2px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: var(--ink);
      outline: none;
      transition: border-color 0.2s;
    }
    .form-input:focus { border-color: var(--accent); }
    .form-input::placeholder { color: var(--ink-faint); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--ink-faint); border-radius: 2px; }

    /* Mobile */
    @media (max-width: 768px) {
      .hero-name { font-size: 52px !important; }
      .hide-mobile { display: none !important; }
      .stack-mobile { flex-direction: column !important; }
      .grid-1-mobile { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─── useReveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "18px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(247,244,239,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--ink-faint)" : "1px solid transparent",
      transition: "all 0.3s ease"
    }}>
      <a href="#hero" style={{ textDecoration: "none" }}>
        <span className="serif" style={{ fontSize: "22px", color: "var(--ink)", letterSpacing: "-0.02em" }}>
          Shivakumar P
        </span>
      </a>
      <div style={{ display: "flex", gap: "36px", alignItems: "center" }} className="hide-mobile">
        {["About", "Projects", "Skills", "Experience", "Contact"].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
        ))}
      </div>
      <a href="#contact" className="btn-primary" style={{ padding: "9px 20px", fontSize: "12px" }}>
        Let's Talk →
      </a>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["GenAI Developer", "ML Enthusiast", "Web Developer", "Open To Work"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;
    const tick = () => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }
      timeout = setTimeout(tick, deleting.current ? 48 : 82);
    };
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px 48px 80px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%",
        width: "520px", height: "520px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,149,107,0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "-8%",
        width: "380px", height: "380px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,149,107,0.05) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Grid lines decoration */}
      <div style={{
        position: "absolute", top: 0, right: "15%",
        width: "1px", height: "100%",
        background: "linear-gradient(to bottom, transparent, var(--ink-faint) 30%, var(--ink-faint) 70%, transparent)",
        opacity: 0.3,
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "900px", position: "relative" }}>
        

        <h1 className="serif fade-up hero-name" style={{
          fontSize: "82px", lineHeight: "1.0", letterSpacing: "-0.03em",
          color: "var(--ink)", marginBottom: "8px",
          animationDelay: "0.1s", opacity: 0
        }}>
          Shivakumar P
        </h1>

        <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0, marginBottom: "28px", height: "40px", display: "flex", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: "18px", color: "var(--ink-muted)" }}>
            {typed}
            <span style={{ animation: "blink 1s infinite", borderRight: "2px solid var(--accent)", paddingRight: "2px" }} />
          </span>
        </div>

        <p className="fade-up" style={{
          animationDelay: "0.3s", opacity: 0,
          fontSize: "17px", color: "var(--ink-muted)",
          maxWidth: "540px", lineHeight: "1.75", marginBottom: "44px"
        }}>
          A passionate computer science student building thoughtful digital experiences.
          Currently seeking opportunities to contribute, learn, and create.
        </p>

        <div className="fade-up" style={{ animationDelay: "0.4s", opacity: 0, display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#projects" className="btn-primary">View My Work →</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>

        
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  const ref = useReveal();
  return (
    <section id="about" ref={ref} className="reveal" style={{ paddingTop: "5px", paddingBottom: '120px', paddingLeft: '80px', maxWidth: "1200px", marginTop: "0px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="grid-1-mobile">

        {/* Avatar / Image placeholder */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%", aspectRatio: "5/5",
            background: "var(--surface-2)",
            borderRadius: "4px",
            border: "1px solid var(--ink-faint)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ textAlign: "center" }}>
              
              <span className="mono" style={{ fontSize: "11px", color: "var(--ink-faint)", letterSpacing: "0.12em" }}><img src={"./public/image.png"}/></span>
            </div>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: "16px", left: "16px", width: "24px", height: "24px", borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)" }} />
            <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "24px", height: "24px", borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)" }} />
          </div>
          {/* Offset decoration box */}
          <div style={{
            position: "absolute", bottom: "-20px", right: "-20px",
            width: "120px", height: "120px",
            background: "var(--accent-light)",
            borderRadius: "4px",
            zIndex: -1
          }} />
        </div>

        {/* Text */}
        <div>
          <p className="section-label" style={{ marginBottom: "12px" }}>About Me</p>
          <h2 className="serif" style={{ fontSize: "44px", lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Turning ideas into<br />
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>working code</span>
          </h2>
          <div className="divider" style={{ marginBottom: "28px" }} />

          <p style={{ fontSize: "15px", color: "var(--ink-muted)", lineHeight: "1.85", marginBottom: "20px" }}>
            Passionate about technology, problem-solving, and continuous learning. Focused on building efficient systems, strengthening fundamentals, and growing as a developer while aiming to create meaningful real-world impact.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "36px" }}>
            {[
              { label: "Degree", val: "B.Tech Computer Science & Engineering (IoT and Automation)" },
              { label: "College", val: "SASTRA Deemed to be University" },
              { label: "Location", val: "Thanjavur, India" },
              { label: "Available", val: "July 2027 onwards" },
            ].map(d => (
              <div key={d.label} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "14px" }}>
                <div style={{ fontSize: "11px", color: "var(--ink-faint)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "3px" }}>{d.label}</div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>{d.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#" className="btn-primary">Download Resume →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
const PROJECTS = [
  { num: "01", tag: "Web App", title: "Your Project Title", desc: "Describe what this project does, the problem it solves, and the technologies used. Two to three sentences works well here.", stack: ["React", "Node.js", "MongoDB"] },
  { num: "02", tag: "ML / AI", title: "Your Project Title", desc: "Describe what this project does, the problem it solves, and the technologies used. Two to three sentences works well here.", stack: ["Python", "PyTorch", "FastAPI"] },
  { num: "03", tag: "CLI Tool", title: "Your Project Title", desc: "Describe what this project does, the problem it solves, and the technologies used. Two to three sentences works well here.", stack: ["Go", "SQLite"] },
  { num: "04", tag: "Mobile", title: "Your Project Title", desc: "Describe what this project does, the problem it solves, and the technologies used. Two to three sentences works well here.", stack: ["React Native", "Firebase"] },
  { num: "05", tag: "API", title: "Your Project Title", desc: "Describe what this project does, the problem it solves, and the technologies used. Two to three sentences works well here.", stack: ["Django", "PostgreSQL", "Redis"] },
  { num: "06", tag: "Systems", title: "Your Project Title", desc: "Describe what this project does, the problem it solves, and the technologies used. Two to three sentences works well here.", stack: ["C++", "OS Concepts"] },
];

function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" style={{ background: "var(--surface-2)", padding: "30px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p className="section-label" style={{ marginBottom: "10px" }}>Selected Work</p>
            <h2 className="serif" style={{ fontSize: "52px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Things I've<br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>shipped</span>
            </h2>
          </div>
          <p style={{ maxWidth: "320px", fontSize: "14px", color: "var(--ink-muted)", lineHeight: "1.8" }}>
            A curated collection of projects spanning web, ML, and systems. Each one taught me something new.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }} className="grid-1-mobile">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} {...p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ num, tag, title, desc, stack, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="project-card reveal" style={{ transitionDelay: `${delay}s` }}>
      <div style={{ padding: "32px 28px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <span className="mono" style={{ fontSize: "12px", color: "var(--ink-faint)" }}>{num}</span>
          <span style={{
            fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em",
            padding: "3px 10px", background: "var(--accent-light)",
            color: "var(--accent-dark)", borderRadius: "2px"
          }}>{tag}</span>
        </div>
        <h3 className="serif" style={{ fontSize: "24px", marginBottom: "12px", letterSpacing: "-0.01em" }}>{title}</h3>
        <p style={{ fontSize: "14px", color: "var(--ink-muted)", lineHeight: "1.75", marginBottom: "24px" }}>{desc}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "28px" }}>
          {stack.map(s => (
            <span key={s} className="skill-tag">{s}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href="#" className="btn-primary" style={{ padding: "8px 18px", fontSize: "13px" }}>View Project →</a>
          <a href="#" className="btn-outline" style={{ padding: "7px 18px", fontSize: "13px" }}>GitHub</a>
        </div>
      </div>
    </div>
  );
}

/* ─── SKILLS ─── */
const SKILL_CATS = [
  {
    cat: "Languages",
    icon: "{ }",
    skills: ["HTML","CSS","C", "C++", "Python", "Javascript"]
  },
  {
    cat: "Frameworks & Libraries",
    icon: "[ ]",
    skills: ["React.js", "node.js", "express.js", "Langchain", "Langgraph","FastAPI","Django"]
  },
  {
    cat: "Tools & Platforms",
    icon: "~$",
    skills: ["Git", "GitHub", "N8N", "VSCode"]
  },
  {
    cat: "Database",
    icon: "$",
    skills: ["MongoDB", "MySQL"]
  },
  {
    cat: "CS Fundamentals",
    icon: "∑",
    skills: ["DSA", "DBMS", "OS", "CN", "OOP"]
  },
];

function Skills() {
  const ref = useReveal();
  return (
    <section id="skills" style={{ padding: "30px 48px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} className="reveal" style={{ marginBottom: "64px" }}>
        <p className="section-label" style={{ marginBottom: "10px" }}>What I Work With</p>
        <h2 className="serif" style={{ fontSize: "52px", letterSpacing: "-0.02em" }}>
          Skills &amp; <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Stack</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
        {SKILL_CATS.map((cat, i) => (
          <SkillCard key={i} {...cat} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ cat, icon, skills, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s` }}>
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-faint)",
        borderRadius: "4px",
        padding: "28px 24px",
        height: "100%"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span className="mono" style={{ fontSize: "18px", color: "var(--accent)", fontWeight: 500 }}>{icon}</span>
          <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{cat}</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {skills.map(s => (
            <span key={s} className="skill-tag">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── EXPERIENCE / TIMELINE ─── */
const TIMELINE = [
  {
    type: "education",
    period: "2023 – 2027",
    title: "B.Tech in Computer Science & Engineering (IoT and Automation)",
    org: "SASTRA Deemed to be University",
    detail: "CGPA: 7.75 / 10.0 · Relevant coursework: DSA, DBMS, OS, CN, ML, Web Dev"
  },
  {
    type: "internship",
    period: "Month 20XX – Month 20XX",
    title: "Your Internship Role",
    org: "Company Name · Remote / City",
    detail: "Describe what you worked on, what you built or improved, and the key technologies involved. Keep it achievement-oriented."
  },
  {
    type: "internship",
    period: "Month 20XX – Month 20XX",
    title: "Your Internship Role",
    org: "Company Name · Remote / City",
    detail: "Describe what you worked on, what you built or improved, and the key technologies involved. Keep it achievement-oriented."
  },
  {
    type: "achievement",
    period: "Month 20XX",
    title: "Hackathon / Competition Win",
    org: "Event Name · Platform",
    detail: "Brief description of the problem solved, team size, and result. E.g. Top X out of Y teams."
  },
];

const typeColors = {
  education: "#4A90D9",
  internship: "#C8956B",
  achievement: "#5BAD8A",
};
const typeLabels = {
  education: "Education",
  internship: "Internship",
  achievement: "Achievement",
};

function Experience() {
  const ref = useReveal();
  return (
    <section id="experience" style={{ background: "var(--surface-2)", padding: "30px 48px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ marginBottom: "64px" }}>
          <p className="section-label" style={{ marginBottom: "10px" }}>Journey So Far</p>
          <h2 className="serif" style={{ fontSize: "52px", letterSpacing: "-0.02em" }}>
            Experience &amp; <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Education</span>
          </h2>
        </div>

        <div style={{ position: "relative", paddingLeft: "32px" }}>
          <div className="timeline-line" />
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} {...item} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ type, period, title, org, detail, delay }) {
  const ref = useReveal();
  const color = typeColors[type];
  return (
    <div ref={ref} className="reveal" style={{ display: "flex", gap: "20px", transitionDelay: `${delay}s` }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, marginTop: "4px" }}>
        <div className="timeline-dot" style={{ background: color, boxShadow: `0 0 0 1px ${color}` }} />
      </div>
      <div style={{ paddingBottom: "0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
          <span className="mono" style={{ fontSize: "11px", color: "var(--ink-faint)" }}>{period}</span>
          <span style={{
            fontSize: "10px", fontWeight: 500, letterSpacing: "0.07em",
            padding: "2px 8px",
            background: `${color}20`,
            color: color,
            borderRadius: "2px",
            textTransform: "uppercase"
          }}>{typeLabels[type]}</span>
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px", color: "var(--ink)" }}>{title}</h3>
        <p style={{ fontSize: "13px", color: "var(--accent-dark)", fontWeight: 500, marginBottom: "10px" }}>{org}</p>
        <p style={{ fontSize: "14px", color: "var(--ink-muted)", lineHeight: "1.75" }}>{detail}</p>
      </div>
    </div>
  );
}

/* ─── CONTACT ─── */
import emailjs from "@emailjs/browser";

function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(
        "service_jm2lt0l",
        "template_7yu8ctm",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Shivakumar",
        },
        "Sql9kliXFN9FZXiKn"
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" style={{ padding: "120px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px", alignItems: "start" }} className="grid-1-mobile">

          {/* Left */}
          <div ref={ref} className="reveal">
            <p className="section-label" style={{ marginBottom: "10px" }}>Get In Touch</p>
            <h2 className="serif" style={{ fontSize: "48px", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
              Let's build<br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>something great</span>
            </h2>
            <div className="divider" style={{ marginBottom: "28px" }} />
            <p style={{ fontSize: "15px", color: "var(--ink-muted)", lineHeight: "1.85", marginBottom: "40px" }}>
              I'm actively seeking internships and full-time roles. Whether you have a project in mind,
              a question, or just want to say hi — my inbox is always open.
            </p>

            {/* Contact Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
              {[
                { label: "Email", val: "mails2shivkumar@gmail.com", href: "mailto:mails2shivkumar@gmail.com" },
                { label: "Location", val: "Thanjavur, India", href: null },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: "11px", color: "var(--ink-faint)", minWidth: "56px" }}>{c.label}</span>
                  {c.href
                    ? <a href={c.href} style={{ fontSize: "14px", color: "var(--accent-dark)", fontWeight: 500, textDecoration: "none" }}>{c.val}</a>
                    : <span style={{ fontSize: "14px", color: "var(--ink)", fontWeight: 400 }}>{c.val}</span>
                  }
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="mono" style={{ fontSize: "11px", color: "var(--ink-faint)", letterSpacing: "0.12em", marginBottom: "14px" }}>FIND ME ON</p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  { label: "GitHub",   href: "https://github.com/Shivakumar1905" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/shivakumar-p-160437338/" },
                  { label: "GMail",    href: "mailto:mails2shivkumar@gmail.com" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="btn-outline" style={{ padding: "7px 16px", fontSize: "13px" }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--ink-faint)",
            borderRadius: "4px",
            padding: "40px 36px"
          }}>
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>Your Name</label>
              <input className="form-input" placeholder="John Doe" value={form.name} onChange={set("name")} />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>Email Address</label>
              <input className="form-input" type="email" placeholder="john@example.com" value={form.email} onChange={set("email")} />
            </div>
            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>Message</label>
              <textarea className="form-input" rows={6} placeholder="Tell me what you have in mind…" value={form.message} onChange={set("message")} style={{ resize: "vertical" }} />
            </div>

            {status === "success" && (
              <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#eaf7f0", border: "1px solid #5BAD8A", borderRadius: "4px", fontSize: "13px", color: "#3a7d5e" }}>
                Message sent! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#fdf0f0", border: "1px solid #e24b4a", borderRadius: "4px", fontSize: "13px", color: "#a32d2d" }}>
                Something went wrong. Please try again.
              </div>
            )}

            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.6 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{
      background: "var(--ink)",
      color: "var(--cream)",
      padding: "40px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px"
    }}>
      <span className="serif" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>
        Shivakumar P
      </span>
      <span className="mono" style={{ fontSize: "12px", color: "rgba(247,244,239,0.4)", letterSpacing: "0.08em" }}>
        &copy;{new Date().getFullYear()} · Built with React · All rights reserved
      </span>
      <div style={{ display: "flex", gap: "24px" }}>
        {[
          { label: "GitHub",   href: "https://github.com/Shivakumar1905" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/shivakumar-p-160437338/" },
          { label: "Resume",   href: "#" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "13px", color: "rgba(247,244,239,0.5)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--accent)"}
            onMouseLeave={e => e.target.style.color = "rgba(247,244,239,0.5)"}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function Portfolio() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}