"use client";

import { motion, AnimatePresence } from "motion/react";
import { ReactNode } from "react";
import { useLanguage } from "@/contexts/language-context";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, className, delay = 0 }: AnimatedTextProps) {
  const { language } = useLanguage();
  
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${language}-${String(children)}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.3,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

