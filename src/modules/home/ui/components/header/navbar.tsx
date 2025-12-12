"use client";

import Logo from "./logo";
import FlipLink from "@/components/flip-link";
import { ThemeSwitch } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav>
      <div className="flex items-center gap-5 pb-3 px-4 relative">
        <Logo />
        <div className="hidden lg:flex gap-4">
          <FlipLink href="/">{t.nav.home}</FlipLink>
          <FlipLink href="/about">{t.nav.about}</FlipLink>
          <FlipLink href="/projects">{t.nav.projects}</FlipLink>
          <FlipLink href="/skills">{t.nav.skills}</FlipLink>
          <FlipLink href="/contact">{t.nav.contact}</FlipLink>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
