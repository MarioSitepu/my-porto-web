"use client";

import ProfileCard from "@/modules/home/ui/components/profile-card";
import { SkillsShowcase } from "@/modules/home/ui/components/skills-showcase";
import { SliderView } from "@/modules/home/ui/views/slider-view";
import Footer from "@/components/footer";
import { motion } from "motion/react";

const page = () => {
  return (
    <div className="w-full relative">
      {/* Animated background with geometric shapes */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent via-50% to-accent/8 opacity-60" />
        <div className="geometric-shape shape-circle w-96 h-96 top-10 -right-20 bg-primary" />
        <div className="geometric-shape shape-circle w-80 h-80 bottom-20 -left-16 bg-accent" />
        <div className="geometric-shape shape-triangle top-1/2 right-1/4 opacity-5" />
      </div>
      
      {/* Flex Layout for better sticky support */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 items-start">
        {/* LEFT COLUMN - Project Slider - Sticky */}
        <div className="w-full lg:w-[41.666%] shrink-0">
          <div 
            className="h-[60vh] lg:h-[calc(100vh-6rem)] w-full"
            style={{ 
              position: 'sticky',
              top: '1.5rem',
              alignSelf: 'flex-start'
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <div className="h-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-2 border-border/60 bg-card/80 backdrop-blur-xl floating-card">
                <SliderView />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* RIGHT COLUMN - Content */}
        <div className="w-full lg:w-[58.334%] shrink-0 space-y-4 lg:space-y-6">
          {/* PROFILE CARD - Full width with diagonal accent */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-2 -right-2 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <ProfileCard />
          </motion.div>

          {/* SKILLS SHOWCASE - With offset */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <SkillsShowcase />
          </motion.div>

          {/* FOOTER - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Footer />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
