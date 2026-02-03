"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Target, Zap, CheckCircle2, Award, Rocket, Sparkles } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

const About = () => {
    const t = useTranslations('About');
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const cards = [
        {
            title: t('cards.vision.title'),
            description: t('cards.vision.description'),
            icon: <Target className="w-8 h-8 text-white" />,
            delay: 0.1,
            color: "from-purple-500 to-indigo-600"
        },
        {
            title: t('cards.mission.title'),
            description: t('cards.mission.description'),
            icon: <Zap className="w-8 h-8 text-white" />,
            delay: 0.2,
            color: "from-pink-500 to-rose-600"
        },
        {
            title: t('cards.value.title'),
            description: t('cards.value.description'),
            icon: <Shield className="w-8 h-8 text-white" />,
            delay: 0.3,
            color: "from-blue-500 to-cyan-600"
        },
    ];

    return (
        <section id="about" ref={containerRef} className="relative py-32 bg-white overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-20 left-[-10%] w-[40%] aspect-square bg-primary/5 rounded-full blur-[120px] -z-10"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-20 right-[-10%] w-[40%] aspect-square bg-blue-500/5 rounded-full blur-[120px] -z-10"
            />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold mb-6 border border-primary/10"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        <span>{t('why_choose')}</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight"
                    >
                        {t('title')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">{t('title_highlight')}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 leading-relaxed font-medium"
                    >
                        {t('description')}
                    </motion.p>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: card.delay, duration: 0.7, ease: [0.21, 0.45, 0.32, 0.9] }}
                            whileHover={{ y: -12 }}
                            className="relative group h-full"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-[32px] blur opacity-0 group-hover:opacity-100 transition duration-500" />

                            <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(156,76,157,0.12)] flex flex-col items-start overflow-hidden">
                                {/* Decorative circle in background of card */}
                                <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${card.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} shadow-lg shadow-primary/20 flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">{card.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">{card.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Impact Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Shimmering Impact Box */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-blue-400/20 rounded-[50px] blur-2xl -z-10" />

                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[40px] p-12 aspect-[4/3] flex flex-col justify-between relative overflow-hidden group">
                            {/* Abstract moving pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex justify-between items-start">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex flex-col items-center justify-center shadow-2xl transition-transform"
                                >
                                    <span className="text-white font-black text-3xl">5+</span>
                                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Experience</span>
                                </motion.div>

                                <div className="text-right">
                                    <div className="text-5xl font-black text-white/5 opacity-50 tracking-tighter leading-none mb-2">SINCE</div>
                                    <div className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-white/20 leading-none">2019</div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3 mb-4"
                                >
                                    <Award className="text-primary w-6 h-6" />
                                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Certified Innovation</span>
                                </motion.div>
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:translate-x-2 transition-transform duration-500">
                                    {t('decade_innovation')}
                                </h3>
                                <p className="text-white/60 text-lg max-w-sm leading-relaxed">
                                    {t('decade_description')}
                                </p>
                            </div>

                            {/* Corner light effect */}
                            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-primary/30 rounded-full blur-[80px]" />
                        </div>
                    </motion.div>

                    <div className="lg:pl-8 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                {t('why_choose_description')}
                            </h3>
                            <div className="h-1.5 w-20 bg-primary rounded-full" />
                        </motion.div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { text: t('feature1'), icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
                                { text: t('feature2'), icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
                                { text: t('feature3'), icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
                                { text: t('feature4'), icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> }
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="mt-1 group-hover:scale-125 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <span className="text-gray-700 font-bold leading-snug">{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pt-6"
                        >
                            <button className="flex items-center gap-3 text-primary font-black uppercase tracking-widest hover:gap-5 transition-all group">
                                <span>Discover our journey</span>
                                <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

