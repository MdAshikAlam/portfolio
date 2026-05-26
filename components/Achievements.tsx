"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, FileText, Code } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "NIMCET AIR 1272",
    description:
      "Achieved All India Rank 1272 among 60,000+ applicants in NIMCET 2023 (National MCA Common Entrance Test), earning admission to BVICAM's MCA program in New Delhi.",
  },
  {
    icon: FileText,
    title: "Published Research Paper",
    description:
      "Co-authored and published a research paper on Digital Analytics at INDIACom Tractate 2024 - BVICAM's annual national conference on computing and communication.",
  },
  {
    icon: Code,
    title: "300+ DSA Problems Solved",
    description:
      "Solved 300+ Data Structures and Algorithms problems on LeetCode, covering arrays, trees, graphs, dynamic programming, and system design patterns.",
  },
];

export default function AchievementsClassicRich() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white tracking-tight">
            Achievements
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#324a6b] dark:text-gray-300 max-w-2xl mx-auto">
            Recognitions, contributions, and milestones showcasing my academic
            and professional excellence.
          </p>
          <hr className="mt-6 w-28 mx-auto border-t-2 border-[#d6b85a] opacity-90" />
        </motion.header>

        {/* Grid of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition transform-gpu hover:-translate-y-1"
              >
                {/* Icon badge */}
                <div className="absolute -top-6 left-8">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0b2545] to-[#123a6b] flex items-center justify-center text-white shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-xl font-serif font-semibold text-[#0b2545] dark:text-white mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-[#324a6b] dark:text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                  <div className="mt-4 inline-block px-3 py-1 rounded-md bg-[#fff6e1] text-[#6b4b00] text-xs font-semibold border border-[#f0e2b8]">
                    Accomplished
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full btn-split-window font-semibold shadow"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}
