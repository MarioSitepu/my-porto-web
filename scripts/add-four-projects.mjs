import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const newProjects = [
  {
    githubId: 1285134918,
    repo: "MarioSitepu/Automated-Candidate-Extraction-Data",
    title: "Automated Candidate Data Extraction System (Karla Bionics)",
    titleEn: "Automated Candidate Data Extraction System (Karla Bionics)",
    description: "Sistem otomasi ekstraksi data dan asesmen klinis calon penerima tangan prostetik Karla Bionics berbasis AI (Deepgram Nova-3 STT & Groq LLaMA 3.3 70B).",
    descriptionEn: "Automated candidate clinical data extraction and assessment system for Karla Bionics prosthetic hand recipients powered by Deepgram STT and Groq LLaMA 3.3.",
    image: "/projects/karla-bionics.jpg",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Deepgram", "Groq"],
    github: "https://github.com/MarioSitepu/Automated-Candidate-Extraction-Data",
    demo: "https://automated-candidate-extraction-data-peach.vercel.app",
    order: 0,
    isPublished: true,
  },
  {
    githubId: 1348214837,
    repo: "MarioSitepu/web-kasir-admin",
    title: "Sapo Sapo – Web Admin Kasir & Monitoring POS",
    titleEn: "Sapo Sapo – Web Admin & POS Monitoring Dashboard",
    description: "Dashboard web admin modern untuk manajemen operasional kasir, inventaris menu, mutasi stok, dan pemantauan transaksi penjualan UMKM secara real-time.",
    descriptionEn: "Modern web admin dashboard for cashier operational management, menu inventory, stock mutation, and real-time sales transaction monitoring for MSMEs.",
    image: "/projects/web-kasir-admin.jpg",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore"],
    github: "https://github.com/MarioSitepu/web-kasir-admin",
    demo: "https://sapo-sapo.vercel.app",
    order: 1,
    isPublished: true,
  },
  {
    githubId: 1342892995,
    repo: "MarioSitepu/sistem-kasir",
    title: "Sapo Sapo – Aplikasi Kasir POS Tablet Android",
    titleEn: "Sapo Sapo – Android Tablet POS Cashier App",
    description: "Aplikasi Point of Sale (POS) berbasis Flutter untuk tablet Android dengan resiliensi LMK, integrasi printer thermal Bluetooth 58mm, cash drawer RJ11, dan sinkronisasi cloud.",
    descriptionEn: "Flutter-based Point of Sale (POS) application for Android tablets featuring Low Memory Killer resilience, 58mm Bluetooth thermal printer integration, RJ11 cash drawer, and cloud sync.",
    image: "/projects/sistem-kasir-pos.jpg",
    technologies: ["Flutter", "Dart", "Supabase", "Riverpod", "Hive", "Bluetooth ESC/POS"],
    github: "https://github.com/MarioSitepu/sistem-kasir",
    demo: "",
    order: 2,
    isPublished: true,
  },
  {
    githubId: 1212666391,
    repo: "kiaomi22/Healo",
    title: "Healo – AI Health Risk Prediction & Smart Lifestyle Assistant",
    titleEn: "Healo – AI Health Risk Prediction & Smart Lifestyle Assistant",
    description: "Platform web terintegrasi berbasis Deep Learning untuk memprediksi risiko kesehatan pekerja berdasarkan gaya hidup harian, dilengkapi gamifikasi streak & reward.",
    descriptionEn: "Integrated Deep Learning web platform for predicting worker health risk levels based on daily lifestyle factors, equipped with gamification streaks and rewards.",
    image: "/projects/healo-health.jpg",
    technologies: ["Next.js", "TypeScript", "Python", "TensorFlow", "Deep Learning", "Tailwind CSS"],
    github: "https://github.com/kiaomi22/Healo",
    demo: "https://healo-mocha.vercel.app",
    order: 3,
    isPublished: true,
  }
];

async function main() {
  console.log("Connecting to database...");

  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  // 1. Fetch README contents for each repo
  for (const item of newProjects) {
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${item.repo}/readme`, { headers });
      if (readmeRes.ok) {
        const readmeJson = await readmeRes.json();
        if (readmeJson.content && readmeJson.encoding === "base64") {
          item.content = Buffer.from(readmeJson.content, "base64").toString("utf-8");
        }
      }
    } catch (e) {
      console.warn(`Could not fetch README for ${item.repo}:`, e.message);
    }
  }

  // 2. Adjust existing projects order so they don't collide with 0, 1, 2, 3
  const targetGithubIds = newProjects.map(p => p.githubId);
  const existingProjects = await prisma.project.findMany({
    where: {
      OR: [
        { githubId: null },
        { githubId: { notIn: targetGithubIds } }
      ]
    },
    orderBy: { order: "asc" }
  });

  console.log(`Shifting ${existingProjects.length} existing projects order to make room at the top...`);
  for (let i = 0; i < existingProjects.length; i++) {
    await prisma.project.update({
      where: { id: existingProjects[i].id },
      data: { order: i + 4 }
    });
  }

  // 3. Upsert the 4 new projects
  for (const p of newProjects) {
    console.log(`Upserting: ${p.title} (${p.githubId})...`);
    await prisma.project.upsert({
      where: { githubId: p.githubId },
      update: {
        title: p.title,
        titleEn: p.titleEn,
        description: p.description,
        descriptionEn: p.descriptionEn,
        content: p.content || null,
        image: p.image,
        technologies: p.technologies,
        github: p.github,
        demo: p.demo,
        order: p.order,
        isPublished: true,
      },
      create: {
        githubId: p.githubId,
        title: p.title,
        titleEn: p.titleEn,
        description: p.description,
        descriptionEn: p.descriptionEn,
        content: p.content || null,
        image: p.image,
        technologies: p.technologies,
        github: p.github,
        demo: p.demo,
        order: p.order,
        isPublished: true,
      }
    });
  }

  console.log("✅ All 4 projects successfully upserted into the database!");

  const allProjects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    select: { id: true, githubId: true, title: true, order: true, image: true }
  });
  console.log("\nCurrent projects in database:");
  console.table(allProjects);
}

main()
  .catch(err => {
    console.error("❌ Error running script:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
