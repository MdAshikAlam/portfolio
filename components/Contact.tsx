"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  User,
  Building,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    roleOpportunity: "",
    message: "",
  });

  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error" >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    roleOpportunity: "",
    message: "",
  });

  useEffect(() => {
    if (status === "sent") {
      const t = setTimeout(() => setStatus("idle"), 5000);
      return () => clearTimeout(t);
    }
  }, [status]);

  function validate() {
    const e = { name: "", email: "", roleOpportunity: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      e.name = "Please enter your name";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      e.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      e.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.roleOpportunity.trim()) {
      e.roleOpportunity = "Please specify the role, position, or opportunity";
      isValid = false;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      e.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(e);
    return isValid;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    if ((e.target.name === "message" || e.target.name === "name") && value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData({ ...formData, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Please enter your name";
      } else if (value.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        newErrors.name = "";
      }
    }

    if (name === "email") {
      if (!value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        newErrors.email = "";
      }
    }

    if (name === "roleOpportunity") {
      if (!value.trim()) {
        newErrors.roleOpportunity = "Please specify the role, position, or opportunity";
      } else {
        newErrors.roleOpportunity = "";
      }
    }

    if (name === "message") {
      if (!value.trim() || value.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters";
      } else {
        newErrors.message = "";
      }
    }

    setErrors(newErrors);
  };

  const isFormValid =
    formData.name.trim().length >= 2 &&
    formData.email.trim() !== "" &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email) &&
    formData.roleOpportunity.trim() !== "" &&
    formData.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        company: "",
        roleOpportunity: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Error sending contact email:", err);
      setErrorMessage(err.message || "Failed to send. Please try again later.");
      setStatus("error");
    }
  };

  const availabilityList = [
    "Full-Time Engagements",
    "Remote Software Roles",
    "Technical Collaborations",
    "MERN / Next.js Consultations",
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#071428] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#6b4b00] dark:text-[#d6b85a] uppercase tracking-wider bg-white dark:bg-gray-900 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800">
            Let&apos;s Connect
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0b2545] dark:text-white mt-4">
            Get In Touch
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#324a6b] dark:text-gray-300 max-w-2xl mx-auto">
            I’m open to full-time opportunities, freelance collaborations, and impactful engineering projects.
          </p>
          <hr className="mt-6 w-24 mx-auto border-t-2 border-[#d6b85a] opacity-90" />
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Information & Availability Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-8 shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#0b2545] dark:text-white mb-2">
                Connect With Me
              </h3>
              <p className="text-sm text-[#51627a] dark:text-gray-300 mb-6">
                Fill out the form or reach out directly via email or phone.
              </p>

              {/* Directly replies indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#fffaf0] dark:bg-[#07243a] border border-[#f1e2b8] dark:border-[#083043] text-sm font-medium text-[#6b4b00] dark:text-[#d6b85a] mb-8">
                <span>📩 Usually replies within 24 hours</span>
              </div>

              {/* Direct Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-[#324a6b] dark:text-gray-300 text-sm">
                  <div className="w-10 h-10 rounded-full bg-[#f1efe9] dark:bg-gray-800 flex items-center justify-center text-[#0b2545] dark:text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">+91 89694 11974</span>
                </div>
                <div className="flex items-center gap-4 text-[#324a6b] dark:text-gray-300 text-sm">
                  <div className="w-10 h-10 rounded-full bg-[#f1efe9] dark:bg-gray-800 flex items-center justify-center text-[#0b2545] dark:text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:mdashikalam05@gmail.com"
                    className="font-semibold underline hover:text-[#d6b85a] transition-colors"
                  >
                    mdashikalam05@gmail.com
                  </a>
                </div>
              </div>

              {/* Availability Panel */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mb-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0b2545] dark:text-white mb-4">
                  Currently Available For:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availabilityList.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#324a6b] dark:text-gray-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#fffaf0] dark:bg-[#07243a] border border-[#f1e2b8] dark:border-[#083043] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#6b4b00] dark:text-[#d6b85a]" />
                      </div>
                      <span className="font-medium text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/mohammadashikalam/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full btn-split-window text-sm font-semibold shadow-sm"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/MdAshikAlam/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full btn-split-window text-sm font-semibold shadow-sm"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </motion.aside>

          {/* Contact Inquiry Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-8 shadow-md relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#e8f5e9] dark:bg-green-950/40 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#0b2545] dark:text-white">
                    Thank you for reaching out!
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#324a6b] dark:text-gray-300 max-w-md">
                    I’ve received your message and will get back to you as soon as possible.
                  </p>
                  <div className="mt-4 text-sm text-[#6b4b00] dark:text-[#d6b85a] font-medium bg-[#fffaf0] dark:bg-gray-950 border border-[#f1e2b8] dark:border-gray-800/80 px-4 py-2 rounded-lg">
                    ✅ Message Sent Successfully
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-2.5 rounded-lg bg-[#0b2545] text-white font-semibold text-sm shadow hover:opacity-95 transition"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-[#0b2545] dark:text-white mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          maxLength={50}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                            errors.name ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                          } bg-white dark:bg-gray-950 text-[#0b2545] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6b85a] transition-all text-sm`}
                        />
                      </div>
                      {errors.name && (
                        <div className="text-xs text-red-500 mt-1">{errors.name}</div>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#0b2545] dark:text-white mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          maxLength={100}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                            errors.email ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                          } bg-white dark:bg-gray-950 text-[#0b2545] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6b85a] transition-all text-sm`}
                        />
                      </div>
                      {errors.email && (
                        <div className="text-xs text-red-500 mt-1">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company / Organization */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-[#0b2545] dark:text-white mb-2"
                      >
                        Company / Organization (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                          <Building className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={handleChange}
                          maxLength={100}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-[#0b2545] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6b85a] transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Role / Opportunity */}
                    <div>
                      <label
                        htmlFor="roleOpportunity"
                        className="block text-sm font-semibold text-[#0b2545] dark:text-white mb-2"
                      >
                        Role / Opportunity <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="roleOpportunity"
                          id="roleOpportunity"
                          required
                          placeholder="e.g. Senior Full-Stack Engineer"
                          value={formData.roleOpportunity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          maxLength={100}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                            errors.roleOpportunity
                              ? "border-red-400"
                              : "border-gray-200 dark:border-gray-700"
                          } bg-white dark:bg-gray-950 text-[#0b2545] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6b85a] transition-all text-sm`}
                        />
                      </div>
                      {errors.roleOpportunity && (
                        <div className="text-xs text-red-500 mt-1">{errors.roleOpportunity}</div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#0b2545] dark:text-white mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-400 dark:text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        name="message"
                        id="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        placeholder="Detail your engineering requirements, project plans, or position profile..."
                        autoCapitalize="sentences"
                        maxLength={1000}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.message ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                        } bg-white dark:bg-gray-950 text-[#0b2545] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d6b85a] transition-all text-sm resize-none`}
                      />
                    </div>
                    {errors.message && (
                      <div className="text-xs text-red-500 mt-1">{errors.message}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={status === "sending" || !isFormValid}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 h-12 rounded-full btn-split-window font-semibold shadow disabled:opacity-50 disabled:pointer-events-none min-w-[160px]"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>

                    {status === "error" && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-800/40">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
