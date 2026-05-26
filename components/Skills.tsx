"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Layers, Database, Terminal, Wrench, Search } from "lucide-react";

/**
 * Skills — Classic Professional redesign
 * - Navy + gold palette to match site
 * - Horizontal animated progress bars (more readable at small sizes)
 * - Compact category chips, improved spacing and typography
 * - Search + filter preserved
 */

const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    icon: Code,
    skills: [
      { name: "C", level: 70 },
      { name: "Java", level: 75 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Layers,
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
      { name: "Bootstrap", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Angular", level: 72 },
    ],
  },
  {
    id: "backend",
    label: "Backend & Databases",
    icon: Database,
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "MongoDB", level: 83 },
      { name: "MySQL", level: 70 },
    ],
  },
  {
    id: "cs",
    label: "CS Fundamentals",
    icon: Terminal,
    skills: [
      { name: "Data Structures & Algorithms", level: 80 },
      { name: "DBMS", level: 78 },
      { name: "Computer Networking", level: 72 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "GitLab", level: 70 },
      { name: "VS Code", level: 92 },
      { name: "Postman", level: 80 },
      { name: "Swagger", level: 75 },
      { name: "Strapi CMS", level: 70 },
      { name: "Cursor AI", level: 60 },
      { name: "ChatGPT", level: 85 },
    ],
  },
];

function ProgressBar({ value = 0 }: { value: number }) {
  return (
    <div className="w-full h-3 bg-[#e9e6da] dark:bg-[#0b2236] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-[#0b2545] to-[#d6b85a]"
      />
    </div>
  );
}

export default function SkillsClassicProfessional() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const allSkills = skillCategories.flatMap((c) =>
    c.skills.map((s) => ({ ...s, category: c.label }))
  );

  const filtered = allSkills.filter(
    (s) =>
      (active === "All" ? true : s.category === active) &&
      s.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  // keyboard accessibility: allow numeric category keys 1..N to pick categories
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= String(skillCategories.length)) {
        const idx = Number(e.key) - 1;
        setActive(skillCategories[idx].label);
      }
      if (e.key === "0") setActive("All");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0b2545] dark:text-white">
            Technical Skills
          </h2>
          <p className="mt-2 text-sm text-[#324a6b] dark:text-gray-300 max-w-2xl mx-auto">
            Organized by category with quick filters and clear proficiency indicators.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setActive("All")}
              className={`px-3 py-1.5 text-sm font-semibold rounded-full transition ${active === "All"
                ? "bg-[#0b2545] text-white shadow"
                : "bg-white dark:bg-gray-900 text-[#0b2545] dark:text-gray-200 border border-gray-200 dark:border-gray-800"
                }`}
              aria-pressed={active === "All"}
            >
              All
            </button>

            {skillCategories.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.label)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition ${active === c.label
                    ? "bg-[#d6b85a] text-[#0b2545] shadow-inner"
                    : "bg-white dark:bg-gray-900 text-[#0b2545] dark:text-gray-200 border border-gray-200 dark:border-gray-800"
                    }`}
                  aria-pressed={active === c.label}
                  title={`Filter: ${c.label} (press ${i + 1})`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="skill-search" className="sr-only">
              Search skills
            </label>
            <div className="relative">
              <input
                id="skill-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6b85a]"
                aria-label="Search skills"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0b2545] dark:text-gray-300">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category overview column */}
          <motion.aside
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-4"
          >
            {skillCategories.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.id}
                  className="relative rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-[#f1edd6] dark:bg-[#062033]">
                      <Icon className="w-5 h-5 text-[#0b2545] dark:text-[#d6b85a]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-md font-semibold text-[#0b2545] dark:text-white">{c.label}</div>
                      <div className="text-xs text-[#6b7e94] dark:text-gray-400 mt-1">{c.skills.length} skills</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.skills.slice(0, 6).map((s) => (
                      <span
                        key={s.name}
                        className="text-xs px-3 py-1 rounded-full bg-[#fffaf0] dark:bg-[#07243a] border border-[#f1e8cf] dark:border-[#083043] text-[#6b4b00] dark:text-[#d6b85a]"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.aside>

          {/* Skills list */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((s, idx) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-[#0b2545] dark:text-white truncate">{s.name}</div>
                          <div className="text-xs text-[#6b7e94] dark:text-gray-400 mt-1">{s.category}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-sm font-semibold text-[#0b2545] dark:text-white">{s.level}%</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <ProgressBar value={s.level} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full p-6 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center text-[#6b7e94]">
                  No skills match your search
                </div>
              )}
            </div>

            <div className="mt-4 text-right">
              <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-split-window text-sm font-semibold shadow">
                Hire me
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
