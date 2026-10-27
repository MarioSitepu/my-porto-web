import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const newProjects = [
  {
    githubId: 1285134918,
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
  console.log("Reading deployed backup (scripts/db-dump.json)...");
  const dump = JSON.parse(fs.readFileSync('scripts/db-dump.json', 'utf8'));
  console.log(`Found ${dump.length} deployed projects in backup.`);

  // Clear existing and replace with complete consolidated list
  await prisma.project.deleteMany({});
  console.log("Cleared temporary projects.");

  // Insert 4 new projects first
  for (const p of newProjects) {
    await prisma.project.create({
      data: {
        githubId: p.githubId,
        title: p.title,
        titleEn: p.titleEn,
        description: p.description,
        descriptionEn: p.descriptionEn,
        image: p.image,
        technologies: p.technologies,
        github: p.github,
        demo: p.demo,
        order: p.order,
        isPublished: true,
      }
    });
    console.log(`✅ Inserted new project: [${p.order}] ${p.title}`);
  }

  // Insert the 12 deployed projects
  let orderIndex = 4;
  for (const d of dump) {
    await prisma.project.create({
      data: {
        title: d.title,
        titleEn: d.titleEn || d.title,
        description: d.description,
        descriptionEn: d.descriptionEn || d.description,
        image: d.image,
        technologies: d.technologies,
        github: d.github || "",
        demo: d.demo || "",
        order: orderIndex++,
        isPublished: true,
      }
    });
    console.log(`✅ Restored deployed project: [${orderIndex - 1}] ${d.title}`);
  }

  const allInDB = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  console.log(`\n🎉 Total projects now in DB: ${allInDB.length}`);
  console.table(allInDB.map(x => ({
    order: x.order,
    title: x.title,
    github: x.github,
    demo: x.demo,
    image: x.image.slice(0, 45) + '...'
  })));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
