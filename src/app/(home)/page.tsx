"use client";

import ProfileCard from "@/modules/home/ui/components/profile-card";
import { SkillsShowcase } from "@/modules/home/ui/components/skills-showcase";
import { SliderView } from "@/modules/home/ui/views/slider-view";
import Footer from "@/components/footer";
import { motion } from "motion/react";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* LEFT CONTENT - Fixed - Project Slider */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-1/2 h-[70vh] lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3 rounded-xl"
      >
        <SliderView />
      </motion.div>
      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />
      {/* RIGHT CONTENT - Scrollable */}
      <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3">
        {/* PROFILE CARD  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ProfileCard />
        </motion.div>

        {/* SKILLS SHOWCASE  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SkillsShowcase />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default page;
