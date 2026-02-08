"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';

const Projects = () => {
    const t = useTranslations('Projects');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const projects = [
        {
            title: t('items.neobank.title'),
            category: t('items.neobank.category'),
            summary: t('items.neobank.summary'),
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
            delay: 0.1,
        },
        {
            title: t('items.crypto.title'),
            category: t('items.crypto.category'),
            summary: t('items.crypto.summary'),
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
            delay: 0.2,
        },
        {
            title: t('items.investment.title'),
            category: t('items.investment.category'),
            summary: t('items.investment.summary'),
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
            delay: 0.3,
        },
    ];

    return (
        <section id="projects" className="py-24 bg-[var(--background-secondary)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6"
                    >
                        {t('title')} <span className="text-[var(--primary)]">{t('title_highlight')}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-[var(--text-muted)]"
                    >
                        {t('description')}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: project.delay }}
                            className="group relative overflow-hidden rounded-[32px] aspect-[4/5]"
                        >
                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Background Image */}
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Content */}
                            <div className={`absolute inset-x-0 bottom-0 p-10 z-20 transform transition-transform duration-500 group-hover:translate-y-[-10px] ${isRtl ? 'text-right' : 'text-left'}`}>
                                <div className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/20 backdrop-blur-md text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--primary)]/30">
                                    {project.category}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{project.title}</h3>
                                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                    {project.summary}
                                </p>
                                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm group/btn">
                                    <span>{t('view_project')}</span>
                                    <div className="w-8 h-8 rounded-full bg-[var(--text-primary)]/10 flex items-center justify-center group-hover/btn:bg-[var(--primary)] transition-colors">
                                        <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Grid Line */}
                <div className="mt-24 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-dark)] to-transparent opacity-50" />
            </div>
        </section>
    );
};

export default Projects;
