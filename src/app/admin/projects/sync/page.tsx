import { prisma } from "@/lib/prisma";
import { getGithubRepos } from "./actions";
import SyncList from "./sync-list";
import Link from "next/link";

export default async function SyncProjectsPage() {
    let repos = [];
    let error = null;
    
    try {
        repos = await getGithubRepos();
    } catch (e: any) {
        error = e.message || "Failed to fetch repositories";
    }

    const syncedProjects = await prisma.project.findMany({
        where: {
            githubId: { not: null }
        },
        select: {
            githubId: true
        }
    });

    const syncedIds = syncedProjects.map(p => p.githubId as number);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Hybrid Project Sync</h1>
                    <p className="text-muted-foreground">Select GitHub repositories to show in your portfolio.</p>
                </div>
                <Link
                    href="/admin/projects"
                    className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                    Back to Projects
                </Link>
            </div>

            {error ? (
                <div className="p-4 bg-red-100 border border-red-200 text-red-600 rounded-lg">
                    {error}
                </div>
            ) : (
                <SyncList repos={repos} syncedIds={syncedIds} />
            )}
        </div>
    );
}
