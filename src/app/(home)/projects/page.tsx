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
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText>{t.projects.title}</AnimatedText>
          </h1>
          <p className="text-muted-foreground mb-12 text-lg">
            <AnimatedText delay={0.05}>{t.projects.subtitle}</AnimatedText>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container with glassmorphism overlay */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Action buttons on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {project.github !== "#" && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.demo !== "#" && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Enhanced tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                      className="text-xs px-2.5 py-1 bg-muted border border-border/50 rounded-md text-foreground/70 group-hover:border-border group-hover:text-foreground transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2.5 py-1 bg-muted border border-border/50 rounded-md text-foreground/70">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links with better styling */}
                <div className="flex gap-4 pt-2 border-t border-border/50">
                  {project.github !== "#" && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group/link"
                    >
                      <FaGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                      <AnimatedText>
                        <span>{t.projects.code}</span>
                      </AnimatedText>
                    </Link>
                  )}
                  {project.demo !== "#" && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group/link"
                    >
                      <FaExternalLinkAlt className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
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

