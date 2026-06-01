"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const GITHUB_API_URL = "https://api.github.com";

export async function getGithubRepos() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        throw new Error("GITHUB_TOKEN is not configured in environment variables.");
    }

    const res = await fetch(`${GITHUB_API_URL}/user/repos?sort=updated&per_page=100`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch repos: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
}

import { GoogleGenAI } from "@google/genai";

export async function syncProjectToDB(repoFullName: string, githubId: number, repoData: any) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        throw new Error("GITHUB_TOKEN is not configured.");
    }

    // Fetch README
    let readmeContent = "";
    try {
        const readmeRes = await fetch(`${GITHUB_API_URL}/repos/${repoFullName}/readme`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        if (readmeRes.ok) {
            const readmeJson = await readmeRes.json();
            if (readmeJson.content && readmeJson.encoding === "base64") {
                readmeContent = Buffer.from(readmeJson.content, "base64").toString("utf-8");
            }
        }
    } catch (e) {
        console.error("Failed to fetch README for", repoFullName, e);
    }

    // Default values
    let generatedData = {
        description: repoData.description || "",
        descriptionEn: repoData.description || "",
        titleEn: repoData.name,
        technologies: repoData.language ? [repoData.language] : []
    };

    if (process.env.GEMINI_API_KEY) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const prompt = `Analyze the following GitHub repository and provide structured data.
Repo Name: ${repoData.name}
Description: ${repoData.description || "N/A"}
Language: ${repoData.language || "N/A"}
README:
${readmeContent.substring(0, 3000)}

Please return a JSON object with the following fields:
- description: A short Indonesian summary of the project (max 2 sentences).
- descriptionEn: A short English summary of the project (max 2 sentences).
- titleEn: An English translation or a clean readable English title for the project.
- technologies: An array of strings representing the technology stack used (extract from README or Language, e.g. ["React", "Next.js", "TypeScript"]).`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });

            if (response.text) {
                const parsed = JSON.parse(response.text);
                generatedData = {
                    description: parsed.description || generatedData.description,
                    descriptionEn: parsed.descriptionEn || generatedData.descriptionEn,
                    titleEn: parsed.titleEn || generatedData.titleEn,
                    technologies: parsed.technologies && Array.isArray(parsed.technologies) ? parsed.technologies : generatedData.technologies
                };
            }
        } catch (e) {
            console.error("Failed to generate content with Gemini:", e);
        }
    }

    // Upsert into DB
    await prisma.project.upsert({
        where: { githubId },
        update: {
            title: repoData.name,
            titleEn: generatedData.titleEn,
            description: generatedData.description,
            descriptionEn: generatedData.descriptionEn,
            content: readmeContent,
            github: repoData.html_url,
            demo: repoData.homepage || "",
            technologies: generatedData.technologies,
            isPublished: true,
        },
        create: {
            githubId,
            title: repoData.name,
            titleEn: generatedData.titleEn,
            description: generatedData.description,
            descriptionEn: generatedData.descriptionEn,
            content: readmeContent,
            image: "", // Optional/default
            technologies: generatedData.technologies,
            github: repoData.html_url,
            demo: repoData.homepage || "",
            isPublished: true,
        },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/projects/sync");
    revalidatePath("/projects");
}

export async function removeProjectFromDB(githubId: number) {
    await prisma.project.delete({
        where: { githubId },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/projects/sync");
    revalidatePath("/projects");
}
