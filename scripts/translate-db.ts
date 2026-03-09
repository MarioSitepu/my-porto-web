import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const translations: Record<string, { titleEn: string, descriptionEn: string }> = {
    "EduCorner: SahabatMimpi (KKN Project \u2013 Desa Margo Lestari)": {
        titleEn: "EduCorner: SahabatMimpi (Community Service Project \u2013 Margo Lestari Village)",
        descriptionEn: "An interactive education platform to help elementary to high school students discover their potential and future careers through an AI-powered MBTI quiz."
    },
    "IoT Smart Water Monitoring System (pH & Water Level)": {
        titleEn: "IoT Smart Water Monitoring System (pH & Water Level)",
        descriptionEn: "An end-to-end IoT system for real-time monitoring of water quality and level via a Web Dashboard and WhatsApp Bot."
    },
    "Annel Beauty Analytics Website": {
        titleEn: "Annel Beauty Analytics Website",
        descriptionEn: "A sales management and analytics system for a multi-store beauty business with smart product matching."
    },
    "Survey & Analytics System Untuk Wisudawan": {
        titleEn: "Survey & Analytics System for Graduates",
        descriptionEn: "A Dynamic Form Application serving as a form and survey management system for graduates, featuring an admin dashboard with visual analytics."
    },
    "Website HMIF ITERA": {
        titleEn: "ITERA Informatics Student Association Website (HMIF ITERA)",
        descriptionEn: "Conducted user research and designed responsive, consistent wireframes and prototypes, optimizing user flows."
    },
    "Madu Margolestari \u2013 UMKM ECommerce": {
        titleEn: "Madu Margolestari \u2013 MSME Honey E-Commerce Platform",
        descriptionEn: "A modern e-commerce platform for the digitalization of an MSME honey business, featuring a REST API and RBAC system."
    },
    "YangPentingMakan \u2013 Recipe Sharing": {
        titleEn: "YangPentingMakan \u2013 Recipe Sharing Web Platform",
        descriptionEn: "A practical recipe sharing platform aimed at university students featuring recipe uploads, ratings, and reviews."
    },
    "Website Desa Batang Hari": {
        titleEn: "Batang Hari Village Website",
        descriptionEn: "Designed and implemented CRUD operations for village data management, and managed hosting configurations via cPanel."
    },
    "Website KMK ITERA (UI/UX)": {
        titleEn: "KMK ITERA Website (UI/UX)",
        descriptionEn: "Designed UI/UX wireframes and prototypes for the ITERA Catholic Student Community application."
    },
    "Website KMK ITERA (Frontend)": {
        titleEn: "KMK ITERA Website (Frontend)",
        descriptionEn: "Developed a modern frontend and integrated a cloud-based admin system using Firebase for the ITERA Catholic Student Community."
    },
    "Sawit Harvester": {
        titleEn: "Sawit Harvester",
        descriptionEn: "A first-person stealth-action game about a Bengkulu teenager harvesting palm oil from a fictional plantation. The player must plan routes, harvest palm fruits, survive wild animals, and avoid the plantation guards."
    }
};

async function main() {
    const projects = await prisma.project.findMany();
    let updatedCount = 0;

    for (const project of projects) {
        let titleEn = project.titleEn || "";
        let descriptionEn = project.descriptionEn || "";

        // If it exists in our map, use it
        if (translations[project.title]) {
            if (!titleEn) titleEn = translations[project.title].titleEn;
            if (!descriptionEn) descriptionEn = translations[project.title].descriptionEn;
        } else {
            // Fallback
            if (!titleEn) titleEn = project.title;
            if (!descriptionEn) descriptionEn = project.description;
        }

        if (titleEn !== project.titleEn || descriptionEn !== project.descriptionEn) {
            await prisma.project.update({
                where: { id: project.id },
                data: { titleEn, descriptionEn }
            });
            updatedCount++;
            console.log(`Updated project: ${project.title}`);
        }
    }

    console.log(`Successfully updated ${updatedCount} projects.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
