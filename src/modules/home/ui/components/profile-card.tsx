"use client";

// External dependencies
import Link from "next/link";

// Internal dependencies - UI Components
import ContactCard from "../../../../components/contact-card";
import { PiArrowUpRight, PiInstagramLogo } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { config } from "@/config";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useLanguage } from "@/contexts/language-context";

const ProfileCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
      <div className="col-span-1 md:col-span-2">
        <Link
          href="/about"
          className="flex flex-col justify-between gap-6 p-10 lg:p-14 bg-card border-4 border-primary/30 hover:border-primary/60 hover:shadow-[0_0_0_8px_rgba(255,107,107,0.1)] transition-all duration-700 ease-[cubic-bezier(0.22, 1, 0.36, 1)] rounded-3xl font-light relative group h-full overflow-hidden floating-card"
        >
          {/* Diagonal accent bar */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-tr-full" />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl" />
          </div>
          
          <div className="flex gap-6 items-center relative z-10">
            {/* AVATAR with bold styling */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
              <Avatar className="size-20 lg:size-24 ring-4 ring-primary/40 group-hover:ring-primary group-hover:ring-6 transition-all duration-700 relative z-10 shadow-2xl border-4 border-card">
                <AvatarImage src={config.developer.avatar} alt="Avatar" />
                <AvatarFallback className="bg-primary text-white font-black text-3xl border-4 border-card">{config.developer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* NAME with bold typography */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl lg:text-3xl font-black group-hover:text-primary transition-colors duration-700 tracking-tight">
                {config.developer.name}
              </h1>
              <p className="text-base font-bold text-muted-foreground group-hover:text-primary transition-colors duration-700 uppercase tracking-wider">
                {config.developer.title}
              </p>
            </div>
          </div>

          <div className="lg:mt-8 relative z-10">
            <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground transition-colors duration-700 font-medium">
              {config.developer.bio}
            </p>
          </div>

          <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 group-hover:top-6 group-hover:right-6 transition-all duration-700 ease-in-out z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-2xl border-4 border-card rotate-0 group-hover:rotate-12 transition-transform duration-700">
              <PiArrowUpRight size={24} className="text-white" />
            </div>
          </div>
        </Link>
      </div>

      <div className="col-span-1 md:col-span-1 flex flex-col justify-between gap-4">
        <ContactCard
          title="GitHub"
          href={`https://github.com/${config.social.github}`}
          icon={<FaGithub className="w-6 h-6" />}
        />

        <ContactCard
          title="Email"
          href={`mailto:${config.social.email}`}
          icon={<HiMail className="w-6 h-6" />}
        />

        <ContactCard
          title="Contact me"
          href={`https://instagram.com/${config.social.instagram}`}
          icon={<PiInstagramLogo size={24} />}
          className="bg-primary text-white dark:text-black hover:bg-primary/90 hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-primary/50 border-4 border-primary/50 hover:border-primary"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
