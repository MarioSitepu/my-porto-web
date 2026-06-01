import { PrismaClient } from '@prisma/client';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log("Starting translation script...");
    
    if (!process.env.GEMINI_API_KEY) {
        console.error("No GEMINI_API_KEY found in .env");
        process.exit(1);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Get all projects
    const projects = await prisma.project.findMany();
    console.log(`Found ${projects.length} projects.`);

    for (const project of projects) {
        if (!project.description) {
            console.log(`Skipping "${project.title}" (No description)`);
            continue;
        }
        
        // Skip if already translated (assumes if descriptionEn is different from description, it's translated)
        // Note: Earlier script didn't check this, let's just check if it has a valid descriptionEn
        if (project.descriptionEn && project.descriptionEn !== project.description && project.descriptionEn.trim() !== "") {
            console.log(`Skipping "${project.title}" (Already translated)`);
            continue;
        }

        console.log(`Translating description for "${project.title}"...`);
        
        try {
            const prompt = `Translate the following project description into English. It should be a clean, professional English translation.
Original Description: ${project.description}

Return a JSON object strictly in this format:
{
  "descriptionEn": "Your English translation here"
}`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });

            if (response.text) {
                const parsed = JSON.parse(response.text);
                const translated = parsed.descriptionEn;
                
                if (translated && translated.trim() !== "") {
                    await prisma.project.update({
                        where: { id: project.id },
                        data: { descriptionEn: translated }
                    });
                    console.log(`✅ Updated "${project.title}" with English description.`);
                } else {
                    console.log(`⚠️  Empty translation returned for "${project.title}".`);
                }
            }
        } catch (error) {
            console.error(`❌ Failed to translate "${project.title}":`, error.message || error);
        }
        
        // Wait 20 seconds to avoid rate limiting
        console.log("Waiting 20 seconds for rate limit...");
        await new Promise(r => setTimeout(r, 20000));
    }
    
    console.log("Done!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
