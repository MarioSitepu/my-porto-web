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

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    template: "%s - Developer Portfolio",
    default: "Mario - Full Stack Developer",
  },
  description: "Full-stack developer creating digital experiences that respect humans and scale with clarity.",
  keywords: ["Full Stack Developer", "Frontend Developer", "Backend Developer", "React", "Next.js", "Portfolio", "Mario", "Mario Sitepu", "Mario Fransiskus Sitepu", "Web Developer"],
  authors: [{ name: "Mario" }],
  creator: "Mario",
  openGraph: {
    title: "Mario - Full Stack Developer",
    description: "Full-stack developer creating digital experiences that respect humans and scale with clarity.",
    url: appUrl,
    siteName: "Mario Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mario - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario - Full Stack Developer",
    description: "Full-stack developer creating digital experiences that respect humans and scale with clarity.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: appUrl,
  },
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
