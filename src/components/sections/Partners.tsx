"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const partners = [
  {
    name: "Goldman",
    logo: "/monshaat-logo-Cyk4OG7W.png",
  },
  {
    name: "Visa",
    logo: "/najiz-logo-CGJPJOrb.png",
  },
  {
    name: "Mastercard",
    logo: "/monshaat-logo-Cyk4OG7W.png",
  },
  {
    name: "Stripe",
    logo: "/ministry-of-investment-logo-axMW4XEI.png",
  },
  {
    name: "Revolut",
    logo: "/gea-logo-B8L6gH5c.png",
  },
  {
    name: "Paypal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
];

const Partners = () => {
  const t = useTranslations("Partners");

  return (
    <section
      id="partners"
      className="py-24 bg-[var(--background)] border-b border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
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
