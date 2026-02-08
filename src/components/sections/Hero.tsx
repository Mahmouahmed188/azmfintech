"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[var(--background)]">
      {/* Background abstract shapes */}
      <div
        className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} -z-10 w-1/2 h-full opacity-10`}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full">
          <path
            fill="var(--primary)"
            d="M44.5,-76.3C57.4,-69.1,67.5,-56.3,75.4,-42.6C83.3,-28.9,89,-14.4,88.4,-0.4C87.8,13.7,80.9,27.4,72.4,40.1C63.8,52.8,53.6,64.5,40.9,71.5C28.2,78.5,14.1,80.7,-0.4,81.4C-14.8,82,-29.6,81.1,-42.9,74.5C-56.1,67.9,-67.7,55.5,-75.4,41.4C-83.1,27.3,-86.9,11.6,-86.6,-4.2C-86.3,-20,-82,-35.8,-73.4,-48.8C-64.8,-61.8,-52,-72,-38.3,-78.8C-24.6,-85.7,-10,-89.2,2.3,-93.2C14.6,-97.1,29.1,-101.5,44.5,-76.3Z"
            transform="translate(250 250)"
          />
        </svg>
      </div>

      {/* Gradient Blurs */}
      <div
        className={`absolute top-1/4 ${isRtl ? "right-1/4" : "left-1/4"} -z-10 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-[120px]`}
      />
      <div
        className={`absolute bottom-1/4 ${isRtl ? "left-1/4" : "right-1/4"} -z-10 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[120px]`}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-semibold mb-6 border border-[var(--primary-medium)]">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span>{t("badge")}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-[1.2] mb-8">
            {t("title_main")}{" "}
            <span className="text-[var(--primary)] italic">
              {t("title_highlight")}
            </span>{" "}
            {t("title_sub")}
          </h1>

          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[var(--primary-glow)] flex items-center justify-center gap-2 group">
              <span>{t("cta_consultation")}</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform"
              />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--surface)] text-[var(--text-primary)] font-bold rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-center gap-2 group">
              <span>{t("cta_case_studies")}</span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform text-[var(--text-muted)]"
              />
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="text-sm text-[var(--text-muted)]">
              <span className="text-[var(--text-primary)] font-bold">
                {t("trust_prefix")}
              </span>{" "}
              {t("trust")}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: isRtl ? -5 : 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Main Visual */}
          <div className="relative z-10 bg-[var(--glass-bg)] backdrop-blur-xl rounded-[40px] border border-[var(--glass-border)] shadow-2xl p-8 overflow-hidden group">
            <div className="aspect-[4/3] bg-[var(--gradient-card)] rounded-3xl flex items-center justify-center p-12">
              {/* Abstract card UI */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full max-w-xs"
              >
                <div
                  className={`bg-[var(--surface)] rounded-2xl shadow-2xl p-6 border border-[var(--border)] ${isRtl ? "rotate-[10deg]" : "rotate-[-10deg]"} transform transition-transform group-hover:rotate-0 duration-500`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-6 bg-[var(--background-tertiary)] rounded-md" />
                    <div className="w-8 h-8 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[var(--primary)]/40" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-2 w-3/4 bg-[var(--background-tertiary)] rounded" />
                    <div className="h-2 w-1/2 bg-[var(--background-tertiary)] rounded" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium mb-1 uppercase">
                        {t("balance")}
                      </div>
                      <div className="text-xl font-bold text-[var(--text-primary)]">
                        $42,920.00
                      </div>
                    </div>
                    <div className="w-8 h-4 bg-[var(--primary-light)] rounded-sm" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div
                  className={`absolute -top-4 ${isRtl ? "-left-10" : "-right-10"} bg-[var(--surface)] p-4 rounded-2xl shadow-xl border border-[var(--border)] flex items-center gap-3 ${isRtl ? "rotate-[-15deg]" : "rotate-[15deg]"} group-hover:rotate-0 duration-500`}
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <ArrowRight
                      size={20}
                      className={`${isRtl ? "rotate-[135deg]" : "-rotate-45"}`}
                    />
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase">
                      {t("incoming")}
                    </div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">
                      $2,500.00
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative lines */}
            <div className="mt-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[var(--background-secondary)] flex-shrink-0" />
                  <div className="h-2 flex-grow bg-[var(--background-secondary)] rounded" />
                  <div className="h-2 w-16 bg-[var(--background-secondary)] rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Glow effect behind visual */}
          <div className="absolute -inset-4 bg-[var(--primary)]/5 rounded-[50px] -z-10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
