import { useEffect, useState } from "react";

const NAV = [
  { id: "work", label: "Work" },
  { id: "publications", label: "Publications" },
  { id: "teaching", label: "Teaching" },
  { id: "contact", label: "Contact" },
];

function ReactionMotif({ className = "" }) {
  return (
    <svg
      viewBox="0 0 900 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#2A3733" strokeWidth="2">
        <path d="M40 140 L75 110 L110 140 L145 110 L180 140" />
        <path d="M75 110 L75 75" />
        <circle cx="180" cy="140" r="4" fill="#2A3733" stroke="none" />
      </g>
      <g>
        <line x1="220" y1="130" x2="360" y2="130" stroke="#E8C547" strokeWidth="1.5" className="drift" />
        <path d="M354 124 L362 130 L354 136" stroke="#E8C547" strokeWidth="1.5" fill="none" />
        <text x="270" y="118" fill="#B89A34" fontSize="13" fontFamily="'IBM Plex Mono', monospace">
          enzyme, hν
        </text>
      </g>
      <g stroke="#2A3733" strokeWidth="2">
        <path d="M400 140 L435 110 L470 140 L505 110 L540 140" />
        <path d="M470 140 L470 175" />
        <circle cx="400" cy="140" r="4" fill="#4C8B5C" stroke="none" />
      </g>
      <g>
        <line x1="580" y1="130" x2="700" y2="130" stroke="#4C8B5C" strokeWidth="1.5" className="drift" />
        <path d="M694 124 L702 130 L694 136" stroke="#4C8B5C" strokeWidth="1.5" fill="none" />
      </g>
      <g stroke="#2A3733" strokeWidth="2">
        <path d="M740 140 L775 110 L810 140 L845 110 L880 140" />
        <circle cx="845" cy="110" r="4" fill="#7FD8C5" stroke="none" />
      </g>
    </svg>
  );
}

function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs text-flavin/80 tracking-wider">{index}</span>
      <span className="h-px flex-1 bg-ink-line" />
      <h2 className="font-display text-2xl md:text-3xl text-paper tracking-tight">
        {children}
      </h2>
    </div>
  );
}

function Badge({ children, tone = "chlorophyll" }) {
  const tones = {
    chlorophyll: "border-chlorophyll/40 text-chlorophyll-bright bg-chlorophyll/10",
    flavin: "border-flavin/40 text-flavin bg-flavin/10",
    muted: "border-ink-line text-muted bg-ink-panel",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono ${tones[tone]}`}>
      {children}
    </span>
  );
}

function ProjectCard({ title, tagline, description, tags, links, status }) {
  return (
    <div className="group relative rounded-2xl border border-ink-line bg-ink-panel p-7 flex flex-col gap-4 transition-colors hover:border-chlorophyll/50">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl text-paper">{title}</h3>
        {status && <Badge tone={status.tone}>{status.label}</Badge>}
      </div>
      <p className="font-mono text-xs text-spectral">{tagline}</p>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((t) => (
          <span key={t} className="text-[11px] font-mono text-muted border border-ink-line rounded px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>
      {links && links.length > 0 && (
        <div className="flex gap-4 mt-2 pt-4 border-t border-ink-line">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-flavin hover:text-paper transition-colors"
            >
              {l.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// A small deterministic abstract "reaction schematic" used as a stand-in
// graphical abstract for each paper. Not a real structure — a visual motif
// in the site's own palette, varied per paper via a seed number.
function GraphicalAbstract({ seed = 0, accent = "flavin" }) {
  const accentColor =
    accent === "flavin" ? "#E8C547" : accent === "chlorophyll" ? "#4C8B5C" : "#7FD8C5";
  const accentDim =
    accent === "flavin" ? "#B89A34" : accent === "chlorophyll" ? "#3A6647" : "#5AA898";

  // simple seeded pseudo-random offsets so each card looks slightly different
  const r = (n) => {
    const x = Math.sin(seed * 999 + n * 37.1) * 10000;
    return x - Math.floor(x);
  };

  const nodesLeft = [0, 1, 2].map((i) => ({
    x: 20 + i * 22 + r(i) * 6,
    y: 40 + (i % 2 === 0 ? 0 : 24) + r(i + 10) * 8,
  }));
  const nodesRight = [0, 1, 2].map((i) => ({
    x: 220 + i * 20 + r(i + 20) * 6,
    y: 36 + (i % 2 === 0 ? 6 : 26) + r(i + 30) * 8,
  }));

  return (
    <svg viewBox="0 0 320 100" className="w-full h-24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#2A3733" strokeWidth="1.6" fill="none">
        <polyline points={nodesLeft.map((n) => `${n.x},${n.y}`).join(" ")} />
      </g>
      {nodesLeft.map((n, i) => (
        <circle key={`l${i}`} cx={n.x} cy={n.y} r={i === 1 ? 4 : 2.5} fill={i === 1 ? accentColor : "#3A4A44"} />
      ))}

      <line x1="150" y1="50" x2="200" y2="50" stroke={accentDim} strokeWidth="1.4" strokeDasharray="3 6" />
      <path d={`M194 44 L202 50 L194 56`} stroke={accentDim} strokeWidth="1.4" fill="none" />

      <g stroke="#2A3733" strokeWidth="1.6" fill="none">
        <polyline points={nodesRight.map((n) => `${n.x},${n.y}`).join(" ")} />
      </g>
      {nodesRight.map((n, i) => (
        <circle key={`r${i}`} cx={n.x} cy={n.y} r={i === 1 ? 4.5 : 2.5} fill={i === 1 ? accentColor : "#3A4A44"} />
      ))}
      <circle cx={nodesRight[1].x} cy={nodesRight[1].y} r="9" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

function ResearchCard({ title, journal, year, doi, summary, skills, accent }) {
  return (
    <a
      href={`https://doi.org/${doi}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-ink-line bg-ink-panel p-6 hover:border-chlorophyll/50 transition-colors"
    >
      <div className="rounded-lg bg-ink mb-5 border border-ink-line/60 px-2">
        <GraphicalAbstract seed={year.charCodeAt(0) + title.length} accent={accent} />
      </div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="text-sm text-chlorophyll-bright italic">{journal}</span>
        <span className="font-mono text-xs text-muted shrink-0">{year}</span>
      </div>
      <h3 className="font-display text-lg text-paper group-hover:text-flavin transition-colors leading-snug mb-3">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-4">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="text-[11px] font-mono text-muted border border-ink-line rounded px-2 py-0.5">
            {s}
          </span>
        ))}
      </div>
      <p className="font-mono text-[11px] text-muted mt-4 pt-4 border-t border-ink-line">doi:{doi}</p>
    </a>
  );
}

