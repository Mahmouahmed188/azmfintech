"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

const CTA = () => {
    const t = useTranslations('CTA');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    return (
        <section id="contact" className="py-24 bg-white px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto rounded-[48px] bg-gradient-to-br from-primary via-primary to-[#8A3B8B] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-primary/30"
            >
                {/* Background Patterns */}
                <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} w-1/2 h-full opacity-10 pointer-events-none`}>
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <circle cx="200" cy="200" r="150" fill="none" stroke="white" strokeWidth="20" strokeDasharray="40 20" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-2xl text-white">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        {t('title_main')} <span className="underline decoration-white/30 italic">{t('title_highlight')}</span>
                    </h2>
                    <p className="text-white/80 text-lg mb-12 max-w-xl">
                        {t('description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-10 py-5 bg-white text-primary font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-xl flex items-center justify-center gap-2 group">
                            <span>{t('cta_beta')}</span>
                            <Send size={20} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                        </button>
                        <button className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                            {t('cta_advisor')}
                        </button>
                    </div>
                </div>

                {/* Floating Stat */}
                <div className={`absolute top-1/2 ${isRtl ? 'left-24' : 'right-24'} transform -translate-y-1/2 hidden xl:block`}>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-white">
                        <div className="text-5xl font-black mb-2 italic">{t('uptime_value')}</div>
                        <div className="text-white/60 font-medium tracking-wide uppercase">{t('uptime')}</div>
                        <div className="mt-8 flex items-center gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10" />
                            ))}
                            <span className="text-xs font-bold">{t('active_users')}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CTA;
