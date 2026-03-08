"use client";

import { config } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";

const ProjectsPage = () => {
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
            <AnimatedText>{t.projects.title}</AnimatedText>
          </h1>
          <p className="text-muted-foreground mb-16 text-xl">
            <AnimatedText delay={0.05}>{t.projects.subtitle}</AnimatedText>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border/60 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm"
            >
              {/* Image Container with enhanced effects */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                />
                {/* Enhanced gradient overlay with primary color */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-primary/30 via-50% to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Action buttons on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  {project.github !== "#" && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl"
                    >
                      <FaGithub className="w-6 h-6" />
                    </motion.a>
                  )}
                  {project.demo !== "#" && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl"
                    >
                      <FaExternalLinkAlt className="w-6 h-6" />
                    </motion.a>
                  )}
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-base text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Enhanced tech tags */}
                <div className="flex flex-wrap gap-2.5 mb-5">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                      className="text-xs px-3 py-1.5 bg-gradient-to-br from-muted to-primary/5 border border-border/60 hover:border-primary/50 rounded-lg text-foreground/70 group-hover:text-foreground group-hover:bg-primary/10 transition-all duration-500 font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-3 py-1.5 bg-gradient-to-br from-muted to-primary/5 border border-border/60 rounded-lg text-foreground/70 font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links with enhanced styling */}
                <div className="flex gap-5 pt-4 border-t-2 border-border/60">
                  {project.github !== "#" && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-500 group/link"
                    >
                      <FaGithub className="w-5 h-5 group-hover/link:scale-125 group-hover/link:rotate-12 transition-all duration-500" />
                      <AnimatedText>
                        <span>{t.projects.code}</span>
                      </AnimatedText>
                    </Link>
                  )}
                  {project.demo !== "#" && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-500 group/link"
                    >
                      <FaExternalLinkAlt className="w-5 h-5 group-hover/link:scale-125 group-hover/link:-rotate-12 transition-all duration-500" />
                      <AnimatedText>
                        <span>{t.projects.demo}</span>
                      </AnimatedText>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

