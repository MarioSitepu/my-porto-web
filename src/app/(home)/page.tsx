import { prisma } from "@/lib/prisma";
import { HomeClient } from "./home-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mario - Full Stack Developer",
  description: "Welcome to my digital portfolio. I'm a full-stack developer specializing in modern web technologies.",
};

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${appUrl}/#website`,
        url: appUrl,
        name: "Mario Portfolio",
        description: "Full-stack developer creating digital experiences that respect humans and scale with clarity.",
        publisher: {
          "@id": `${appUrl}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${appUrl}/#person`,
        name: "Mario",
        url: appUrl,
        image: `${appUrl}/og-image.jpg`,
        sameAs: [
          "https://github.com/mariositepu",
          "https://twitter.com/mariositepu",
          "https://linkedin.com/in/mariositepu",
        ],
        jobTitle: "Full Stack Developer",
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient projects={projects} />
    </>
  );
}
