"use client";

import LinkRotate from "../link-rotate";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";

interface Props {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

const FooterNav = ({ title, links }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8 items-center lg:items-start">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-semibold"
      >
        <AnimatedText>{title === "Pages" ? t.home.footerTitle : title}</AnimatedText>
      </motion.h1>
      <ul className="flex flex-col items-center lg:items-start gap-3 lg:gap-5 text-sm opacity-70">
        {links.map((link, index) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <LinkRotate
              link={link.href}
              label={link.title}
              className="text-text-default dark:text-text-inverse hover:opacity-100 transition-opacity duration-300"
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNav;
