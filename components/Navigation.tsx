"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function NavigationClassic() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled
          ? "backdrop-blur-md bg-white/70 dark:bg-[#071428]/70 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 no-underline"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0b2545] to-[#123a6b] flex items-center justify-center shadow text-white">
              <span className="font-serif font-extrabold">MA</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight whitespace-nowrap">
              <span className="text-sm font-semibold text-[#0b2545] dark:text-white">
                Md Ashik Alam
              </span>
              <span className="hidden xl:inline text-xs text-[#6b7e94] dark:text-gray-400">
                Full-Stack Software Engineer
              </span>
            </div>
          </a>

          {/* Center Nav (Desktop) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex gap-3 xl:gap-6 items-center"
          >
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-sm font-medium px-1 py-2 text-[#0b2545] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d6b85a] rounded"
                >
                  <span
                    className={`transition-colors ${isActive
                        ? "text-[#0b2545] dark:text-white"
                        : "text-[#51627a] dark:text-gray-300"
                      }`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-[#0b2545] to-[#d6b85a] rounded"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d6b85a]"
              aria-label="Toggle color theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-[#0b2545]" />
              ) : (
                <Sun className="w-5 h-5 text-[#d6b85a]" />
              )}
            </button>

             <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full btn-split-window text-sm font-semibold shadow"
            >
              Contact
            </a>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d6b85a]"
            >
              {open ? (
                <X className="w-5 h-5 text-[#0b2545] dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-[#0b2545] dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-[#071428] border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-sm font-medium text-[#0b2545] dark:text-gray-300 hover:text-[#d6b85a] dark:hover:text-[#d6b85a] transition"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center mt-3 h-12 rounded-full btn-split-window font-semibold"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