function PublicationRow({ authors, title, journal, year, doi, note }) {
  return (
    <a
      href={`https://doi.org/${doi}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-6 border-b border-ink-line group"
    >
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <h3 className="font-display text-lg text-paper group-hover:text-flavin transition-colors max-w-2xl">
          {title}
        </h3>
        <span className="font-mono text-xs text-muted shrink-0">{year}</span>
      </div>
      <p className="text-sm text-muted mt-2">{authors}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-sm text-chlorophyll-bright italic">{journal}</span>
        <span className="font-mono text-[11px] text-muted">doi:{doi}</span>
      </div>
      {note && <p className="text-xs text-spectral mt-2">{note}</p>}
    </a>
  );
}

export default function App() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen grain">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-ink/80 border-b border-ink-line">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-display text-paper text-sm tracking-wide">
            F. Bhat
          </a>
          <div className="hidden md:flex gap-8">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`text-xs font-mono tracking-wide transition-colors ${
                  active === n.id ? "text-flavin" : "text-muted hover:text-paper"
                }`}
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/faizan-bhat-phd-aa312957/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted hover:text-paper transition-colors"
          >
            LinkedIn &rarr;
          </a>
        </nav>
      </header>

      <section id="top" className="relative pt-40 pb-24 px-6 overflow-hidden">
        <ReactionMotif className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] max-w-none opacity-[0.35] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <p className="font-mono text-xs text-flavin tracking-[0.2em] uppercase mb-6">
            substrate &rarr; biocatalyst &rarr; product
          </p>
          <div className="flex items-end gap-5 flex-wrap">
            <img
              src="/faizan.jpeg"
              alt="Faizan Bhat"
              className="w-60 h-60 rounded-xl object-cover border border-ink-line"
            />
            <h1 className="font-display text-5xl md:text-7xl text-paper leading-[1.05] tracking-tight">
              Dr. Faizan Bhat
            </h1>
          </div>
          <p className="font-mono text-sm md:text-base text-chlorophyll-bright mt-4">
            B.Pharm &middot; M.Pharm &middot; PhD &middot; PDF
          </p>
          <p className="text-lg text-muted mt-6 max-w-2xl leading-relaxed">
            Biocatalysis and chemoenzymatic synthesis researcher building computational
            tools for process chemistry &mdash; where enzyme mechanism meets code.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#work"
              className="rounded-full bg-flavin text-ink font-medium px-6 py-3 text-sm hover:bg-paper transition-colors"
            >
              See the tools
            </a>
            <a
              href="mailto:faizan0623@icloud.com"
              className="rounded-full border border-ink-line text-paper px-6 py-3 text-sm hover:border-chlorophyll transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-4">
        <div className="max-w-5xl mx-auto border-t border-ink-line pt-16">
          <div className="grid md:grid-cols-[1fr_2fr] gap-8">
            <div>
             
              <p className="font-mono text-xs text-muted uppercase tracking-wider">About</p>
            </div>
            <div className="space-y-5 text-muted leading-relaxed max-w-2xl">
              <p>
                I'm a scientist working at the intersection of biocatalysis,
                chemoenzymatic synthesis, and process chemistry. My doctoral research at
                the University of Groningen was supported
                by a Marie Curie Cofund fellowship, and focused on chemoenzymatic synthesis and flavin-dependent
                nitroreductases and photoenzymatic catalysis &mdash; using enzymes and
                light together to run selective, sustainable reactions that are otherwise
                difficult to control. That work carried into industry, where I worked on
                chemoenzymatic synthesis and scale-up optimization, leading DoE process
                optimization, and client oriented campaigns as a Senior Scientist.
              </p>
              <p>
                I'm currently building out a computational side to that domain expertise
                &mdash; learning Python, RDKit, and KNIME to develop tools that connect
                molecular structure, reaction data, and process outcomes. The two apps
                below were the first step; the tools below those are what I'm building
                as I go.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <SectionLabel index="01">Tools &amp; applications</SectionLabel>
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCard
              title="Pherith"
              tagline="biocatalysis research desktop application"
              description="A desktop tool for biocatalysis researchers, built to organize and work with enzyme and reaction data during method development &mdash; grown out of the day-to-day needs of running a biocatalysis lab."
              tags={["Electron", "React", "Biocatalysis"]}
              status={{ label: "shipped", tone: "chlorophyll" }}
              links={[{ href: "https://faizan0623.github.io/Pherith/", label: "Open Pherith" }]}
            />
            <ProjectCard
              title="Daftaros eLab"
              tagline="pharmacy lab journal"
              description="An electronic lab journal built for pharmacy and pharmaceutical science settings, for recording experiments and lab work in a structured, searchable format."
              tags={["Web app", "Netlify", "Lab records"]}
              status={{ label: "shipped", tone: "chlorophyll" }}
              links={[{ href: "https://daftaros-elab.netlify.app", label: "Open Daftaros eLab" }]}
            />
            <ProjectCard
              title="Substrate scope scorer"
              tagline="RDKit &middot; enzyme substrate screening"
              description="A rules-based RDKit pipeline that featurizes candidate substrates (functional groups, sterics, electronics) and scores likely acceptance by a given enzyme class, grounded in literature SAR rather than a black-box model."
              tags={["Python", "RDKit"]}
              status={{ label: "in progress", tone: "flavin" }}
              links={[]}
            />
            <ProjectCard
              title="DoE-to-descriptor correlator"
              tagline="KNIME &middot; process optimization"
              description="A KNIME workflow linking DoE campaign outputs (yield, ee, conversion across conditions) to molecular descriptors of substrate and catalyst, aimed at spotting which structural features actually drive process performance."
              tags={["KNIME", "DoE", "Process chemistry"]}
              status={{ label: "in progress", tone: "flavin" }}
              links={[]}
            />
          </div>
        </div>
      </section>

      <section id="publications" className="px-6 py-24 bg-ink-panel/30">
        <div className="max-w-5xl mx-auto">
          <SectionLabel index="02">Research</SectionLabel>
          <div className="grid md:grid-cols-2 gap-6">
            <ResearchCard
              title="Tailored photoenzymatic systems for selective reduction of aliphatic and aromatic nitro compounds fueled by light"
              journal="Nature Communications, 14, 5442"
              year="2023"
              doi="10.1038/s41467-023-41194-w"
              accent="flavin"
              summary="Developed light-powered enzymatic systems that selectively reduce nitro groups to amines under mild, aqueous conditions — replacing traditional metal catalysts and harsh reagents with a cleaner, more selective route."
              skills={["Photobiocatalysis", "Flavin-dependent enzymes", "Reaction engineering", "Selectivity control"]}
            />
            <ResearchCard
              title="Chemoenzymatic Asymmetric Synthesis of Complex Heterocycles: Dihydrobenzoxazinones and Dihydroquinoxalinones"
              journal="ACS Catalysis, 12, 11421–11427"
              year="2022"
              doi="10.1021/acscatal.2c03008"
              accent="chlorophyll"
              summary="Combined enzymatic and chemical steps in a one-pot cascade to build chiral heterocyclic scaffolds relevant to drug-like molecules, avoiding the multi-step purification a purely chemical route would need."
              skills={["Cascade design", "Asymmetric synthesis", "Heterocycle chemistry", "Biocatalyst selection"]}
            />
            <ResearchCard
              title="Chemo- and Enantioselective Photoenzymatic Ketone Reductions Using a Promiscuous Flavin-dependent Nitroreductase"
              journal="ChemCatChem, 14, e202200043"
              year="2022"
              doi="10.1002/cctc.202200043"
              accent="spectral"
              summary="Repurposed a nitroreductase for enantioselective ketone reduction under light, expanding a naturally narrow enzyme's function into new synthetic territory through substrate and condition screening."
              skills={["Enzyme promiscuity", "Photoenzymatic reduction", "Enantioselective catalysis"]}
            />
            <ResearchCard
              title="Exploring the Substrate Scope and Catalytic Promiscuity of Nitroreductase-Like Enzymes"
              journal="Advanced Synthesis & Catalysis, 366(22), 4679–4687"
              year="2024"
              doi="10.1002/adsc.202400220"
              accent="flavin"
              summary="Systematically mapped which substrates a family of nitroreductase-like enzymes will accept, building the structure–activity foundation later used to target new reaction types with these enzymes."
              skills={["Substrate scope screening", "SAR analysis", "Enzyme characterization"]}
            />
            <ResearchCard
              title="Exploiting Nitroreductases for the Tailored Photoenzymatic Synthesis of Structurally Diverse Heterocyclic Compounds"
              journal="Chemistry – A European Journal, 30(56)"
              year="2024"
              doi="10.1002/chem.202402380"
              accent="chlorophyll"
              summary="Extended the nitroreductase photoenzymatic platform to build a structurally diverse set of heterocyclic products directly from simple starting materials in one pot."
              skills={["Photobiocatalysis", "Reaction scope expansion", "Heterocycle synthesis"]}
            />
            <ResearchCard
              title="Multigram-scale chemoenzymatic synthesis of diverse aminopolycarboxylic acids as potential metallo-β-lactamase inhibitors"
              journal="Organic & Biomolecular Chemistry, 22, 491–495"
              year="2024"
              doi="10.1039/D3OB01405C"
              accent="spectral"
              summary="Scaled an enzymatic lyase route up to multigram quantities (&gt;99% conversion, 82% isolated yield, dr &gt;95:5), then built a protection/derivatization strategy around it — direct, hands-on evidence of taking a biocatalytic reaction from bench to scale."
              skills={["Scale-up", "Process chemistry", "Enzymatic lyase catalysis", "Route design"]}
            />
          </div>
        </div>
      </section>

      <section id="teaching" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <SectionLabel index="03">Teaching</SectionLabel>
          <div className="rounded-2xl border border-ink-line bg-ink-panel p-8 max-w-2xl">
            <p className="font-mono text-xs text-spectral mb-3">Preply &middot; English &amp; corporate communication</p>
            <p className="text-muted leading-relaxed">
              I offer personalized English coaching focused on building confidence and
              real-life communication skills. Each lesson combines speaking, vocabulary,
              grammar, pronunciation, reading, listening, and writing through engaging,
              conversation-based activities. Lessons are tailored to individual goals,
              whether for work, exams, travel, or everyday life, with practical feedback
              to help students become more fluent and confident English speakers.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 border-t border-ink-line">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <h2 className="font-display text-3xl text-paper mb-4">Get in touch</h2>
            <p className="text-muted max-w-md leading-relaxed">
              Open to biocatalysis, process chemistry, and cheminformatics
              opportunities across Europe. Reach out directly or find me on
              LinkedIn.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-sm">
            <a href="mailto:faizan0623@icloud.com" className="text-flavin hover:text-paper transition-colors">
              faizan0623@icloud.com
            </a>
            <a
              href="https://www.linkedin.com/in/faizan-bhat-phd-aa312957/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-paper transition-colors"
            >
              LinkedIn &rarr;
            </a>
            <a
              href="https://zahir666.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-paper transition-colors"
            >
              Also writing, on The Recognition &rarr;
            </a>
          </div>
        </div>
        <p className="max-w-5xl mx-auto mt-16 text-xs text-muted font-mono">
          &copy; 2026 Faizan Bhat.
        </p>
      </section>
    </div>
  );
}
