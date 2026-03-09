"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const titleEn = formData.get("titleEn") as string || "";
    const description = formData.get("description") as string;
    const descriptionEn = formData.get("descriptionEn") as string || "";
    const technologies = (formData.get("technologies") as string)
        .split(",")
        .map((t) => t.trim());
    const github = formData.get("github") as string;
    const demo = formData.get("demo") as string;
    const image = formData.get("image") as string;

    await prisma.project.create({
        data: {
            title,
            titleEn,
            description,
            descriptionEn,
            image,
            technologies,
            github,
            demo,
        },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const titleEn = formData.get("titleEn") as string || "";
    const description = formData.get("description") as string;
    const descriptionEn = formData.get("descriptionEn") as string || "";
    const technologies = (formData.get("technologies") as string)
        .split(",")
        .map((t) => t.trim());
    const github = formData.get("github") as string;
    const demo = formData.get("demo") as string;
    const image = formData.get("image") as string;

    await prisma.project.update({
        where: { id },
        data: {
            title,
            titleEn,
            description,
            descriptionEn,
            image,
            technologies,
            github,
            demo,
        },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    redirect("/admin/projects");
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
}


