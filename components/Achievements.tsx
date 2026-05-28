"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, FileText, Code, ExternalLink } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "NIMCET AIR 1272",
    description:
      "Secured All India Rank 1272 among 60,000+ candidates in the national-level entrance exam, earning admission to the prestigious Master of Computer Applications (MCA) program at BVICAM, New Delhi.",
    link: "https://www.bvicam.ac.in/",
    linkLabel: "Institution Portal",
  },
  {
    icon: FileText,
    title: "Published Research Paper",
    description:
      "Co-authored and published a research paper on Digital Web Analytics at INDIACom 2024, BVICAM's annual international conference on computing, communication, and system design.",
    link: "https://www.bvicam.ac.in/indiaCom/",
    linkLabel: "Conference Website",
  },
  {
    icon: Code,
    title: "300+ LeetCode Solved",
    description:
      "Solved 300+ Data Structures and Algorithms problems covering arrays, trees, graphs, dynamic programming, and system design patterns, establishing strong analytical and problem-solving skills.",
    link: "https://leetcode.com/MdAshikAlam/",
    linkLabel: "LeetCode Profile",
  },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-12 bg-[#f7f5f0] dark:bg-[#0b2545]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white tracking-tight">
            Key Achievements
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#324a6b] dark:text-gray-300 max-w-2xl mx-auto">
            Recognitions, academic milestones, and engineering contributions that showcase my analytical foundation.
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
                className="relative rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 p-8 shadow-md hover:shadow-xl transition transform-gpu hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon badge */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0b2545] to-[#d6b85a] flex items-center justify-center text-white shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="pt-6">
                    <h3 className="text-xl font-serif font-semibold text-[#0b2545] dark:text-white mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-[#324a6b] dark:text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="inline-flex px-3 py-1 rounded-full bg-[#fffaf0] text-[#6b4b00] text-xs font-semibold border border-[#f0e2b8] dark:bg-[#0c233c] dark:text-[#d6b85a] dark:border-[#083043]">
                    Accomplished
                  </span>

                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0b2545] dark:text-[#d6b85a] hover:underline"
                    >
                      <span>{achievement.linkLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-3 px-8 h-12 rounded-full btn-split-window font-semibold shadow"
          >
            Explore Projects
          </a>
        </div>
      </div>
    </section>
  );
}
