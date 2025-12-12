"use client";

import Carousel from "@/components/photo-carousel";
import BlurImage from "@/components/blur-image";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config";
import Image from "next/image";
import { motion } from "motion/react";

export const SliderView = () => {
  const projects = config.projects;

  if (projects.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-xl">
        <p className="text-gray-500">No projects to display</p>
      </div>
    );
  }

  return (
    <Carousel
      className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden"
      containerClassName="h-full"
      autoplayDelay={5000}
    >
      {projects.map((project, index) => {
        const shouldPreload = index < 1;

        return (
          <div key={project.id} className="flex-[0_0_100%] h-full relative group">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="75vw"
                priority={shouldPreload}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-[6000ms] ease-out"
              />
            </motion.div>
            
            {/* Enhanced gradient overlay with better depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-60% to-black/20 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent rounded-xl" />
            
            {/* Content with smooth animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white z-10"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-white transition-colors"
              >
                {project.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm lg:text-base text-white/90 line-clamp-2 leading-relaxed"
              >
                {project.description}
              </motion.p>
            </motion.div>
          </div>
        );
      })}
    </Carousel>
  );
};

export const SliderViewLoadingStatus = () => {
  return (
    <div className="w-full lg:w-1/2 h-[70vh] lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3 rounded-xl">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
