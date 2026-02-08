"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === 'ar' ? 'en' : 'ar';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] backdrop-blur-md border border-[var(--border)] shadow-lg transition-all text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--primary)]"
            aria-label="Toggle Language"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <Globe size={18} className="text-[var(--primary)] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="min-w-[4rem] text-center tracking-tight">
                {locale === 'ar' ? 'English' : 'العربية'}
            </span>
        </motion.button>
    );
}
