import type { Metadata } from "next";
import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
// Vercel Analytics
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { Readex_Pro } from "next/font/google";

const readexPro = Readex_Pro({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Developer Portfolio",
    default: "Mario - Full Stack Developer",
  },
  description: "Full-stack developer creating digital experiences that respect humans and scale with clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${readexPro.className} antialiased`}>
        <NuqsAdapter>
          <LanguageProvider>
            <ThemeProvider attribute="class">
              <Toaster />
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </NuqsAdapter>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
