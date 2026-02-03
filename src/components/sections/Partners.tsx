"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const partners = [
    { name: "Goldman", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs_logo.svg" },
    { name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
    { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "Revolut", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Revolut_logo.svg" },
    { name: "Paypal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
];

const Partners = () => {
    const t = useTranslations('Partners');

    return (
        <section id="partners" className="py-24 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-12"
                >
                    {t('title')}
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-60">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            <div className="h-10 w-32 relative">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
