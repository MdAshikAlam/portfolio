"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code2,
  ArrowRight,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * Fixed: prevents category badge from overlapping title when image missing.
 * - tracks image load per project (imgLoaded map)
 * - shows absolute badge only when image is present
 * - shows inline badge when image missing
 * - keeps same navy + gold theme
 */

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  blurb: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  liveAdmin?: string;
  category: string;
  image: string;
  allowEmbed?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "book-doctor",
    title: "BookMyDoctor",
    subtitle: "Doctor Appointment Platform for Clinics (Next.js · Node.js · MongoDB)",
    blurb:
      "Full-stack doctor booking aggregator where patients can search and book appointments with regional doctors across multiple registered clinics.",
    description:
      "Problem: Many independent clinics lacked dedicated booking websites, making doctor scheduling manual and limiting patient searchability. Solution: Developed a full-stack MERN application (Next.js + Node.js + MongoDB + Express) where multiple clinics register their doctors. Patients can register, check real-time doctor availability, search for doctors by district or proximity (\"near by me\"), and book appointments online. Features JWT role-based access for patients, doctors, and admins, Twilio SMS reminder integration, and an admin panel for schedule management. Outcome: Enables patients to easily find and book regional doctors online, reducing manual clinic scheduling overhead.",
    tech: ["Next.js", "React.js", "Node.js", "Express", "MongoDB", "JWT", "Twilio"],
    github: "https://github.com/MdAshikAlam/Book_Doctor_Appointment",
    live: "https://book-doctor-appointment.vercel.app/",
    category: "Full-Stack",
    image: "/Assets/Images/book-doctor-preview.jpg",
    allowEmbed: true,
  },
  {
    id: "converiqo",
    title: "<a href='https://converiqo.ai/' target='_blank' rel='noreferrer' class='hover:text-[#d6b85a] transition-colors'>Converiqo.ai</a>",
    subtitle: "AI business components & integrations",
    blurb:
      "Enterprise AI workflow automation platform designed to unify lead generation, customer support, and employee self-service touchpoints across multi-channel environments.",
    description:
      "An enterprise AI workflow automation platform that helps organizations unify lead generation, customer self-service, and employee self-service workflows into one governed automation layer. Designed with multi-channel intelligence to deploy across portals and messaging systems with a unified governance layer to monitor, audit, and secure AI-driven automations. Built for enterprises demanding secure, compliant integration setups with zero-trust architectures and custom API meshes.",
    tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "SEO (Title, Description, Schema, Open Graph, Canonical)"],
    github: "https://github.com/MdAshikAlam/",
    live: "https://converiqo.ai/",
    category: "Full-Stack",
    image: "/Assets/Images/converiqo-preview.png",
    allowEmbed: true,
  },
  {
    id: "mobiloitte",
    title: "<a href='https://www.mobiloitte.com/' target='_blank' rel='noreferrer' class='hover:text-[#d6b85a] transition-colors'>Mobiloitte Services</a>",
    subtitle: "Production Next.js & Node.js services",
    blurb:
      "Enterprise scale web portals, secure cloud infrastructures, and digital transformation services built for global organizations.",
    description:
      "Enterprise software development and digital transformation initiatives built at Mobiloitte: delivering secure, scalable web and mobile solutions across 70+ countries with 6 worldwide offices. Developed agentic AI systems, RAG-based search engines, blockchain ledgers, and secure cloud/DevOps automation architectures. Responsibilities included delivering robust frontend web portals, RESTful backend APIs, sitemap configurations, and structured search engine schemas for platforms like <a href='https://book-doctor-appointment.vercel.app/' target='_blank' rel='noreferrer' class='underline font-semibold text-[#b89530]'>BookMyDoctor</a> while integrating design concepts similar to <a href='https://converiqo.ai/' target='_blank' rel='noreferrer' class='underline font-semibold text-[#b89530]'>Converiqo.ai</a> templates.",
    tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "SEO"],
    github: "https://github.com/MdAshikAlam/",
    live: "https://www.mobiloitte.com/",
    category: "Full-Stack",
    image: "/Assets/Images/mobiloitte-preview.png",
    allowEmbed: false,
  },

];

