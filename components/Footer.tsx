"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function FooterClassicProfessional() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0b2545] text-gray-100 py-16 px-6 overflow-hidden">
      {/* Decorative gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#d6b85a]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top: logo / name + navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-700 pb-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              Md Ashik Alam
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Full-Stack Developer & Tech Enthusiast
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-[#d6b85a] transition-colors">
              About
            </a>
            <a href="#education" className="hover:text-[#d6b85a] transition-colors">
              Education
            </a>
            <a href="#projects" className="hover:text-[#d6b85a] transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-[#d6b85a] transition-colors">
              Contact
            </a>
          </nav>
        </motion.div>

        {/* Middle: social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center gap-6"
        >
          <a
            href="https://github.com/MdAshikAlam/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 border border-gray-700 hover:bg-[#d6b85a] hover:text-[#0b2545] transition-all"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammadashikalam/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 border border-gray-700 hover:bg-[#d6b85a] hover:text-[#0b2545] transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:mdashikalam05@gmail.com"
            className="p-3 rounded-full bg-white/10 border border-gray-700 hover:bg-[#d6b85a] hover:text-[#0b2545] transition-all"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700" />

        {/* Bottom credits */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400"
        >
          <p>
            © {currentYear} Md Ashik Alam. All rights reserved. Crafted with{" "}
            <span className="text-[#d6b85a] font-semibold">passion</span> and{" "}
            <span className="text-[#d6b85a] font-semibold">precision</span>.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
