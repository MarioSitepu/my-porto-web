"use client";

import { motion } from "motion/react";
import { config } from "@/config";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";
import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiGit,
  SiAmazon,
  SiDocker,
  SiFramer,
  SiLaravel,
  SiSupabase,
  SiPython,
  SiFlutter,
  SiVuedotjs,
} from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  mongodb: SiMongodb,
  express: SiExpress,
  git: SiGit,
  aws: SiAmazon,
  docker: SiDocker,
  framer: SiFramer,
  laravel: SiLaravel,
  supabase: SiSupabase,
  pyramid: SiPython, // Using Python icon for Pyramid (Python web framework)
  reactnative: SiReact, // Using React icon for React Native
  flutter: SiFlutter,
  vue: SiVuedotjs,
};

export const SkillsShowcase = () => {
  const skills = config.skills.slice(0, 4); // Only show first 4 skills
  const { t } = useLanguage();

  return (
    <div className="p-8 lg:p-10 bg-card rounded-3xl border-4 border-border/40 hover:border-primary/50 hover:shadow-[0_0_0_8px_rgba(255,107,107,0.1)] transition-all duration-700 floating-card relative overflow-hidden">
      {/* Diagonal accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-tr-full" />
      
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl lg:text-3xl font-black mb-8 lg:mb-10 text-foreground uppercase tracking-tight relative z-10"
        key={t.home.skillsTitle}
      >
        <AnimatedText>{t.home.skillsTitle}</AnimatedText>
      </motion.h3>
      
      {/* Bold Skills Cards Grid - Only 4 skills */}
      <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10 mb-8">
        {skills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon.toLowerCase()] || SiReact;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.05,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.12, y: -16, rotate: 2 }}
              className="group relative overflow-hidden rounded-3xl bg-card border-4 border-border/40 hover:border-primary/60 hover:shadow-[0_0_0_6px_rgba(255,107,107,0.1)] transition-all duration-700 cursor-pointer floating-card"
            >
              {/* Diagonal accent corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/15 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Icon Container with bold styling */}
              <div className="relative aspect-square flex items-center justify-center p-10 lg:p-12">
                <motion.div
                  className="relative z-10 w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center"
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
                >
                  <IconComponent className="w-full h-full text-foreground/60 group-hover:text-primary transition-all duration-700 group-hover:drop-shadow-2xl" />
                </motion.div>
                
                {/* Bold glow effect */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 rounded-full blur-3xl transition-all duration-700" />
              </div>

              {/* Skill Name with bold styling */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7 z-10 bg-gradient-to-t from-card via-card/95 to-transparent">
                <motion.h4
                  initial={{ opacity: 0.8, y: 8 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="text-sm lg:text-base font-black text-center text-foreground/60 group-hover:text-primary transition-all duration-700 uppercase tracking-tight"
                >
                  {skill.name}
                </motion.h4>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* See More Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10"
      >
        <Link
          href="/skills"
          className="group flex items-center justify-center gap-3 w-full p-5 bg-card border-4 border-border/40 hover:border-primary/60 hover:shadow-[0_0_0_6px_rgba(255,107,107,0.1)] rounded-3xl transition-all duration-700 floating-card relative overflow-hidden"
        >
          {/* Diagonal accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/10 rounded-tr-full" />
          
          <span className="text-base lg:text-lg font-black text-foreground group-hover:text-primary transition-colors duration-700 uppercase tracking-tight relative z-10">
            <AnimatedText>{t.home.seeMore}</AnimatedText>
          </span>
          <motion.div
            className="relative z-10"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <PiArrowRight size={24} className="text-foreground group-hover:text-primary transition-colors duration-700" />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