export default function ProjectsProfessionalCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<Project | null>(null);

  // map of projectId -> boolean (true = image loaded, false = failed)
  const [imgLoaded, setImgLoaded] = useState<Record<string, boolean>>({});

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  // scroll helpers
  const scrollBy = (offset: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };
  const scrollNext = () => {
    const el = carouselRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.7, 320);
    scrollBy(step);
  };
  const scrollPrev = () => {
    const el = carouselRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.7, 320);
    scrollBy(-step);
  };

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // image handlers
  const handleImageLoad = (id: string) => {
    setImgLoaded((s) => ({ ...s, [id]: true }));
  };
  const handleImageError = (id: string) => {
    setImgLoaded((s) => ({ ...s, [id]: false }));
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#f7f5f0] dark:bg-[#071428] overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-2">
              <Code2 className="w-4 h-4 text-[#0b2545] dark:text-[#d6b85a]" />
              <span className="text-sm font-semibold text-[#0b2545] dark:text-gray-300 uppercase tracking-wide">Selected Work</span>
            </div>

            <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white">
              Projects - selected case studies
            </h2>
            <p className="mt-2 text-sm text-[#324a6b] dark:text-gray-300 max-w-2xl">
              Concise case studies with clear outcomes, technologies, and links to code and demos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setFilter(c);
                    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0 });
                  }}
                  className={`px-4 py-2 text-sm font-medium ${filter === c ? "bg-[#0b2545] text-white" : "text-[#324a6b] dark:text-gray-300"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured */}
        {visible[0] && (
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-md mb-8"
            aria-roledescription="Featured project"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* website embed / image */}
              <div className="w-full h-80 lg:h-[400px] relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
                {visible[0].allowEmbed && visible[0].live && visible[0].live !== "#" ? (
                  <iframe
                    src={visible[0].live}
                    title={`${visible[0].title} Live Preview`}
                    className="w-full h-full border-none bg-white"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                ) : (
                  <img
                    src={visible[0].image}
                    alt={`${visible[0].title} preview`}
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(visible[0].id)}
                    onError={() => handleImageError(visible[0].id)}
                  />
                )}
                {/* Show absolute badge */}
                <div className="absolute left-6 bottom-6 pointer-events-none z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fffaf0] text-[#6b4b00] border border-[#f1e8cf] text-xs font-semibold shadow-sm">
                    {visible[0].category}
                  </span>
                </div>
              </div>

              {/* content */}
              <div className="p-8">
                {/* If image missing, show inline badge so nothing overlaps */}
                {imgLoaded[visible[0].id] === false && (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fffaf0] text-[#6b4b00] border border-[#f1e8cf] text-xs font-semibold">
                      {visible[0].category}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl lg:text-3xl font-serif font-extrabold text-[#0b2545] dark:text-white" dangerouslySetInnerHTML={{ __html: visible[0].title }} />
                {visible[0].subtitle && (
                  <p className="mt-1 text-sm text-[#6b7e94] dark:text-gray-400 font-medium">{visible[0].subtitle}</p>
                )}
                <p className="mt-4 text-[#324a6b] dark:text-gray-300 text-lg" dangerouslySetInnerHTML={{ __html: visible[0].blurb }} />

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href={visible[0].github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-6 h-12 rounded-full btn-split-window font-semibold shadow-sm">
                    <Github className="w-5 h-5" />
                    <span>GitHub Repo</span>
                  </a>

                   {visible[0].live !== "#" && (
                    <a href={visible[0].live} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-6 h-12 rounded-full btn-split-window font-semibold shadow-sm">
                      <span>View Live App</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}

                  {visible[0].liveAdmin && visible[0].liveAdmin !== "#" && (
                    <a href={visible[0].liveAdmin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-6 h-12 rounded-full btn-split-window font-semibold shadow-sm">
                      <span>Admin Dashboard</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {visible[0].tech.map((t: string) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-[#fffaf0] border border-[#f1e8cf] text-[#6b4b00]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Carousel header + controls */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-[#0b2545] dark:text-white">More projects</h4>

          <div className="flex items-center gap-2">
            <button
              aria-label="Scroll previous"
              onClick={scrollPrev}
              className="p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:opacity-90"
            >
              <ChevronLeft className="w-5 h-5 text-[#0b2545] dark:text-white" />
            </button>
            <button
              aria-label="Scroll next"
              onClick={scrollNext}
              className="p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:opacity-90"
            >
              <ChevronRight className="w-5 h-5 text-[#0b2545] dark:text-white" />
            </button>
          </div>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={carouselRef}
          className="relative overflow-x-auto no-scrollbar snap-x snap-mandatory md:snap-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          role="list"
          aria-label="Project cards carousel"
        >
          <div className="flex gap-6 pb-4" style={{ minWidth: "max-content" }}>
            {visible.slice(1).map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="snap-center min-w-[340px] md:min-w-[360px] lg:min-w-[320px] relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-0 shadow-md hover:shadow-xl transition-all flex-shrink-0"
                role="listitem"
              >
                {/* website embed / image banner */}
                <div className="relative w-full h-44 overflow-hidden border-b border-gray-100 dark:border-gray-800">
                  {p.allowEmbed && p.live && p.live !== "#" ? (
                    <iframe
                      src={p.live}
                      title={`${p.title} Live Preview`}
                      className="w-full h-full border-none bg-white"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  ) : (
                    <img
                      src={p.image}
                      alt={`${p.title} preview`}
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad(p.id)}
                      onError={() => handleImageError(p.id)}
                    />
                  )}
                  {/* absolute badge */}
                  <div className="absolute left-4 top-4 pointer-events-none z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fffaf0] text-[#6b4b00] border border-[#f1e8cf] text-xs font-semibold shadow-sm">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* content */}
                <div className="p-4 flex flex-col h-full">
                  {/* inline badge if image missing */}
                  {imgLoaded[p.id] === false && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fffaf0] text-[#6b4b00] border border-[#f1e8cf] text-xs font-semibold">
                        {p.category}
                      </span>
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-semibold text-[#0b2545] dark:text-white" dangerouslySetInnerHTML={{ __html: p.title }} />
                    {p.subtitle && (
                      <p className="mt-0.5 text-xs text-[#6b7e94] dark:text-gray-400 font-medium">{p.subtitle}</p>
                    )}
                    <p className="mt-1 text-sm text-[#324a6b] dark:text-gray-300" dangerouslySetInnerHTML={{ __html: p.blurb }} />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t: string) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-[#fffaf0] text-[#6b4b00] border border-[#f1e8cf]">{t}</span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 flex items-center gap-3">
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full btn-split-window text-sm font-semibold shadow-sm">
                      <Github className="w-4 h-4" /> Code
                    </a>

                    <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full btn-split-window text-sm font-semibold shadow-sm">
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>

                    <button onClick={() => setModal(p)} className="ml-auto text-sm font-semibold text-[#0b2545] hover:underline inline-flex items-center gap-2">
                      Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* placeholder if no extra cards */}
            {visible.slice(1).length === 0 && (
              <div className="min-w-[340px] p-6 rounded-2xl border border-dashed border-gray-200 text-center text-[#6b7e94]">
                No additional projects for this filter
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${modal.title} details`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />

          <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.18 }} className="relative z-10 max-w-3xl w-full rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
            <div className="flex items-start justify-between gap-4 p-5 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold text-[#0b2545] dark:text-white" dangerouslySetInnerHTML={{ __html: modal.title }} />
                <p className="mt-1 text-sm text-[#6b7e94] dark:text-gray-400">{modal.category} • {modal.tech.join(" • ")}</p>
              </div>
              <button onClick={() => setModal(null)} className="p-2 rounded-md text-[#0b2545] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full h-56 relative overflow-hidden rounded-md border border-gray-100 dark:border-gray-800">
                {modal.allowEmbed && modal.live && modal.live !== "#" ? (
                  <iframe
                    src={modal.live}
                    title={`${modal.title} Live Preview`}
                    className="w-full h-full border-none bg-white"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                ) : (
                  <img src={modal.image} alt={`${modal.title} screenshot`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                )}
              </div>
              <div>
                <p className="text-[#324a6b] dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: modal.description }} />

                <div className="mt-6 flex gap-3">
                  <a href={modal.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full btn-split-window text-sm font-semibold shadow-sm">View code <Github className="w-4 h-4" /></a>
                  <a href={modal.live} className="inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full btn-split-window text-sm font-semibold shadow-sm">Live demo <ExternalLink className="w-4 h-4" /></a>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {modal.tech.map((t: string) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-[#fffaf0] text-[#6b4b00] border border-[#f1e2b8]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
