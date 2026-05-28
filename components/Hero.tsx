"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ArrowDown, MapPin, Briefcase } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const roles = [
  "Full-Stack Developer",
  "Next.js · Node.js · MongoDB",
  "Healthcare Tech Builder",
  "BCA + MCA Graduate",
];

const techStack = ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Express"];

const stats = [
  { label: "Years Exp", value: "1+", desc: "@ Mobiloitte" },
  { label: "Projects", value: "10+", desc: "Full-Stack" },
  { label: "LeetCode", value: "300+", desc: "DSA Solved" },
];

/* ─── Floating Orb ─────────────────────────────────────── */
function Orb({
  size,
  color,
  top,
  left,
  duration = 9,
  delay = 0,
}: {
  size: string;
  color: string;
  top: string;
  left: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${size} ${color}`}
      style={{ top, left }}
      animate={{ scale: [1, 1.25, 1], x: [0, 25, 0], y: [0, -18, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    />
  );
}

/* ─── Typewriter ────────────────────────────────────────── */
function useTypewriter(items: string[], reduce: boolean | null) {
  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const charRef = useRef(0);

  useEffect(() => {
    if (reduce) { setTyped(items[0]); return; }
    let timer: ReturnType<typeof setTimeout>;
    const current = items[index];

    const type = () => {
      if (charRef.current <= current.length) {
        setTyped(current.slice(0, charRef.current++));
        timer = setTimeout(type, 48);
      } else {
        timer = setTimeout(erase, 1100);
      }
    };
    const erase = () => {
      if (charRef.current >= 0) {
        setTyped(current.slice(0, Math.max(0, charRef.current--)));
        timer = setTimeout(erase, 26);
      } else {
        setIndex((p) => (p + 1) % items.length);
        charRef.current = 0;
        timer = setTimeout(type, 300);
      }
    };

    timer = setTimeout(type, 400);
    return () => clearTimeout(timer);
  }, [index, reduce, items]);

  return typed;
}

/* ─── Main Component ────────────────────────────────────── */
export default function Hero() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(roles, reduce);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <header
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden
        bg-[#f5f3ee] dark:bg-[#060e1e]"
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0b2545 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Orbs */}
        <Orb size="w-[520px] h-[520px]" color="bg-blue-400/20 dark:bg-blue-500/15" top="-8%" left="-10%" duration={11} />
        <Orb size="w-[420px] h-[420px]" color="bg-amber-400/15 dark:bg-amber-500/10" top="50%" left="60%" duration={9} delay={2} />
        <Orb size="w-[300px] h-[300px]" color="bg-cyan-400/10 dark:bg-cyan-500/10" top="70%" left="10%" duration={13} delay={4} />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f3ee]/60 dark:to-[#060e1e]/60" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT ── */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
          >

            {/* Greeting */}
            <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-[#6b7e94] dark:text-gray-400 mb-3">
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold leading-[1.05] text-[#0b2545] dark:text-white mb-2">
              Md{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#0b2545] via-[#1a4a8a] to-[#d6b85a] dark:from-white dark:via-[#a8c8ff] dark:to-[#d6b85a] bg-clip-text text-transparent">
                  Ashik Alam
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#0b2545] to-[#d6b85a] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            {/* Role location row */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-3 mb-5 text-sm text-[#6b7e94] dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Mobiloitte Technologies
              </span>
              <span className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                New Delhi, India
              </span>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="w-5 h-5 rounded-sm bg-gradient-to-br from-[#0b2545] to-[#d6b85a] flex-none" />
              <div className="text-xl md:text-2xl font-semibold text-[#0b2545] dark:text-gray-100 flex items-center">
                <span aria-live="polite">{typed}</span>
                <motion.span
                  className="ml-1 inline-block w-[2px] h-6 bg-[#d6b85a] rounded-full"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-base md:text-lg text-[#324a6b] dark:text-gray-300 max-w-xl leading-relaxed mb-8">
              Full-stack developer specializing in{" "}
              <span className="font-semibold text-[#0b2545] dark:text-white">healthcare</span> and{" "}
              <span className="font-semibold text-[#0b2545] dark:text-white">enterprise</span> web apps.
              Building production Next.js &amp; Node.js services at Mobiloitte - BCA + MCA (80%) graduate.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mb-8">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-extrabold text-[#0b2545] dark:text-white leading-none">{s.value}</span>
                  <span className="text-xs font-semibold text-[#6b7e94] dark:text-gray-400 mt-0.5 uppercase tracking-wide">{s.label}</span>
                  <span className="text-xs text-[#6b7e94] dark:text-gray-500">{s.desc}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              <motion.a
                href="https://github.com/MdAshikAlam/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(11,37,69,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 h-12 rounded-full btn-split-window font-semibold text-sm shadow-lg"
              >
                <Github className="w-4 h-4" /> GitHub
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/mohammadashikalam/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 h-12 rounded-full btn-split-window font-semibold text-sm shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-[#0a66c2]" /> LinkedIn
              </motion.a>

              <motion.a
                href="mailto:mdashikalam05@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 h-12 rounded-full btn-split-window font-semibold text-sm shadow-sm"
              >
                <Mail className="w-4 h-4" /> Hire Me
              </motion.a>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}
                  whileHover={{ y: -3, boxShadow: "0 6px 20px rgba(11,37,69,0.12)" }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-default
                    bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10
                    text-[#0b2545] dark:text-gray-200 shadow-sm backdrop-blur transition-all"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT - Profile Card ── */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            variants={fadeRight}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
          >
            <div className="relative w-full max-w-[340px]">
              {/* Glow ring behind card */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0b2545]/30 via-[#1a4a8a]/20 to-[#d6b85a]/20 blur-2xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />

              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden
                bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl
                border border-white/60 dark:border-white/10
                shadow-2xl dark:shadow-[0_0_60px_rgba(11,37,69,0.5)]">

                {/* Card header gradient band */}
                <div className="h-28 bg-gradient-to-br from-[#0b2545] via-[#123a6b] to-[#1a4a8a] relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#d6b85a]/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 2 }}
                  />
                  {/* Decorative dots */}
                  <div className="absolute bottom-3 right-4 flex gap-1.5 opacity-40">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-white" />
                    ))}
                  </div>
                </div>

                {/* Avatar — overlaps the band */}
                <div className="flex justify-center -mt-14 px-6">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d6b85a] to-[#0b2545] blur-sm"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    />
                    <div className="relative w-28 h-28 rounded-full ring-4 ring-white dark:ring-[#071428] overflow-hidden shadow-xl">
                      <img
                        src="/Assets/Images/Photo.jpg"
                        alt="Md Ashik Alam"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Online dot */}
                    <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#071428] flex items-center justify-center">
                      <span className="animate-ping absolute w-3 h-3 rounded-full bg-emerald-400 opacity-75" />
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 pb-6 pt-4 text-center">
                  <h2 className="text-lg font-bold text-[#0b2545] dark:text-white">Md Ashik Alam</h2>
                  <p className="text-xs text-[#6b7e94] dark:text-gray-400 font-medium mt-0.5">
                    Full-Stack Software Engineer
                  </p>
                  <p className="text-xs text-[#6b7e94] dark:text-gray-500 mt-0.5">Mobiloitte Technologies</p>

                  {/* Status pill */}
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                    bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20
                    text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for opportunities
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-gray-100 dark:border-white/5" />

                  {/* Contact buttons */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.a
                      href="mailto:mdashikalam05@gmail.com"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 px-3 h-12 rounded-full btn-split-window text-xs font-semibold shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </motion.a>
                    <motion.a
                      href="tel:+918969411974"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 px-3 h-12 rounded-full btn-split-window text-xs font-semibold shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </motion.a>
                  </div>

                  {/* Social icons */}
                  <div className="mt-3 flex justify-center gap-2.5">
                    {[
                      { href: "https://github.com/MdAshikAlam/", icon: Github, label: "GitHub" },
                      { href: "https://www.linkedin.com/in/mohammadashikalam/", icon: Linkedin, label: "LinkedIn" },
                    ].map(({ href, icon: Icon, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.12, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center
                          bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10
                          text-[#0b2545] dark:text-white shadow-sm hover:shadow-md transition-all"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge — NIMCET */}
              <motion.div
                className="absolute -left-4 top-20 bg-white dark:bg-[#0b2545] border border-gray-100 dark:border-[#1a4a8a]
                  rounded-xl px-3 py-2 shadow-lg text-center min-w-[90px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.06 }}
              >
                <div className="text-lg font-extrabold text-[#0b2545] dark:text-white leading-none">AIR</div>
                <div className="text-xs font-bold text-[#d6b85a]">1272</div>
                <div className="text-[9px] text-[#6b7e94] dark:text-gray-400 uppercase tracking-wide mt-0.5">NIMCET</div>
              </motion.div>

              {/* Floating badge — LeetCode */}
              <motion.div
                className="absolute -right-4 bottom-36 bg-white dark:bg-[#0b2545] border border-gray-100 dark:border-[#1a4a8a]
                  rounded-xl px-3 py-2 shadow-lg text-center min-w-[84px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.06 }}
              >
                <div className="text-lg font-extrabold text-[#0b2545] dark:text-white leading-none">300+</div>
                <div className="text-[9px] text-[#6b7e94] dark:text-gray-400 uppercase tracking-wide mt-0.5">LeetCode</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-[#6b7e94] dark:text-gray-500 hover:text-[#0b2545] dark:hover:text-gray-300 transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
            <div className="relative w-6 h-10 rounded-full border-2 border-[#6b7e94] dark:border-gray-600 group-hover:border-[#0b2545] dark:group-hover:border-gray-400 transition-colors flex items-start justify-center pt-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#0b2545] dark:bg-[#d6b85a]"
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
            </div>
          </a>
        </motion.div>
      </div>
    </header>
  );
}
