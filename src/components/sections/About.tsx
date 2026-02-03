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

                {/* Bottom Impact Section - Redesigned for Simplicity & Shine */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        {/* Premium Glass Card */}
                        <div className="relative overflow-hidden rounded-[40px] bg-white border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-12">
                            {/* Animated Shine Effect */}
                            <motion.div
                                animate={{
                                    x: ["-100%", "200%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 2
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none z-10"
                            />

                            <div className="relative z-20">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Award size={24} />
                                    </div>
                                    <span className="text-sm font-black tracking-[0.2em] uppercase text-primary/60">{t('why_choose')}</span>
                                </div>

                                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                                    {t('decade_innovation')}
                                </h3>

                                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                                    {t('decade_description')}
                                </p>

                                <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-gray-50">
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl font-black text-primary">5+</span>
                                        <div className="leading-tight">
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Years of</div>
                                            <div className="text-sm font-black text-gray-900">Experience</div>
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-100 hidden sm:block" />
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl font-black text-gray-900">2019</span>
                                        <div className="leading-tight">
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Founded</div>
                                            <div className="text-sm font-black text-gray-900">In Saudi</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle Background Glow */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
                        </div>
                    </motion.div>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 leading-snug">
                                {t('why_choose_description')}
                            </h3>
                            <div className="h-1.5 w-12 bg-primary rounded-full" />
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { text: t('feature1'), delay: 0 },
                                { text: t('feature2'), delay: 0.1 },
                                { text: t('feature3'), delay: 0.2 },
                                { text: t('feature4'), delay: 0.3 }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: item.delay }}
                                    className="p-6 rounded-2xl bg-gray-50/50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-green-500 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-gray-900 font-bold text-sm tracking-tight">{item.text}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pt-4"
                        >
                            <button className="h-14 px-8 bg-gray-900 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 group">
                                <span>Discover our journey</span>
                                <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

