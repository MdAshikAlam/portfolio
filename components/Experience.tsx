"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

/* ---------------- VARIANTS ---------------- */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* ---------------- DATA ---------------- */

const experiences = [
  {
    title: "Full-Stack Software Engineer (Trainee)",
    company: "Mobiloitte Technologies",
    location: "Delhi, India",
    period: "Jul 2025 – Present",
    promoted: true,
    promoText: "Promoted after completing internship",
    summary: "Working on production-grade full-stack applications using Next.js, React.js, Node.js, Express.js, and MongoDB.",
    contributions: [
      "Built scalable REST APIs and backend services",
      "Developed SEO-optimized Next.js interfaces",
      "Implemented authentication and admin dashboards",
      "Integrated third-party services like Twilio APIs",
      "Contributed to production deployment and debugging",
      "Improved UI responsiveness and performance optimization",
    ],
    tech: ["Next.js", "React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "JWT", "Twilio"],
  },
  {
    title: "Frontend Web Development Intern",
    company: "IBM SkillsBuild (CSRBOX)",
    location: "Remote",
    period: "Jun 2024 – Aug 2024",
    promoted: false,
    promoText: "",
    summary: "Completed a frontend web development internship focused on modern UI development and responsive design practices.",
    contributions: [
      "Built interactive and responsive web pages using HTML, CSS, and JavaScript",
      "Applied frontend development principles in practical projects",
      "Improved understanding of responsive layouts and UI structuring",
      "Gained hands-on exposure to real-world frontend workflows",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function ExperienceModernProfessional() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f7f5f0] dark:bg-[#0b2545]"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg
          className="absolute right-0 top-0 w-[48rem] max-w-none opacity-10 dark:opacity-5 translate-x-16 -translate-y-24"
          viewBox="0 0 600 600"
        >
          <defs>
            <linearGradient id="expGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#60A5FA" />
              <stop offset="1" stopColor="#C084FC" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="200" r="180" fill="url(#expGrad)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white">
            Professional Experience
          </h2>

          <p className="mt-3 text-[#324a6b] dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
            A timeline of my professional roles, key accomplishments, and production engineering impact.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ duration: 0.8 }}
            className="mt-6 mx-auto h-1.5 bg-[#d6b85a] rounded-full"
          />
        </motion.div>

        {/* Experience Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                y: -6,
              }}
              className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-8 flex flex-col justify-between transition-shadow"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0b2545] to-[#123a6b] flex items-center justify-center text-white shadow-md">
                    <Briefcase className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    {exp.promoted && (
                      <span className="px-2 py-1 text-xs rounded-full bg-[#d6b85a] text-[#0b2545] font-bold">
                        Promoted ↑
                      </span>
                    )}
                  </div>
                </div>

                {/* Job Title & Company */}
                <h3 className="text-2xl font-serif font-bold text-[#0b2545] dark:text-white">
                  {exp.title}
                </h3>
                <p className="text-sm font-semibold text-[#b89530] mt-0.5">
                  {exp.company}
                </p>

                {/* Date & Location */}
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#6b7e94] dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {exp.location}
                  </span>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm font-medium text-[#0b2545] dark:text-gray-200">
                  {exp.summary}
                </p>

                {/* Key Contributions */}
                <ul className="mt-4 space-y-2 text-sm text-[#324a6b] dark:text-gray-300 list-disc pl-4 leading-relaxed">
                  {exp.contributions.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Tags & CTA */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2 py-1 rounded bg-[#fffaf0] dark:bg-white/5 text-[#6b4b00] dark:text-gray-300 border border-[#f1e8cf] dark:border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-right">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b2545] dark:text-white hover:text-[#d6b85a] transition"
                  >
                    View projects <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
