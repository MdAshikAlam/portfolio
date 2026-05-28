"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

const education = [
  {
    degree: "MCA (Master of Computer Application)",
    institution: "BVICAM, New Delhi",
    period: "Sep 2023 – May 2025",
    percentage: "80%",
    honors: "First Class",
    description: "Core subjects included Advanced Algorithms, Software Engineering, Database Management Systems, Computer Networks, and Web Technologies.",
  },
  {
    degree: "BCA (Bachelor of Computer Application)",
    institution: "Magadh University, Gaya",
    period: "July 2018 – Dec 2021",
    percentage: "66%",
    honors: "Academic Excellence",
    description: "Covered fundamentals of Programming (C, Java), Data Structures, Operating Systems, Computer Organization, and Information Technology.",
  },
];

export default function EducationClassicProfessional() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="education" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#071428]">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white tracking-tight">
            Education
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#324a6b] dark:text-gray-300 max-w-2xl mx-auto">
            Academic credentials and achievements presented in a refined, classic style suitable for professional portfolios.
          </p>
          <hr className="mt-6 w-28 mx-auto border-t-2 border-[#d6b85a] opacity-90" />
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((e, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition transform-gpu hover:-translate-y-1"
            >
              <div className="flex items-start gap-5">
                <div className="flex-none w-14 h-14 rounded-md bg-gradient-to-br from-[#0b2545] to-[#123a6b] flex items-center justify-center text-white shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-serif font-semibold text-[#0b2545] dark:text-white">{e.degree}</h3>
                  <p className="text-sm text-[#324a6b] dark:text-gray-300 mt-1">{e.institution}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#6b7e94] dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{e.period}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#fff6e1] text-[#6b4b00] text-xs font-semibold border border-[#f0e2b8]">
                    <Award className="w-4 h-4" /> {e.honors}
                  </div>
                  <div className="mt-4 text-sm text-[#324a6b] dark:text-gray-300">
                    <p>{e.description}</p>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-[#0b2545] dark:text-white">Overall Percentage: {e.percentage}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
