"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const CTA = () => {
  const t = useTranslations("CTA");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section id="contact" className="py-24 bg-[var(--background)] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto rounded-[48px] bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[#8A3B8B] dark:from-[#8A3D8B] dark:via-[var(--primary)] dark:to-[var(--primary)] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-[var(--primary)]/30"
      >
        {/* Background Patterns */}
        <div
          className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} w-1/2 h-full opacity-10 pointer-events-none`}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="white"
              strokeWidth="20"
              strokeDasharray="40 20"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl transition-colors duration-300 ease-in-out">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white dark:text-gray-50 transition-colors duration-300">
            {t("title_main")}{" "}
            <span className="underline decoration-white/40 dark:decoration-gray-400/40 italic transition-colors duration-300">
              {t("title_highlight")}
            </span>
          </h2>
          <p className="text-white/90 dark:text-gray-200 text-lg mb-12 max-w-xl transition-colors duration-300">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-white dark:bg-gray-100 text-[var(--primary)] font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group">
              <span>{t("cta_beta")}</span>
              <Send
                size={20}
                className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform"
              />
            </button>
            <button className="px-10 py-5 bg-white/10 dark:bg-gray-100/10 text-white dark:text-gray-100 font-bold rounded-2xl border border-white/20 dark:border-gray-400/30 hover:bg-white/20 dark:hover:bg-gray-100/20 transition-all duration-300 backdrop-blur-sm">
              {t("cta_advisor")}
            </button>
          </div>
        </div>

        {/* Floating Stat */}
        <div
          className={`absolute top-1/2 ${isRtl ? "left-24" : "right-24"} transform -translate-y-1/2 hidden xl:block`}
        >
          <div className="bg-[var(--primary-foreground)]/10 backdrop-blur-xl border border-[var(--primary-foreground)]/20 rounded-3xl p-10 text-[var(--primary-foreground)]">
            <div className="text-5xl font-black mb-2 italic">
              {t("uptime_value")}
            </div>
            <div className="text-[var(--primary-foreground)]/60 font-medium tracking-wide uppercase">
              {t("uptime")}
            </div>
            <div className="mt-8 flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[var(--primary-foreground)]/20 bg-[var(--primary-foreground)]/10"
                />
              ))}
              <span className="text-xs font-bold">{t("active_users")}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
