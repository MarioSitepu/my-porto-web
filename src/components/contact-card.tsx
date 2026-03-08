"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import {
  PiArrowUpRight,
  PiInstagramLogo,
  PiGithubLogo,
  PiXLogo,
} from "react-icons/pi";
import { SiXiaohongshu } from "react-icons/si";
import { ReactNode } from "react";
import { useLanguage } from "@/contexts/language-context";
import { AnimatedText } from "@/components/animated-text";

// icon map
const iconMap: Record<string, ReactNode> = {
  Instagram: <PiInstagramLogo size={18} />,
  GitHub: <PiGithubLogo size={18} />,
  X: <PiXLogo size={18} />,
  Xiaohongshu: <SiXiaohongshu size={18} />,
  "Contact me": <PiInstagramLogo size={18} />, // Changed to Instagram icon
  Email: <MdEmail size={18} />,
};

interface Props {
  title: string;
  href?: string;
  className?: string;
  icon?: ReactNode;
}

const ContactCard = ({ title, href, className, icon }: Props) => {
  const { t } = useLanguage();
  const defaultIcon = icon || iconMap[title] || <PiArrowUpRight size={18} />;

  // Translate common titles
  const getTranslatedTitle = () => {
    if (title === "Email") return t.common.email;
    if (title === "GitHub") return t.common.github;
    if (title === "Instagram") return t.common.instagram;
    if (title === "Contact me") return t.contact.contactMe; // Keep as "Hubungi saya" but link to Instagram
    return title;
  };

  return (
    <Link
      href={href || " "}
      target="_blank"
      className={cn(
        "w-full h-full p-6 lg:p-8 bg-card border-4 border-border/40 hover:border-primary/60 hover:shadow-[0_0_0_6px_rgba(255,107,107,0.1)] rounded-3xl flex justify-between items-center cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.22, 1, 0.36, 1)] floating-card relative overflow-hidden",
        className
      )}
    >
      {/* Bold diagonal accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/10 rounded-tr-full" />

      <p className={cn(
        "text-base lg:text-lg font-black transition-colors duration-700 relative z-10 uppercase tracking-wide",
        title === "Contact me" ? "group-hover:text-foreground dark:group-hover:text-foreground" : "group-hover:text-primary"
      )}>
        <AnimatedText>{getTranslatedTitle()}</AnimatedText>
      </p>

      <div className="relative inline-block overflow-hidden size-8 lg:size-10 relative z-10">
        <div className="relative inline-block group font-light text-sm h-full w-full">
          {/* Default Icon */}
          <span className="block transform transition-all duration-700 ease-in-out group-hover:-translate-y-full group-hover:opacity-0 group-hover:rotate-45">
            {defaultIcon}
          </span>

          {/* Hover Icon */}
          <span className="absolute inset-0 transform translate-y-full transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 opacity-0 group-hover:rotate-0 flex items-center justify-center">
            <PiArrowUpRight size={28} className={title === "Contact me" ? "text-foreground dark:text-foreground" : "text-primary"} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ContactCard;
