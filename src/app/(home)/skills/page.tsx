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
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText>{t.skills.title}</AnimatedText>
          </h1>
          <p className="text-muted-foreground mb-12 text-lg">
            <AnimatedText delay={0.05}>{t.skills.subtitle}</AnimatedText>
          </p>
        </motion.div>

        {/* Enhanced Skills Grid with better styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon.toLowerCase()] || SiReact;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Icon Container with enhanced styling */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-card flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-full h-full text-foreground/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  </motion.div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full blur-xl transition-all duration-300" />
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Skill Name with better styling */}
                <div className="p-4 bg-card">
                  <h3 className="text-base font-semibold text-center group-hover:text-primary transition-colors duration-300">
                    {skill.name}
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

