"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { ThemeToggle } from "../ui/ThemeToggle";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const common = useTranslations("Common");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: t("projects"), href: "#projects" },
    { name: t("partners"), href: "#partners" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--border)] py-3"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="relative h-15 w-32 md:w-40 flex items-center">
          <Image
            src="/logo-w.png"
            alt={common("logo")}
            fill
            className="object-contain brightness-0 dark:brightness-100 invert dark:invert-0 transition-all duration-300 hover:opacity-80"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle size="sm" variant="icon" />
            <Link
              href="#contact"
              className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary-glow)]"
            >
              {t("getStarted")}
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle size="sm" variant="icon" />
          <LanguageSwitcher />
          <button
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] p-6 flex flex-col space-y-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-xl font-medium text-center hover:opacity-90 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("getStarted")}
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
