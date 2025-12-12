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
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8 items-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Avatar className="size-32 md:size-40 ring-4 ring-border/50 hover:ring-primary/50 transition-all duration-300">
              <AvatarImage src={config.developer.avatar} alt="Avatar" />
              <AvatarFallback className="text-4xl">
                {config.developer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-2"
            >
              {config.developer.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-muted-foreground mb-4"
            >
              {config.developer.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-muted-foreground leading-relaxed"
            >
              {config.developer.bio}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-card border border-border/50 hover:border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">
            <AnimatedText>{t.about.aboutMe}</AnimatedText>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <AnimatedText>{t.about.description1}</AnimatedText>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <AnimatedText delay={0.1}>{t.about.description2}</AnimatedText>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
