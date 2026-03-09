import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const translations: Record<string, { titleEn: string, descriptionEn: string }> = {
    "Website KM ITERA": {
        titleEn: "KM ITERA Website",
        descriptionEn: "Contributed as a UI/UX Designer by designing wireframes in Figma, rendering responsive interfaces, and optimizing user flows."
    },
    "TEGASU \u2014 Web IoT Monitoring pH & Ketinggian Air": {
        titleEn: "TEGASU \u2014 Web IoT Monitoring pH & Water Level",
        descriptionEn: "A web-based IoT monitoring system for real-time tracking of agricultural land and fish pond conditions. Built using Next.js, connecting to ESP32 devices via HTTP polling."
    },
    "Aplikasi Reservasi Online Lapangan Futsal": {
        titleEn: "Futsal Court Online Reservation App",
        descriptionEn: "A Flutter-based mobile application to easily book futsal courts online."
    }
};

async function main() {
    const projects = await prisma.project.findMany();
    let updatedCount = 0;

    for (const project of projects) {
        if (translations[project.title]) {
            const { titleEn, descriptionEn } = translations[project.title];
            await prisma.project.update({
                where: { id: project.id },
                data: { titleEn, descriptionEn }
            });
            updatedCount++;
            console.log(`Updated project: ${project.title}`);
        }
    }

    console.log(`Successfully updated ${updatedCount} newer projects.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
