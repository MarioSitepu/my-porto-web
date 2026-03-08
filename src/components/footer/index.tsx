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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center lg:items-start p-12 lg:p-16 pb-12 gap-10 lg:gap-20 rounded-3xl font-light relative flex-1 bg-primary text-white dark:text-black border-4 border-primary/80 hover:border-primary shadow-[0_20px_60px_rgba(255,107,107,0.3)] hover:shadow-[0_30px_80px_rgba(255,107,107,0.4)] transition-all duration-700 overflow-hidden floating-card"
    >
      {/* Bold geometric pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-tr-full blur-3xl" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_50%)]" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-center relative z-10">
        {/* AVATAR  */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 12 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-white/30 blur-2xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
          <Avatar className="size-24 lg:size-28 ring-4 ring-white/40 hover:ring-white hover:ring-6 transition-all duration-700 relative z-10 shadow-2xl border-4 border-white/20">
            <AvatarImage src={config.developer.avatar} alt="avatar" sizes="112px" />
            <AvatarFallback className="bg-white/20 text-white font-black text-3xl border-4 border-white/20">MS</AvatarFallback>
          </Avatar>
        </motion.div>

        {/* NAME  */}
        <div className="flex flex-col items-center lg:items-start gap-2">
          <h1 className="text-4xl lg:text-5xl font-black drop-shadow-2xl uppercase tracking-tight">
            <AnimatedText>{config.developer.name}</AnimatedText>
          </h1>
          <p className="text-lg opacity-95 font-bold uppercase tracking-wider">
            <AnimatedText delay={0.05}>{config.developer.title}</AnimatedText>
          </p>
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
