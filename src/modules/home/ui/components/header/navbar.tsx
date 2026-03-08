"use client";

import Logo from "./logo";
import FlipLink from "@/components/flip-link";
import { ThemeSwitch } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";

const Navbar = () => {
  const { t, language } = useLanguage();
  const isIndonesian = language === "id";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/90 border-b-4 border-primary/30 shadow-lg">
      <div className="flex items-center gap-8 pb-5 px-6 lg:px-8 relative">
        {/* Accent line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary w-full" />
        
        <Logo />
        <div className="hidden lg:flex gap-6">
          <FlipLink href="/" className={isIndonesian ? "text-xs font-black uppercase tracking-wider" : "text-sm font-black uppercase tracking-wider"}>
            {t.nav.home}
          </FlipLink>
          <FlipLink href="/about" className={isIndonesian ? "text-xs font-black uppercase tracking-wider" : "text-sm font-black uppercase tracking-wider"}>
            {t.nav.about}
          </FlipLink>
          <FlipLink href="/projects" className={isIndonesian ? "text-xs font-black uppercase tracking-wider" : "text-sm font-black uppercase tracking-wider"}>
            {t.nav.projects}
          </FlipLink>
          <FlipLink href="/skills" className={isIndonesian ? "text-xs font-black uppercase tracking-wider" : "text-sm font-black uppercase tracking-wider"}>
            {t.nav.skills}
          </FlipLink>
          <FlipLink href="/contact" className={isIndonesian ? "text-xs font-black uppercase tracking-wider" : "text-sm font-black uppercase tracking-wider"}>
            {t.nav.contact}
          </FlipLink>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <LanguageSwitcher />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
