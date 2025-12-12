"use client";

// External dependencies
import Link from "next/link";

// Internal dependencies - UI Components
import ContactCard from "../../../../components/contact-card";
import { PiArrowUpRight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { config } from "@/config";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useLanguage } from "@/contexts/language-context";

const ProfileCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 items-stretch">
      <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
        <Link
          href="/about"
          className="flex flex-col justify-between gap-6 p-6 lg:p-10 xl:gap-0 bg-card border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)] rounded-xl font-light relative group h-full overflow-hidden"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="flex gap-4 items-center relative z-10">
            {/* AVATAR with hover effect */}
            <div className="relative">
              <Avatar className="size-[60px] ring-2 ring-border/50 group-hover:ring-primary/50 transition-all duration-300">
                <AvatarImage src={config.developer.avatar} alt="Avatar" />
                <AvatarFallback>{config.developer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* NAME  */}
            <div className="flex flex-col gap-[2px]">
              <h1 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">{config.developer.name}</h1>
              <p className="text-sm text-muted-foreground">{config.developer.title}</p>
            </div>
          </div>

          <div className="lg:mt-4 xl:mt-0 relative z-10">
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              {config.developer.bio}
            </p>
          </div>

          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:top-4 group-hover:right-4 transition-all duration-300 ease-in-out z-10">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <PiArrowUpRight size={18} className="text-primary" />
            </div>
          </div>
        </Link>
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col justify-between gap-3">
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

        <ContactCard
          title="Contact me"
          href={`mailto:${config.social.email}`}
          className="bg-primary text-white dark:text-black hover:bg-primary"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
