"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Database, Terminal, Wrench, Search, Code2 } from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend Development",
    icon: Layers,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    label: "Backend & Databases",
    icon: Database,
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "RESTful APIs",
      "MySQL",
      "JWT Authentication",
      "Middleware Design",
    ],
  },
  {
    id: "cs",
    label: "CS Fundamentals",
    icon: Terminal,
    skills: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Computer Networks",
      "Object-Oriented Programming (OOP)",
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Postman",
      "Swagger API Docs",
      "Vercel",
      "Render",
      "VS Code",
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter logic
  const isSkillMatch = (skill: string) =>
    skill.toLowerCase().includes(searchQuery.trim().toLowerCase());

  const getFilteredCategories = () => {
    return skillCategories
      .map((cat) => {
        const matches = cat.skills.filter(isSkillMatch);
        return { ...cat, skills: matches };
      })
      .filter((cat) => {
        if (activeCategory !== "All" && cat.label !== activeCategory) {
          return false;
        }
        return cat.skills.length > 0;
      });
  };

  const filteredCategories = getFilteredCategories();
  const hasResults = filteredCategories.length > 0;

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-12 bg-[#f7f5f0] dark:bg-[#0b2545]"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-4">
            <Code2 className="w-4 h-4 text-[#0b2545] dark:text-[#d6b85a]" />
            <span className="text-sm font-semibold text-[#0b2545] dark:text-gray-300 uppercase tracking-wide">
              Expertise
            </span>
          </div>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white"
          >
            Technical Stack & Core Skills
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#324a6b] dark:text-gray-300 max-w-2xl">
            A comprehensive overview of my tech stack, frameworks, tools, and computer science fundamentals.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-gray-200/50 dark:border-gray-800/50">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeCategory === "All"
                  ? "bg-[#0b2545] text-white dark:bg-[#d6b85a] dark:text-[#071428] shadow"
                  : "bg-white dark:bg-gray-950 text-[#0b2545] dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50"
              }`}
            >
              All Skills
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                  activeCategory === cat.label
                    ? "bg-[#0b2545] text-white dark:bg-[#d6b85a] dark:text-[#071428] shadow"
                    : "bg-white dark:bg-gray-950 text-[#0b2545] dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search skills (e.g. Next.js)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-[#d6b85a] text-[#0b2545] dark:text-white"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hasResults ? (
            filteredCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="p-2.5 rounded-xl bg-[#f1edd6] dark:bg-[#0c233c] text-[#0b2545] dark:text-[#d6b85a]">
                      <IconComponent className="w-5 h-5 sm:w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0b2545] dark:text-white">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {cat.skills.length} skills listed
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-[#fffaf0] dark:bg-[#07243a] border border-[#f1e8cf] dark:border-[#083043] text-[#6b4b00] dark:text-[#d6b85a] hover:scale-105 hover:border-[#d6b85a] transition duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-[#324a6b] dark:text-gray-400 font-medium">
                No matching skills found. Try searching for something else.
              </p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full btn-split-window font-semibold shadow"
          >
            Request Full Technology Deck
          </a>
        </motion.div>
      </div>
    </section>
  );
}
