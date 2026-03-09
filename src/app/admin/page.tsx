import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
    const projectCount = await prisma.project.count();
    const experienceCount = await prisma.experience.count();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-muted-foreground">Total Projects</h3>
                    <p className="text-4xl font-bold mt-2">{projectCount}</p>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-muted-foreground">Total Experiences</h3>
                    <p className="text-4xl font-bold mt-2">{experienceCount}</p>
                </div>
            </div>

            <div className="p-6 bg-card border border-border/50 rounded-xl shadow-sm mt-8">
                <p className="text-muted-foreground">
                    Welcome to the new Admin Panel! From here you can manage your database-backed portfolio contents.
                </p>
            </div>
        </div>
    );
}
