import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProject } from "../actions";
import { ProjectForm } from "../components/project-form";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    // We wrap the updateProject with the ID
    const updateProjectWithId = updateProject.bind(null, id);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Edit Project: {project.title}</h1>
            <ProjectForm initialData={project} action={updateProjectWithId} />
        </div>
    );
}
