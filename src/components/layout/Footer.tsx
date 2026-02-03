"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';

const Footer = () => {
    const t = useTranslations('Footer');
    const common = useTranslations('Common');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    return (
        <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="relative h-12 w-48 flex items-center">
                            <Image
                                src="/logo-w.png"
                                alt={common('logo')}
                                fill
                                className="object-contain brightness-0"
                            />
                        </Link>
                        <p className="text-gray-500 leading-relaxed max-w-xs transition-colors">
                            {t('description')}
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-8">{t('product')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: t('links.banking'), href: "#" },
                                { name: t('links.payments'), href: "#" },
                                { name: t('links.security'), href: "#" },
                                { name: t('links.api'), href: "#" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-8">{t('company')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: t('links.about'), href: "#about" },
                                { name: t('links.careers'), href: "#" },
                                { name: t('links.press'), href: "#" },
                                { name: t('links.contact'), href: "#contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-8">{t('newsletter')}</h4>
                        <p className="text-gray-500 mb-6 font-medium">{t('newsletter_sub')}</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder={t('placeholder')}
                                className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                            <button className={`absolute ${isRtl ? 'left-2' : 'right-2'} top-2 bottom-2 px-6 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-bold`}>
                                {t('subscribe')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm font-medium">
                        © 2026 {common('logo')}. {t('rights')}
                    </p>
                    <div className="flex items-center gap-8 text-sm text-gray-500 font-medium">
                        <Link href="#" className="hover:text-primary transition-colors">{t('privacy')}</Link>
                        <Link href="#" className="hover:text-primary transition-colors">{t('terms')}</Link>
                        <Link href="#" className="hover:text-primary transition-colors">{t('cookies')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
