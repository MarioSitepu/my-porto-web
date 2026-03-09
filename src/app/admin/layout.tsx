import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "./components/sign-out-button"; // We will create this

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border/50 flex flex-col">
                <div className="p-6 border-b border-border/50">
                    <h2 className="text-xl font-bold">Admin Panel</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Welcome, {session.user.name}
                    </p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Manage Projects
                    </Link>
                </nav>
                <div className="p-4 border-t border-border/50">
                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 max-w-6xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
