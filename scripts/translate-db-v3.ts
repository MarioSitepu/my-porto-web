import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const translations: Record<string, { titleEn: string, descriptionEn: string }> = {
    "Website KMK ITERA": {
        titleEn: "KMK ITERA Website",
        descriptionEn: "Developed a modern frontend and integrated API fetching and a cloud-based admin system using Firebase for the community website."
    },
    "Survey & Analytics System": {
        titleEn: "Survey & Analytics System",
        descriptionEn: "A Dynamic Form Application built on the MERN stack featuring an admin dashboard and analytical data visualizations."
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

    console.log(`Successfully updated ${updatedCount} stray projects.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
