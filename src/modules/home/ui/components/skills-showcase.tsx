"use client";

import { motion } from "motion/react";
import { config } from "@/config";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";
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
  const skills = config.skills;
  const { t } = useLanguage();

  return (
    <div className="p-5 lg:p-6 bg-muted rounded-xl">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-lg lg:text-xl font-semibold mb-5 lg:mb-6 text-foreground"
        key={t.home.skillsTitle}
      >
        <AnimatedText>{t.home.skillsTitle}</AnimatedText>
      </motion.h3>
      
      {/* Enhanced Skills Cards Grid with better animations */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {skills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon.toLowerCase()] || SiReact;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)] cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon Container with enhanced styling */}
              <div className="relative aspect-square flex items-center justify-center p-6 lg:p-8">
                <motion.div
                  className="relative z-10 w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-full h-full text-foreground/80 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                </motion.div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full blur-xl transition-all duration-300" />
              </div>

              {/* Skill Name with smooth reveal */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 z-10 bg-gradient-to-t from-card via-card/95 to-transparent">
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="text-xs lg:text-sm font-semibold text-center text-foreground/60 group-hover:text-primary transition-all duration-300"
                >
                  {skill.name}
                </motion.h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

