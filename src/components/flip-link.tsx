"use client";

import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/contexts/language-context";

const DURATION = 0.25;
const STAGGER = 0.025;

interface Props {
  children: string;
  href: string;
}

const FlipLink = ({ children, href }: Props) => {
  const { language } = useLanguage();
  // Use smaller font for Indonesian to fit in navbar
  const fontSize = language === "id" ? "text-xs" : "text-sm";
  
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={`relative block overflow-hidden whitespace-nowrap font-light ${fontSize}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={children}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div>
            {children.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: {
                    y: 0,
                  },
                  hovered: {
                    y: "-100%",
                  },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className="inline-block"
                key={i}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <div className="absolute inset-0">
            {children.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: {
                    y: "100%",
                  },
                  hovered: {
                    y: 0,
                  },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className="inline-block"
                key={i}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.a>
  );
};

export default FlipLink;
