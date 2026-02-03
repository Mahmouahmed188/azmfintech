"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    Smartphone,
    BarChart3,
    Globe2,
    ShieldCheck,
    Cpu
} from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

const Services = () => {
    const t = useTranslations('Services');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const services = [
        {
            title: t('items.wallets.title'),
            description: t('items.wallets.description'),
            icon: <CreditCard className="w-8 h-8" />,
            delay: 0.1,
        },
        {
            title: t('items.mobile.title'),
            description: t('items.mobile.description'),
            icon: <Smartphone className="w-8 h-8" />,
            delay: 0.2,
        },
        {
            title: t('items.analytics.title'),
            description: t('items.analytics.description'),
            icon: <BarChart3 className="w-8 h-8" />,
            delay: 0.3,
        },
        {
            title: t('items.payments.title'),
            description: t('items.payments.description'),
            icon: <Globe2 className="w-8 h-8" />,
            delay: 0.4,
        },
        {
            title: t('items.compliance.title'),
            description: t('items.compliance.description'),
            icon: <ShieldCheck className="w-8 h-8" />,
            delay: 0.5,
        },
        {
            title: t('items.api.title'),
            description: t('items.api.description'),
            icon: <Cpu className="w-8 h-8" />,
            delay: 0.6,
        },
    ];

    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                        >
                            {t('title')} <span className="text-primary italic">{t('title_highlight')}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600"
                        >
                            {t('description')}
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 group">
                            <span>{t('cta_all')}</span>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </button>
                    </motion.div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay }}
                            className="relative p-10 rounded-3xl border border-gray-100 bg-white group hover:border-primary/20 transition-all duration-300 overflow-hidden"
                        >
                            {/* Hover Background Glow */}
                            <div className={`absolute top-0 ${isRtl ? 'left-0 -ml-16' : 'right-0 -mr-16'} -mt-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500`} />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-10 text-gray-600 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                                    {service.description}
                                </p>
                                <div className="pt-4 border-t border-gray-50 flex items-center text-primary font-bold text-sm tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 gap-2">
                                    {t('read_more')}
                                    <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
