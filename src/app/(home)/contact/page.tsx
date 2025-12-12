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
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText>{t.contact.title}</AnimatedText>
          </h1>
          <p className="text-muted-foreground mb-12 text-lg">
            <AnimatedText delay={0.05}>{t.contact.subtitle}</AnimatedText>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <ContactCard
            title="GitHub"
            href={`https://github.com/${config.social.github}`}
            icon={<FaGithub className="w-4 h-4" />}
          />

          <ContactCard
            title="Email"
            href={`mailto:${config.social.email}`}
            icon={<HiMail className="w-4 h-4" />}
          />

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="p-6 bg-card border border-border/50 hover:border-border rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaMapPin className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">
                <AnimatedText>{t.about.location}</AnimatedText>
              </h3>
            </div>
            <p className="text-muted-foreground">{config.social.location}</p>
          </motion.div>

          <ContactCard
            title="Contact me"
            href={`https://instagram.com/${config.social.instagram}`}
            icon={<PiInstagramLogo className="w-4 h-4" />}
            className="bg-primary text-white dark:text-black hover:bg-primary/90 hover:scale-105 transition-all duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-card border border-border/50 hover:border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">
            <AnimatedText>{t.contact.letsWorkTogether}</AnimatedText>
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            <AnimatedText delay={0.05}>{t.contact.letsWorkDescription}</AnimatedText>
          </p>
          <motion.a
            href={`mailto:${config.social.email}?subject=Contact%20from%20Portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-primary text-white dark:text-black hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
              <HiMail className="w-5 h-5 mr-2" />
              <AnimatedText>{t.contact.contactMeButton}</AnimatedText>
            </Button>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;

