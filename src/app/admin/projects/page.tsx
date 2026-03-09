import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProject } from "./actions";

export default async function ProjectsAdminPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    Add New Project
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {projects.map((project: any) => (
                    <div
                        key={project.id}
                        className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl shadow-sm hover:border-primary/30 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-12 bg-muted rounded-md overflow-hidden relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold">{project.title}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                    {project.technologies.join(", ")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/projects/${project.id}`}
                                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                Edit
                            </Link>
                            <form action={async () => {
                                "use server";
                                await deleteProject(project.id);
                            }}>
                                <button
                                    type="submit"
                                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
