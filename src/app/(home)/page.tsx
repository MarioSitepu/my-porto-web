import { prisma } from "@/lib/prisma";
import { HomeClient } from "./home-client";

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return <HomeClient projects={projects} />;
}
