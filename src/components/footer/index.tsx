"use client";

import FooterNav from "./footer-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { config } from "@/config";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center lg:items-start p-16 pb-12 gap-8 lg:gap-16 rounded-xl font-light relative flex-1 bg-primary text-white dark:text-black border border-border/20 hover:border-border/40 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* AVATAR  */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Avatar className="size-[60px] ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300">
            <AvatarImage src={config.developer.avatar} alt="avatar" sizes="60px" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </motion.div>

        {/* NAME  */}
        <div className="flex flex-col items-center lg:items-start gap-[2px]">
          <h1 className="text-2xl font-semibold">Mario Sitepu</h1>
          <p className="text-sm opacity-70">Full Stack Developer</p>
        </div>
      </div>
      <div className="grid lg:w-full grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-14">
        <FooterNav
          title="Pages"
          links={[
            { title: t.nav.home, href: "/" },
            { title: t.nav.about, href: "/about" },
            { title: t.nav.projects, href: "/projects" },
            { title: t.nav.skills, href: "/skills" },
            { title: t.nav.contact, href: "/contact" },
          ]}
        />
      </div>

      {/* Attribution */}
      <div className="text-xs md:text-sm text-center md:text-left">
        <p>
          <AnimatedText>
            <span className="opacity-60">{t.footer.designBy} </span>
          </AnimatedText>
          <a
            href="https://templates.gola.io/template/hanssen"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-100 opacity-80 transition-opacity duration-300"
          >
            Pawel Gola
          </a>
          <AnimatedText delay={0.05}>
            <span className="opacity-60">. {t.footer.poweredBy} </span>
          </AnimatedText>
          <a
            href={`https://github.com/${config.social.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-100 opacity-80 transition-opacity duration-300"
          >
            Mario Sitepu
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Footer;
