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

const SkillsPage = () => {
  const skills = config.skills;
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-6 py-24 relative">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            <AnimatedText>{t.skills.title}</AnimatedText>
          </h1>
          <p className="text-muted-foreground mb-16 text-xl">
            <AnimatedText delay={0.05}>{t.skills.subtitle}</AnimatedText>
          </p>
        </motion.div>

        {/* Enhanced Skills Grid with modern styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon.toLowerCase()] || SiReact;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, y: -12, rotate: 1 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border/60 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 cursor-pointer backdrop-blur-sm"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl" />
                </div>
                
                {/* Icon Container with enhanced styling */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted via-card to-primary/5 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative z-10"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  >
                    <IconComponent className="w-full h-full text-foreground/70 group-hover:text-primary group-hover:drop-shadow-lg transition-all duration-500" />
                  </motion.div>
                  
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-full blur-2xl transition-all duration-500" />
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Skill Name with enhanced styling */}
                <div className="p-5 bg-gradient-to-t from-card via-card/98 to-transparent backdrop-blur-sm">
                  <h3 className="text-base font-bold text-center group-hover:text-primary transition-colors duration-500">
                    <AnimatedText>{skill.name}</AnimatedText>
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;

