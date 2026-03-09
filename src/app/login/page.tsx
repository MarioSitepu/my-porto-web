"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Username atau password salah");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-8 bg-card border border-border/50 rounded-2xl shadow-xl space-y-6"
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Admin Portal</h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Masuk untuk mengatur portofolio Anda
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Masuk
                </button>
            </form>
        </div>
    );
}
