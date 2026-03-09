import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "../src/config";
import { experiences } from "../src/data/experience";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    // Clear existing data
    await prisma.user.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.experience.deleteMany({});

    // 1. Create Admin User
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.create({
        data: {
            username: "admin",
            password: adminPassword,
        },
    });
    console.log(`Created admin user with username: ${admin.username}`);

    // 2. Seed Projects from config.ts
    for (const [index, project] of config.projects.entries()) {
        await prisma.project.create({
            data: {
                title: project.title,
                description: project.description,
                image: project.image,
                technologies: project.technologies,
                github: project.github,
                demo: project.demo,
                order: index,
            },
        });
    }
    console.log(`Seeded ${config.projects.length} projects`);

    // 3. Seed Experiences from experience.ts
    for (const [index, exp] of experiences.entries()) {
        await prisma.experience.create({
            data: {
                title: exp.title,
                role: exp.role,
                date: exp.date,
                description: exp.description,
                technologies: exp.technologies,
                order: index,
            },
        });
    }
    console.log(`Seeded ${experiences.length} experiences`);

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
