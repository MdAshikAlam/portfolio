"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

/* ---------------- VARIANTS ---------------- */

// Container Stagger Animation
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.50, // cards appear one by one
    },
  },
};

// Card Slide-In From Left
const cardVariants = {
  hidden: {
    opacity: 0,
    x: -60, // start from left
  },
  show: {
    opacity: 1,
    x: 0, // move to position
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Floating Effect After Appearing
const floatAnimation = {
  y: [0, -6, 0, 6, 0],
  transition: {
    repeat: Infinity,
    duration: 6,
    ease: "easeInOut",
  },
};

/* ---------------- DATA ---------------- */

const experiences = [
  {
    title: "Trainee - Full Stack Software Engineer (Full-Time)",
    company: "Mobiloitte Technologies",
    location: "Delhi (Onsite)",
    period: "Jul 2025 – Present",
    promoted: true,
    promoText: "Promoted after completing internship",
    description: [
      "Working on full-stack development using Next.js, React.js, Angular, Node.js, MongoDB.",
      "Building REST APIs, admin panels, authentication, and SEO-optimized frontend.",
      "Contributing to production deployment and debugging.",
      "Previously worked as Trainee Software Engineer (Intern, Jul 2025 – Nov 2025): Built RESTful backend APIs, developed responsive Next.js UI for Mobiloitte.com, and optimized SEO.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company: "Bharati Network",
    location: "Offline Internship at College",
    period: "Jan 2025 – May 2025 (5 months)",
    promoted: false,
    description: [
      "Contributed to a centralized content redirection platform using React.js, JavaScript, SCSS, and integrated Strapi CMS for dynamic content management.",
      "Built reusable UI components with responsive design and collaborated on key modules like Social Section, Contact Form, and Media Slider.",
    ],
  },
  {
    title: "Frontend Web Development Intern",
    company: "IBM Skills Build Internship Program",
    location: "Remote",
    period: "Jun 2024 – Aug 2024 (6 weeks)",
    promoted: false,
    description: [
      "Completed a 6-week Frontend Development internship under the IBM Skills Build Program, in collaboration with CSRBOX, gaining hands-on experience in HTML, CSS, JavaScript, and responsive design.",
      "Built and styled interactive webpages, applying core frontend principles in real-world scenarios.",
    ],
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900"
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
            Experience
          </h2>

          <p className="mt-3 text-[#324a6b] dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
            Highlights of my professional journey and hands-on development
            experience.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ duration: 0.8 }}
            className="mt-6 mx-auto h-1.5 bg-[#d6b85a] rounded-full"
          />
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 flex flex-col justify-between"
            >
              {/* Floating effect AFTER reveal */}
              <motion.div animate={floatAnimation}>
                {/* Icon + Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0b2545] to-[#123a6b] flex items-center justify-center text-white shadow-md">
                    <Briefcase className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    {exp.promoted && (
                      <span className="px-2 py-1 text-xs rounded-full bg-[#d6b85a] text-[#0b2545] font-bold">
                        Promoted ↑
                      </span>
                    )}
                    <span className="px-3 py-1 text-xs rounded-full bg-[#fff6e1] text-[#6b4b00] border border-[#f0e2b8] dark:bg-white/5 dark:text-gray-300 dark:border-white/10">
                      {i + 1} / {experiences.length}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#0b2545] dark:text-white">
                  {exp.title}
                </h3>

                <p className="text-sm font-medium text-[#324a6b] dark:text-gray-300">
                  {exp.company}
                </p>

                <div className="mt-3 text-sm text-[#6b7e94] flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {exp.period}
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {exp.location}
                  </span>

                  {(exp as any).promoText && (
                    <span className="text-xs text-[#b89530] font-semibold mt-1">
                      ({(exp as any).promoText})
                    </span>
                  )}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-[#324a6b] dark:text-gray-300 list-disc list-inside">
                  {exp.description.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>

                {/* Link */}
                <div className="mt-6 text-right">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b2545] dark:text-white hover:text-[#d6b85a] transition"
                  >
                    View projects <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
