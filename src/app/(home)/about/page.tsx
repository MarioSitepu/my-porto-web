"use client";

import { config } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FaMapPin } from "react-icons/fa";
import ContactCard from "@/components/contact-card";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";

const AboutPage = () => {
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
          className="flex flex-col md:flex-row gap-10 items-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-50" />
            <Avatar className="size-36 md:size-44 ring-4 ring-border/60 hover:ring-primary/60 hover:ring-6 transition-all duration-500 relative z-10 shadow-2xl">
              <AvatarImage src={config.developer.avatar} alt="Avatar" />
              <AvatarFallback className="text-5xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold">
                {config.developer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
            >
              {config.developer.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-muted-foreground mb-6 font-semibold"
            >
              {config.developer.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {config.developer.bio}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border/60 hover:border-primary/50 rounded-2xl p-10 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            <AnimatedText>{t.about.aboutMe}</AnimatedText>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
            <AnimatedText>{t.about.description1}</AnimatedText>
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            <AnimatedText delay={0.1}>{t.about.description2}</AnimatedText>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
