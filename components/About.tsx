"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Rocket, Target, Heart, ArrowRight, Briefcase, Calendar, Layers } from "lucide-react";

const highlights = [
  {
    Icon: Code,
    title: "Full‑Stack Development",
    description: "End-to-end apps with React, Next.js, Node.js, and MongoDB - from multi-clinic doctor booking systems to real-time quiz platforms.",
  },
  {
    Icon: Rocket,
    title: "Modern Tooling",
    description: "TypeScript, Vercel, CI/CD, Swagger APIs, and pragmatic serverless deployment in production environments.",
  },
  {
    Icon: Target,
    title: "Problem Solving",
    description: "300+ DSA problems solved on LeetCode; NIMCET All India Rank 1272 among 60,000+ applicants.",
  },
  {
    Icon: Heart,
    title: "Human‑Centered UX",
    description: "Accessible, responsive interfaces - including booking UIs for clinic patients and content systems for media publishers.",
  },
];

function useCountUp(target: number, inView: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.floor(t * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return value;
}

export default function AboutClassicProfessional() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const exp = useCountUp(1, inView, 600);
  const projects = useCountUp(10, inView, 900);
  const solved = useCountUp(300, inView, 1200);

  return (
    <section id="about" ref={ref} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#f7f5f0] dark:bg-[#071428]">
      <div className="max-w-7xl mx-auto">
        <motion.header initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white">About</h2>
          <p className="mt-3 text-sm md:text-base text-[#324a6b] dark:text-gray-300 max-w-2xl mx-auto">Full-stack developer with a passion for healthcare and education technology.</p>
          <hr className="mt-6 w-28 mx-auto border-t-2 border-[#d6b85a] opacity-90" />
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: narrative */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="lg:col-span-8">
            <div className="prose max-w-none dark:prose-invert text-[#0b2545] dark:text-gray-200">
              <p className="text-xl font-semibold">Full-Stack Software Engineer specializing in healthcare and enterprise web applications.</p>
              <p className="text-base text-[#324a6b] dark:text-gray-300">I hold a BCA and an MCA (BVICAM, First Class - 80%) and currently work at Mobiloitte Technologies, where I build production Next.js frontends and Node.js/Express APIs, implement SEO strategies, and integrate third-party services like Twilio. I care deeply about accessible interfaces and maintainable code - my projects span telehealth booking systems, blockchain-backed donation trackers, and real-time multiplayer platforms.</p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {highlights.map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.08 * i }} className="rounded-lg bg-white dark:bg-[#081226] border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="flex-none w-12 h-12 rounded-md bg-gradient-to-br from-[#0b2545] to-[#123a6b] flex items-center justify-center text-white shadow">
                      <h.Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#0b2545] dark:text-white">{h.title}</h3>
                      <p className="mt-1 text-sm text-[#324a6b] dark:text-gray-300">{h.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <a href="#projects" className="inline-flex items-center gap-3 px-5 py-3 rounded-md btn-split-window font-semibold shadow">
                See Projects
                <ArrowRight className="w-4 h-4 opacity-80" />
              </a>
            </div>
          </motion.div>

          {/* Right: classic stats card */}
          <motion.aside initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 }} className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="rounded-2xl bg-white dark:bg-[#071428] border border-gray-100 dark:border-gray-800 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-md bg-[#d6b85a] flex items-center justify-center text-[#0b2545] font-bold">MA</div>
                  <div>
                    <div className="text-sm text-[#0b2545] dark:text-white font-semibold">Md Ashik Alam</div>
                    <div className="text-xs text-[#6b7e94] dark:text-gray-400">Full-Stack Software Engineer</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#fffaf0] border border-[#f1e8cf]">
                    <div className="text-xs text-[#6b7e94] uppercase tracking-wide">Experience</div>
                    <div className="text-2xl font-extrabold text-[#0b2545] mt-1">{exp}+ Year</div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-extrabold text-[#0b2545]">{projects}+</div>
                        <div className="text-xs text-[#6b7e94] uppercase tracking-wide">Projects</div>
                      </div>
                      <Layers className="w-5 h-5 text-[#6b7e94]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-extrabold text-[#0b2545]">{solved}+</div>
                        <div className="text-xs text-[#6b7e94] uppercase tracking-wide">LeetCode</div>
                      </div>
                      <Calendar className="w-5 h-5 text-[#6b7e94]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-gray-100 text-sm text-[#324a6b]">Available for select opportunities • Open to remote roles</div>
                </div>

                <div className="mt-6">
                  <a href="#contact" className="inline-flex items-center gap-3 w-full justify-center px-4 py-2 rounded-md btn-split-window font-semibold shadow">Contact</a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
