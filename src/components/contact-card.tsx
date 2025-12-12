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
  "Contact me": <MdEmail size={18} />,
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
    if (title === "Contact me") return t.contact.contactMe;
    return title;
  };

  return (
    <Link
      href={href || " "}
      target="_blank"
      className={cn(
        "w-full h-full p-3 lg:p-5 bg-card border border-border/50 hover:border-border hover:shadow-md rounded-xl flex justify-between items-center cursor-pointer group transition-all duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)] hover:bg-muted/50",
        className
      )}
    >
      <p className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
        <AnimatedText>{getTranslatedTitle()}</AnimatedText>
      </p>

      <div className="relative inline-block overflow-hidden size-[18px]">
        <div className="relative inline-block group font-light text-sm h-full w-full">
          {/* Default Icon (visible initially, moves down on hover) */}
          <span className="block transform transition-transform duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
            {defaultIcon}
          </span>

          {/* Hover Icon (hidden initially, moves up on hover) */}
          <span className="absolute inset-0 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 opacity-0">
            <PiArrowUpRight size={18} className="text-primary" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ContactCard;
