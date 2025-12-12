"use client";

import { useState, useEffect } from "react";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { languages } from "@/locales";
import { motion, AnimatePresence } from "motion/react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Languages className="h-4 w-4" />
      </Button>
    );
  }

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="relative group"
            aria-label="Switch language"
          >
            <motion.div
              animate={{
                rotate: isOpen ? [0, -10, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <Languages className="h-4 w-4 group-hover:text-primary transition-colors duration-300" />
            </motion.div>
            
            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-md bg-primary/10"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="sr-only">Switch language</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[150px] overflow-hidden"
      >
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DropdownMenuItem
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="cursor-pointer flex items-center gap-2 relative group/item"
            >
              {/* Flag with bounce animation */}
              <motion.span
                className="text-lg inline-block"
                whileHover={{ 
                  scale: 1.3, 
                  rotate: [0, -10, 10, -10, 0],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 400,
                }}
              >
                {lang.flag}
              </motion.span>
              
              <motion.span 
                className="flex-1 group-hover/item:text-primary transition-colors duration-200"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                {lang.name}
              </motion.span>
              
              {/* Active indicator with smooth animation */}
              {language === lang.code && (
                <motion.div
                  layoutId="activeLanguage"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              )}
              
              {/* Hover background effect */}
              <motion.div
                className="absolute inset-0 bg-primary/5 rounded-md -z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </DropdownMenuItem>
          </motion.div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

