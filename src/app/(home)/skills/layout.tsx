import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "A comprehensive showcase of my technical skills, tools, and technologies.",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
