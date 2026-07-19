import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Mario, a passionate Full Stack Developer creating digital experiences.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
