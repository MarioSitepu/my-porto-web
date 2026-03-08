"use client";

import { config } from "@/config";
import ContactCard from "@/components/contact-card";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FaMapPin } from "react-icons/fa";
import { PiInstagramLogo } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-6 py-24 relative">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            <AnimatedText>{t.contact.title}</AnimatedText>
          </h1>
          <p className="text-muted-foreground mb-16 text-xl">
            <AnimatedText delay={0.05}>{t.contact.subtitle}</AnimatedText>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <ContactCard
            title="GitHub"
            href={`https://github.com/${config.social.github}`}
            icon={<FaGithub className="w-5 h-5" />}
          />

          <ContactCard
            title="Email"
            href={`mailto:${config.social.email}`}
            icon={<HiMail className="w-5 h-5" />}
          />

          <motion.div
            whileHover={{ scale: 1.05, y: -6 }}
            className="p-6 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border/60 hover:border-primary/50 rounded-2xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaMapPin className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold">
                <AnimatedText>{t.about.location}</AnimatedText>
              </h3>
            </div>
            <p className="text-muted-foreground font-medium">{config.social.location}</p>
          </motion.div>

          <ContactCard
            title="Contact me"
            href={`https://instagram.com/${config.social.instagram}`}
            icon={<PiInstagramLogo className="w-5 h-5" />}
            className="bg-gradient-to-br from-primary to-accent text-white dark:text-black hover:from-primary/90 hover:to-accent/90 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border/60 hover:border-primary/50 rounded-2xl p-10 text-center hover:shadow-2xl transition-all duration-500 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            <AnimatedText>{t.contact.letsWorkTogether}</AnimatedText>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
            <AnimatedText delay={0.05}>{t.contact.letsWorkDescription}</AnimatedText>
          </p>
          <motion.a
            href={`mailto:${config.social.email}?subject=Contact%20from%20Portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-white dark:text-black hover:from-primary/90 hover:to-accent/90 transition-all duration-500 shadow-2xl hover:shadow-primary/20 text-lg px-8 py-6"
            >
              <HiMail className="w-6 h-6 mr-3" />
              <AnimatedText>{t.contact.contactMeButton}</AnimatedText>
            </Button>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;

